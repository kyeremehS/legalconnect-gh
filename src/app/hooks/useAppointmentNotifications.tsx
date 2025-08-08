"use client";
import { useState, useEffect } from 'react';
import { apiClient } from '../../lib/api';

interface AppointmentNotification {
  id: string;
  appointmentId: string;
  clientName: string;
  clientEmail: string;
  requestedTime: string;
  duration: string;
  message?: string;
  practiceArea: string;
}

export function useAppointmentNotifications() {
  const [notifications, setNotifications] = useState<AppointmentNotification[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getAppointmentNotifications();
      if (response.success) {
        setNotifications(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching appointment notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmAppointment = async (appointmentId: string, notes?: string) => {
    try {
      const response = await apiClient.updateAppointmentStatus(appointmentId, {
        status: 'CONFIRMED',
        notes
      });
      
      if (response.success) {
        // Remove from notifications
        setNotifications(prev => prev.filter(n => n.appointmentId !== appointmentId));
        
        // Show success notification
        console.log('Appointment confirmed successfully');
        return { success: true };
      }
    } catch (error) {
      console.error('Error confirming appointment:', error);
      return { success: false, error };
    }
  };

  const rejectAppointment = async (appointmentId: string, reason?: string) => {
    try {
      const response = await apiClient.updateAppointmentStatus(appointmentId, {
        status: 'CANCELLED',
        notes: reason
      });
      
      if (response.success) {
        // Remove from notifications
        setNotifications(prev => prev.filter(n => n.appointmentId !== appointmentId));
        
        // Show success notification
        console.log('Appointment declined successfully');
        return { success: true };
      }
    } catch (error) {
      console.error('Error declining appointment:', error);
      return { success: false, error };
    }
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return {
    notifications,
    loading,
    confirmAppointment,
    rejectAppointment,
    dismissNotification,
    refetch: fetchNotifications
  };
}
