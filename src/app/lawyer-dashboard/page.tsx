"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Bell, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import AuthWrapper from '../components/auth/AuthWrapper';
import AppointmentNotificationPopup from '../components/scheduling/AppointmentNotificationPopup';
import { useAppointmentNotifications } from '../hooks/useAppointmentNotifications';

export default function LawyerDashboard() {
  const {
    notifications,
    loading,
    confirmAppointment,
    rejectAppointment,
    dismissNotification
  } = useAppointmentNotifications();

  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [showAllNotifications, setShowAllNotifications] = useState(false);

  const fetchNotifications = async () => {
    // The hook doesn't expose fetchNotifications, so we'll manage state internally
    // The hook should handle fetching on mount
  };

  useEffect(() => {
    // The hook handles initial fetching
    // Set up polling for new notifications every 30 seconds
    const interval = setInterval(() => {
      // Trigger a re-render to check for new notifications
      window.location.reload();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = (notification: any) => {
    setSelectedNotification(notification);
  };

  const handleConfirmAppointment = async (appointmentId: string) => {
    const result = await confirmAppointment(appointmentId);
    if (result?.success) {
      setSelectedNotification(null);
    }
  };

  const handleRejectAppointment = async (appointmentId: string) => {
    const result = await rejectAppointment(appointmentId);
    if (result?.success) {
      setSelectedNotification(null);
    }
  };

  const unreadCount = notifications.length; // All notifications are considered unread for now
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AuthWrapper requiredRole="LAWYER">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Lawyer Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage your appointments and notifications</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="w-6 h-6 text-gray-600" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  L
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Bell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">New Notifications</p>
                    <p className="text-2xl font-bold text-gray-900">{unreadCount}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                    <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending Actions</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {notifications.length}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Notifications List */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
                    <button
                      onClick={() => setShowAllNotifications(!showAllNotifications)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {showAllNotifications ? 'Show Recent' : 'Show All'}
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {loading ? (
                    <div className="p-6 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Loading notifications...</p>
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-6 text-center">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                      <p className="text-gray-600">
                        You'll see appointment requests and updates here.
                      </p>
                    </div>
                  ) : (
                    (showAllNotifications ? notifications : notifications.slice(0, 5)).map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className="p-6 hover:bg-gray-50 cursor-pointer transition-colors bg-blue-50 border-l-4 border-blue-500"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <Calendar className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900">
                              New Appointment Request
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.clientName} wants to book an appointment for {notification.practiceArea}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              Requested time: {formatDate(notification.requestedTime)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Duration: {notification.duration} minutes
                            </p>
                            {notification.message && (
                              <p className="text-xs text-gray-600 mt-1 italic">
                                Message: {notification.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={fetchNotifications}
                    className="w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <Bell className="w-5 h-5 mr-3" />
                      Refresh Notifications
                    </div>
                  </button>
                  
                  <button className="w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-3" />
                      View Calendar
                    </div>
                  </button>
                  
                  <button className="w-full text-left px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-3" />
                      Update Profile
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Notification Popup */}
        {selectedNotification && (
          <AppointmentNotificationPopup
            notifications={[selectedNotification]}
            onConfirm={(appointmentId) => handleConfirmAppointment(appointmentId)}
            onReject={(appointmentId) => handleRejectAppointment(appointmentId)}
            onClose={() => setSelectedNotification(null)}
          />
        )}
      </div>
    </AuthWrapper>
  );
}
