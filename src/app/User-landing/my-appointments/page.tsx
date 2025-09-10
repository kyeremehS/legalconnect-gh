"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Phone,
  Video,
  MapPin,
  Eye,
  RefreshCw,
  Filter,
  Search,
  ArrowLeft,
  ExternalLink,
  MessageSquare,
  Star,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import AuthWrapper from "../../components/auth/AuthWrapper";

interface Appointment {
  id: string;
  lawyer: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phone?: string;
    };
    firm?: string;
    location?: string;
    practiceAreas: string[];
    experience?: number;
  };
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  practiceArea: string;
  description: string;
  meetingType: 'VIRTUAL' | 'IN_PERSON' | 'PHONE';
  meetingLink?: string;
  notes?: string;
  createdAt: string;
  title: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const statusConfig = {
  PENDING: { 
    bg: 'bg-yellow-100', 
    text: 'text-yellow-800', 
    border: 'border-yellow-200',
    icon: AlertCircle,
    message: '⏳ Waiting for lawyer confirmation',
    gradient: 'from-yellow-400 to-yellow-500'
  },
  CONFIRMED: { 
    bg: 'bg-green-100', 
    text: 'text-green-800', 
    border: 'border-green-200',
    icon: CheckCircle,
    message: '✅ Confirmed by lawyer',
    gradient: 'from-green-400 to-green-500'
  },
  CANCELLED: { 
    bg: 'bg-red-100', 
    text: 'text-red-800', 
    border: 'border-red-200',
    icon: XCircle,
    message: '❌ Appointment cancelled',
    gradient: 'from-red-400 to-red-500'
  },
  COMPLETED: { 
    bg: 'bg-blue-100', 
    text: 'text-blue-800', 
    border: 'border-blue-200',
    icon: CheckCircle,
    message: '🎯 Consultation completed',
    gradient: 'from-blue-400 to-blue-500'
  },
};

const meetingTypeConfig = {
  VIRTUAL: { icon: Video, label: 'Video Call', color: 'text-blue-600', bg: 'bg-blue-100' },
  PHONE: { icon: Phone, label: 'Phone Call', color: 'text-green-600', bg: 'bg-green-100' },
  IN_PERSON: { icon: User, label: 'In Person', color: 'text-purple-600', bg: 'bg-purple-100' },
};

export default function ClientAppointmentsDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch client appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.warn('No auth token found');
        setAppointments([]);
        return;
      }

      const params = new URLSearchParams();
      if (selectedStatus !== 'ALL') params.append('status', selectedStatus);

      const url = `${API_BASE_URL}/api/appointments/client?${params}`;
      console.log('📞 Fetching client appointments from:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Client appointments received:', data);
        setAppointments(data.data || []);
      } else if (response.status === 404) {
        // Endpoint doesn't exist yet - show empty state
        console.warn('Client appointments endpoint not found');
        setAppointments([]);
        setMessage({ 
          type: 'info', 
          text: 'Your appointments will appear here once the backend is updated.' 
        });
      } else {
        console.error('❌ Failed to fetch appointments:', response.status);
        setAppointments([]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
      setMessage({ 
        type: 'error', 
        text: 'Unable to load appointments. Please check your connection.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Cancel appointment (only if PENDING)
  const cancelAppointment = async (appointmentId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(
        `${API_BASE_URL}/api/appointments/${appointmentId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'CANCELLED' })
        }
      );

      if (response.ok) {
        await fetchAppointments();
        setMessage({ type: 'success', text: 'Appointment cancelled successfully' });
        setShowAppointmentModal(false);
      } else {
        throw new Error('Failed to cancel appointment');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      setMessage({ type: 'error', text: 'Failed to cancel appointment' });
    }
  };

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter(appointment =>
    appointment.lawyer.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.lawyer.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.practiceArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchAppointments();
  }, [selectedStatus]);

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      shortDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isToday: date.toDateString() === new Date().toDateString(),
      isPast: date < new Date()
    };
  };

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
                  My Appointments
                </h1>
                <p className="text-gray-600">Track your legal consultations and their status</p>
              </div>
              <div className="flex space-x-3 mt-4 sm:mt-0">
                <Link 
                  href="/User-landing/appointment-booking-integrated"
                  className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-6 py-3 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 font-medium flex items-center space-x-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book New Appointment</span>
                </Link>
                <button
                  onClick={fetchAppointments}
                  className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium flex items-center space-x-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Message Display */}
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg flex items-center ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : message.type === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              {message.text}
              <button
                onClick={() => setMessage({ type: '', text: '' })}
                className="ml-auto text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </motion.div>
          )}

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                  >
                    <option value="ALL">All Appointments</option>
                    <option value="CONFIRMED">✅ Confirmed</option>
                    <option value="PENDING">⏳ Pending</option>
                    <option value="COMPLETED">🎯 Completed</option>
                    <option value="CANCELLED">❌ Cancelled</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Appointments</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by lawyer name or practice area..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                    />
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(statusConfig).map(([status, config]) => {
                  const count = appointments.filter(apt => apt.status === status).length;
                  const StatusIcon = config.icon;
                  return (
                    <div key={status} className={`${config.bg} ${config.border} border rounded-xl p-4`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{status}</p>
                          <p className={`text-2xl font-bold ${config.text}`}>{count}</p>
                        </div>
                        <StatusIcon className={`w-8 h-8 ${config.text}`} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Appointments List */}
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4a017] mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading your appointments...</p>
                  </div>
                ) : filteredAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No appointments found</p>
                    <p className="text-gray-400 mb-6">Your booked consultations will appear here</p>
                    <Link 
                      href="/User-landing/appointment-booking-integrated"
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-6 py-3 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 font-medium"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Book Your First Appointment</span>
                    </Link>
                  </div>
                ) : (
                  filteredAppointments.map((appointment) => {
                    const { date, time, shortDate, isToday, isPast } = formatDateTime(appointment.startTime);
                    const MeetingIcon = meetingTypeConfig[appointment.meetingType].icon;
                    const statusConf = statusConfig[appointment.status];
                    const StatusIcon = statusConf.icon;
                    const meetingConf = meetingTypeConfig[appointment.meetingType];

                    return (
                      <motion.div
                        key={appointment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`border-l-4 ${statusConf.border} bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-start space-x-4">
                              {/* Date Badge */}
                              <div className={`flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br ${statusConf.gradient} text-white flex flex-col items-center justify-center`}>
                                <span className="text-xs font-medium">
                                  {new Date(appointment.startTime).toLocaleDateString('en-US', { month: 'short' })}
                                </span>
                                <span className="text-lg font-bold">
                                  {new Date(appointment.startTime).getDate()}
                                </span>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-xl font-semibold text-gray-900">
                                    {appointment.title}
                                  </h3>
                                  <span className={`px-3 py-1 text-sm rounded-full ${statusConf.bg} ${statusConf.text} flex items-center space-x-1`}>
                                    <StatusIcon className="w-4 h-4" />
                                    <span>{appointment.status}</span>
                                  </span>
                                  {isToday && (
                                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                                      TODAY
                                    </span>
                                  )}
                                </div>
                                
                                {/* Lawyer Info */}
                                <div className="flex items-center space-x-3 mb-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    {appointment.lawyer.user.firstName[0]}{appointment.lawyer.user.lastName[0]}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900">
                                      {appointment.lawyer.user.firstName} {appointment.lawyer.user.lastName}
                                    </p>
                                    <p className="text-sm text-gray-600">{appointment.lawyer.firm}</p>
                                  </div>
                                </div>
                                
                                {/* Appointment Details */}
                                <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {date}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {time}
                                  </div>
                                  <div className={`flex items-center px-2 py-1 rounded-full ${meetingConf.bg}`}>
                                    <MeetingIcon className={`w-4 h-4 mr-1 ${meetingConf.color}`} />
                                    <span className={meetingConf.color}>{meetingConf.label}</span>
                                  </div>
                                </div>
                                
                                {/* Practice Area and Status Message */}
                                <div className="flex flex-wrap gap-2">
                                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                    📚 {appointment.practiceArea}
                                  </span>
                                  <span className={`px-3 py-1 text-sm rounded-full ${statusConf.bg} ${statusConf.text}`}>
                                    {statusConf.message}
                                  </span>
                                </div>
                                
                                {/* Meeting Link for Confirmed Virtual Appointments */}
                                {appointment.status === 'CONFIRMED' && appointment.meetingType === 'VIRTUAL' && appointment.meetingLink && (
                                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between">
                                      <span className="text-blue-800 font-medium">Virtual Meeting Ready</span>
                                      <a 
                                        href={appointment.meetingLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                      >
                                        <Video className="w-4 h-4" />
                                        <span>Join Meeting</span>
                                        <ExternalLink className="w-4 h-4" />
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedAppointment(appointment);
                                setShowAppointmentModal(true);
                              }}
                              className="p-2 text-gray-500 hover:text-[#d4a017] hover:bg-amber-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Details Modal */}
        <AnimatePresence>
          {showAppointmentModal && selectedAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
                    <button
                      onClick={() => setShowAppointmentModal(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Status Banner */}
                    <div className={`${statusConfig[selectedAppointment.status].bg} ${statusConfig[selectedAppointment.status].border} border rounded-lg p-4`}>
                      <div className="flex items-center justify-center space-x-2">
                        {React.createElement(statusConfig[selectedAppointment.status].icon, { 
                          className: `w-6 h-6 ${statusConfig[selectedAppointment.status].text}` 
                        })}
                        <span className={`text-lg font-semibold ${statusConfig[selectedAppointment.status].text}`}>
                          {statusConfig[selectedAppointment.status].message}
                        </span>
                      </div>
                    </div>

                    {/* Lawyer Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Lawyer</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {selectedAppointment.lawyer.user.firstName[0]}{selectedAppointment.lawyer.user.lastName[0]}
                          </div>
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900">
                              {selectedAppointment.lawyer.user.firstName} {selectedAppointment.lawyer.user.lastName}
                            </h4>
                            <p className="text-gray-600">{selectedAppointment.lawyer.user.email}</p>
                            {selectedAppointment.lawyer.user.phone && (
                              <p className="text-gray-600">📞 {selectedAppointment.lawyer.user.phone}</p>
                            )}
                            {selectedAppointment.lawyer.firm && (
                              <p className="text-gray-600">🏢 {selectedAppointment.lawyer.firm}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {selectedAppointment.lawyer.practiceAreas?.map((area, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Consultation Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Date</label>
                          <p className="text-gray-900">{formatDateTime(selectedAppointment.startTime).date}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Time</label>
                          <p className="text-gray-900">
                            {formatDateTime(selectedAppointment.startTime).time} - {formatDateTime(selectedAppointment.endTime).time}
                          </p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Practice Area</label>
                          <p className="text-gray-900">📚 {selectedAppointment.practiceArea}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Meeting Type</label>
                          <div className="flex items-center space-x-2">
                            {React.createElement(meetingTypeConfig[selectedAppointment.meetingType].icon, { 
                              className: `w-5 h-5 ${meetingTypeConfig[selectedAppointment.meetingType].color}` 
                            })}
                            <span className="text-gray-900">{meetingTypeConfig[selectedAppointment.meetingType].label}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Consultation Topic</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700">{selectedAppointment.description}</p>
                      </div>
                    </div>

                    {/* Meeting Link for Virtual Appointments */}
                    {selectedAppointment.meetingType === 'VIRTUAL' && selectedAppointment.meetingLink && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Virtual Meeting</h3>
                        <div className="bg-blue-50 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-800">Meeting Link Available</span>
                            <a 
                              href={selectedAppointment.meetingLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                            >
                              <Video className="w-4 h-4" />
                              <span>Join Meeting</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notes from Lawyer */}
                    {selectedAppointment.notes && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes from Lawyer</h3>
                        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                          <p className="text-amber-800">{selectedAppointment.notes}</p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      {selectedAppointment.status === 'PENDING' && (
                        <button
                          onClick={() => cancelAppointment(selectedAppointment.id)}
                          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold"
                        >
                          Cancel Appointment
                        </button>
                      )}
                      <button
                        onClick={() => setShowAppointmentModal(false)}
                        className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-300 font-semibold"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AuthWrapper>
  );
}
