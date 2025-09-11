"use client";
import { useState, useEffect } from "react";
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
  MessageSquare,
  Eye,
  Edit3,
  Trash2,
  Plus,
  Filter,
  Search,
  Download,
  Bell,
  Settings,
} from "lucide-react";
import LawyerAuthWrapper from "../../components/auth/LawyerAuthWrapper";

interface Appointment {
  id: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
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
}

interface AvailabilitySlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  date?: string;
  isAvailable: boolean;
  isRecurring: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

const statusColors = {
  PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  CONFIRMED: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  CANCELLED: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  COMPLETED: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
};

const meetingTypeIcons = {
  VIRTUAL: Video,
  PHONE: Phone,
  IN_PERSON: User,
};

export default function LawyerAppointmentDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log('📅 Initial date formatted:', formattedDate);
    return formattedDate;
  });
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'appointments' | 'availability'>('appointments');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
 
  // New availability form
  const [newAvailability, setNewAvailability] = useState({
    date: '',
    startTime: '',
    endTime: '',
    isRecurring: false,
    dayOfWeek: 1,
  });

  const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  // Fetch appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.warn('No auth token found');
        setAppointments([]);
        return;
      }

      console.log('🔍 Fetching appointments with token:', token ? 'Token exists' : 'No token');
      console.log('📅 Selected date value:', selectedDate);

      // Validate date format before sending
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (selectedDate && !dateRegex.test(selectedDate)) {
        console.error('❌ Invalid date format:', selectedDate);
        setMessage({ type: 'error', text: 'Invalid date format detected' });
        return;
      }

      const params = new URLSearchParams();
      if (selectedDate) {
        console.log('📤 Adding date parameter:', selectedDate);
        params.append('date', selectedDate);
      }
      if (selectedStatus !== 'ALL') params.append('status', selectedStatus);

      const url = `${API_BASE_URL}/api/appointments/lawyer?${params}`;
      console.log('📞 Making request to:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('📊 Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Appointments data received:', data);
        setAppointments(data.data || []);
      } else if (response.status === 404) {
        // If endpoint doesn't exist yet, show empty state
        console.warn('Appointments endpoint not found - showing empty state');
        setAppointments([]);
      } else {
        const errorData = await response.text();
        console.error('❌ API Error:', response.status, errorData);
        throw new Error(`Failed to fetch appointments: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setAppointments([]);
      setMessage({ 
        type: 'error', 
        text: 'Backend not ready. Please ensure the API server is running on port 4000.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch availability
  const fetchAvailability = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        console.warn('No auth token found');
        setAvailabilitySlots([]);
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/availability/lawyer/my-availability`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAvailabilitySlots(data.data || []);
      } else if (response.status === 404) {
        // If endpoint doesn't exist yet, show empty state
        console.warn('Availability endpoint not found - showing empty state');
        setAvailabilitySlots([]);
      } else {
        console.warn('Failed to fetch availability:', response.status);
        setAvailabilitySlots([]);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      setAvailabilitySlots([]);
      // Don't show error message for availability fetch - it's not critical
    }
  };

  // Update appointment status
  const updateAppointmentStatus = async (appointmentId: string, status: string, notes?: string) => {
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
          body: JSON.stringify({ status, notes })
        }
      );

      if (response.ok) {
        await fetchAppointments();
        setMessage({ type: 'success', text: `Appointment ${status.toLowerCase()} successfully` });
        setShowAppointmentModal(false);
      } else {
        throw new Error('Failed to update appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      setMessage({ type: 'error', text: 'Failed to update appointment' });
    }
  };

  // Create availability
  const createAvailability = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setMessage({ type: 'error', text: 'Authentication required' });
        return;
      }

      const availabilityData = {
        ...newAvailability,
        startTime: `${newAvailability.startTime}:00`,
        endTime: `${newAvailability.endTime}:00`,
      };

      const response = await fetch(
        `${API_BASE_URL}/api/availability/lawyer/my-availability`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(availabilityData)
        }
      );

      if (response.ok) {
        await fetchAvailability();
        setMessage({ type: 'success', text: 'Availability created successfully' });
        setNewAvailability({
          date: '',
          startTime: '',
          endTime: '',
          isRecurring: false,
          dayOfWeek: 1,
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create availability');
      }
    } catch (error) {
      console.error('Error creating availability:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to create availability' 
      });
    }
  };

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter(appointment =>
    appointment.client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.practiceArea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchAppointments();
    fetchAvailability();
  }, [selectedDate, selectedStatus]);

  // Format date and time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  return (
    <LawyerAuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
                  Appointment Dashboard
                </h1>
                <p className="text-gray-600">Manage your appointments and availability</p>
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
                  : 'bg-red-50 text-red-700 border border-red-200'
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

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`px-6 py-4 font-medium ${
                    activeTab === 'appointments'
                      ? 'text-[#d4a017] border-b-2 border-[#d4a017] bg-amber-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Appointments
                </button>
                <button
                  onClick={() => setActiveTab('availability')}
                  className={`px-6 py-4 font-medium ${
                    activeTab === 'availability'
                      ? 'text-[#d4a017] border-b-2 border-[#d4a017] bg-amber-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Availability
                </button>
              </div>
            </div>

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div className="p-6">
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                    >
                      <option value="ALL">All Status</option>
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="CANCELLED">Cancelled</option>
                      <option value="COMPLETED">Completed</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search by client name or practice area..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                      />
                    </div>
                  </div>
                </div>

                {/* Appointments List */}
                <div className="space-y-4">
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4a017] mx-auto"></div>
                      <p className="text-gray-500 mt-4">Loading appointments...</p>
                    </div>
                  ) : filteredAppointments.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No appointments found</p>
                    </div>
                  ) : (
                    filteredAppointments.map((appointment) => {
                      const { date, time } = formatDateTime(appointment.startTime);
                      const MeetingIcon = meetingTypeIcons[appointment.meetingType];
                      const statusStyle = statusColors[appointment.status];

                      return (
                        <motion.div
                          key={appointment.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold">
                                  {appointment.client.firstName[0]}{appointment.client.lastName[0]}
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-gray-900">
                                    {appointment.client.firstName} {appointment.client.lastName}
                                  </h3>
                                  <p className="text-gray-600 mb-2">{appointment.client.email}</p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center">
                                      <Calendar className="w-4 h-4 mr-1" />
                                      {date}
                                    </div>
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {time}
                                    </div>
                                    <div className="flex items-center">
                                      <MeetingIcon className="w-4 h-4 mr-1" />
                                      {appointment.meetingType.replace('_', ' ')}
                                    </div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                      {appointment.practiceArea}
                                    </span>
                                    <span className={`px-3 py-1 text-sm rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                                      {appointment.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setShowAppointmentModal(true);
                                }}
                                className="p-2 text-gray-500 hover:text-[#d4a017] hover:bg-amber-50 rounded-lg transition-colors"
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
            )}

            {/* Availability Tab */}
            {activeTab === 'availability' && (
              <div className="p-6">
                {/* Add New Availability */}
                <div className="bg-amber-50 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Availability</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {newAvailability.isRecurring ? 'Day of Week' : 'Date'}
                      </label>
                      {newAvailability.isRecurring ? (
                        <select
                          value={newAvailability.dayOfWeek}
                          onChange={(e) => setNewAvailability({...newAvailability, dayOfWeek: parseInt(e.target.value)})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                        >
                          {daysOfWeek.map((day, index) => (
                            <option key={index} value={index}>{day}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="date"
                          value={newAvailability.date}
                          onChange={(e) => setNewAvailability({...newAvailability, date: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                        />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                      <input
                        type="time"
                        value={newAvailability.startTime}
                        onChange={(e) => setNewAvailability({...newAvailability, startTime: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                      <input
                        type="time"
                        value={newAvailability.endTime}
                        onChange={(e) => setNewAvailability({...newAvailability, endTime: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newAvailability.isRecurring}
                          onChange={(e) => setNewAvailability({...newAvailability, isRecurring: e.target.checked})}
                          className="mr-2 rounded border-gray-300 text-[#d4a017] focus:ring-[#d4a017]"
                        />
                        <span className="text-sm font-medium text-gray-700">Recurring</span>
                      </label>
                    </div>
                    <div className="flex items-end">
                      <button
                        onClick={createAvailability}
                        disabled={(!newAvailability.date && !newAvailability.isRecurring) || !newAvailability.startTime || !newAvailability.endTime}
                        className="w-full bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-4 py-3 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-5 h-5 mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Current Availability */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Current Availability</h3>
                  {availabilitySlots.length === 0 ? (
                    <div className="text-center py-12">
                      <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No availability slots set</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availabilitySlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              {slot.isRecurring ? (
                                <p className="font-medium text-gray-900">
                                  Every {daysOfWeek[slot.dayOfWeek]}
                                </p>
                              ) : (
                                <p className="font-medium text-gray-900">
                                  {slot.date}
                                </p>
                              )}
                              <p className="text-gray-600">
                                {slot.startTime} - {slot.endTime}
                              </p>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              slot.isAvailable 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {slot.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                          </div>
                          {slot.isRecurring && (
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              Recurring
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
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
                  {/* Client Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Client Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold">
                          {selectedAppointment.client.firstName[0]}{selectedAppointment.client.lastName[0]}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {selectedAppointment.client.firstName} {selectedAppointment.client.lastName}
                          </h4>
                          <p className="text-gray-600">{selectedAppointment.client.email}</p>
                          {selectedAppointment.client.phone && (
                            <p className="text-gray-600">{selectedAppointment.client.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Details</h3>
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
                        <p className="text-gray-900">{selectedAppointment.practiceArea}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Meeting Type</label>
                        <p className="text-gray-900">{selectedAppointment.meetingType.replace('_', ' ')}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <span className={`inline-block px-3 py-1 text-sm rounded-full ${statusColors[selectedAppointment.status].bg} ${statusColors[selectedAppointment.status].text}`}>
                          {selectedAppointment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">{selectedAppointment.description}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {selectedAppointment.status === 'PENDING' && (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => updateAppointmentStatus(selectedAppointment.id, 'CONFIRMED')}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold"
                      >
                        Confirm Appointment
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(selectedAppointment.id, 'CANCELLED')}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  )}

                  {selectedAppointment.status === 'CONFIRMED' && (
                    <div className="flex space-x-4">
                      <button
                        onClick={() => updateAppointmentStatus(selectedAppointment.id, 'COMPLETED')}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold"
                      >
                        Mark as Completed
                      </button>
                      <button
                        onClick={() => updateAppointmentStatus(selectedAppointment.id, 'CANCELLED')}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold"
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LawyerAuthWrapper>
  );
}
