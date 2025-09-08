"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Check, X, MessageSquare } from 'lucide-react';

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

interface AppointmentNotificationPopupProps {
  notifications: AppointmentNotification[];
  onConfirm: (appointmentId: string, notes?: string) => void;
  onReject: (appointmentId: string, reason?: string) => void;
  onClose: (notificationId: string) => void;
}

export default function AppointmentNotificationPopup({
  notifications,
  onConfirm,
  onReject,
  onClose
}: AppointmentNotificationPopupProps) {
  const [currentNotification, setCurrentNotification] = useState<AppointmentNotification | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [responseNotes, setResponseNotes] = useState('');

  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      setCurrentNotification(notifications[0]);
    }
  }, [notifications, currentNotification]);

  const handleConfirm = () => {
    if (currentNotification) {
      onConfirm(currentNotification.appointmentId, responseNotes);
      handleNext();
    }
  };

  const handleReject = () => {
    if (currentNotification) {
      onReject(currentNotification.appointmentId, responseNotes);
      handleNext();
    }
  };

  const handleNext = () => {
    if (currentNotification) {
      onClose(currentNotification.id);
      setCurrentNotification(null);
      setResponseNotes('');
      setShowDetails(false);
    }
  };

  if (!currentNotification) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 rounded-t-xl">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                <h3 className="text-xl font-semibold">New Appointment Request</h3>
              </div>
              <button
                onClick={handleNext}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Client Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{currentNotification.clientName}</h4>
                <p className="text-sm text-gray-600">{currentNotification.clientEmail}</p>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-medium text-gray-900">
                    {new Date(currentNotification.requestedTime).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(currentNotification.requestedTime).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })} ({currentNotification.duration})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-medium text-gray-900">Practice Area</p>
                  <p className="text-sm text-gray-600">{currentNotification.practiceArea}</p>
                </div>
              </div>
            </div>

            {/* Client Message */}
            {currentNotification.message && (
              <div className="mb-6">
                <p className="font-medium text-gray-900 mb-2">Message from Client:</p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">{currentNotification.message}</p>
                </div>
              </div>
            )}

            {/* Response Notes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Notes (Optional)
              </label>
              <textarea
                value={responseNotes}
                onChange={(e) => setResponseNotes(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                rows={3}
                placeholder="Add any notes or special instructions..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleConfirm}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <Check className="w-5 h-5" />
                Confirm Appointment
              </button>
              <button
                onClick={handleReject}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <X className="w-5 h-5" />
                Decline
              </button>
            </div>

            {/* Notification Count */}
            {notifications.length > 1 && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {notifications.length - 1} more appointment{notifications.length > 2 ? 's' : ''} pending
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
