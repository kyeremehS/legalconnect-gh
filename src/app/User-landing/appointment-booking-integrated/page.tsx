"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Star,
  Filter,
  Search,
  Briefcase,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Phone,
  Video,
  MessageSquare,
} from "lucide-react";
import AuthWrapper from "../../components/auth/AuthWrapper";

interface LawyerWithAvailability {
  id: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  firm: string;
  location: string;
  practiceAreas: string[];
  experience: number;
  professionalSummary?: string;
  availabilitySlots: AvailabilitySlot[];
  bookedAppointments: Appointment[];
}

interface AvailabilitySlot {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  date?: string;
  isAvailable: boolean;
}

interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function IntegratedAppointmentBooking() {
  const [availableLawyers, setAvailableLawyers] = useState<LawyerWithAvailability[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string>('');
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerWithAvailability | null>(null);
  const [loading, setLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1: Select Date/Time, 2: Choose Lawyer, 3: Confirm Booking
  const [message, setMessage] = useState({ type: '', text: '' });

  // Booking form data
  const [bookingData, setBookingData] = useState({
    practiceArea: '',
    description: '',
    meetingType: 'VIRTUAL' as 'VIRTUAL' | 'IN_PERSON' | 'PHONE',
    duration: '60',
  });

  const practiceAreas = [
    "Business Law", "Criminal Law", "Family Law", "Property Law",
    "Employment Law", "Immigration Law", "Personal Injury", "Tax Law"
  ];

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Fetch available lawyers based on selected criteria
  const fetchAvailableLawyers = async () => {
    if (!selectedDate || !selectedTime) return;
    
    try {
      setLoading(true);
      const params = new URLSearchParams({
        date: selectedDate,
        time: selectedTime,
        ...(selectedPracticeArea && { practiceArea: selectedPracticeArea })
      });

      const response = await fetch(
        `${API_BASE_URL}/api/availability/lawyers/available?${params}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAvailableLawyers(data.data || []);
        if (data.data?.length > 0) {
          setBookingStep(2);
        } else {
          setMessage({ 
            type: 'info', 
            text: 'No lawyers available for the selected date and time. Please try a different time slot.' 
          });
        }
      } else {
        throw new Error('Failed to fetch available lawyers');
      }
    } catch (error) {
      console.error('Error fetching available lawyers:', error);
      setMessage({ type: 'error', text: 'Failed to fetch available lawyers. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Book appointment
  const handleBookAppointment = async () => {
    if (!selectedLawyer) return;

    try {
      setLoading(true);
      const appointmentData = {
        lawyerId: selectedLawyer.id,
        title: `Consultation - ${bookingData.practiceArea}`,
        startTime: `${selectedDate}T${selectedTime}:00`,
        endTime: `${selectedDate}T${addMinutesToTime(selectedTime, parseInt(bookingData.duration))}:00`,
        practiceArea: bookingData.practiceArea,
        description: bookingData.description,
        meetingType: bookingData.meetingType,
        duration: bookingData.duration,
      };

      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      if (response.ok) {
        setMessage({ 
          type: 'success', 
          text: 'Appointment request sent successfully! The lawyer will be notified and respond soon.' 
        });
        // Reset form
        setBookingStep(1);
        setSelectedLawyer(null);
        setAvailableLawyers([]);
        setSelectedDate('');
        setSelectedTime('');
        setBookingData({
          practiceArea: '',
          description: '',
          meetingType: 'VIRTUAL',
          duration: '60',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to book appointment. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to add minutes to time string
  const addMinutesToTime = (timeString: string, minutes: number): string => {
    const [hours, mins] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, '0')}:${newMins.toString().padStart(2, '0')}`;
  };

  // Generate time slots for the day
  const generateTimeSlots = (): string[] => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        if (hour === 17 && minute > 0) break; // Don't go past 5 PM
        slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
      }
    }
    return slots;
  };

  return (
    <AuthWrapper>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
              Book Legal Consultation
            </h1>
            <p className="text-gray-600 text-lg">
              Find and book appointments with qualified lawyers
            </p>
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

          {/* Step 1: Select Date and Time */}
          {bookingStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-[#d4a017] text-white rounded-full flex items-center justify-center font-semibold mr-3">
                  1
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Select Date & Time</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Date Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={today}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                  />
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                  >
                    <option value="">Select time</option>
                    {generateTimeSlots().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Practice Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Practice Area (Optional)
                  </label>
                  <select
                    value={selectedPracticeArea}
                    onChange={(e) => setSelectedPracticeArea(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                  >
                    <option value="">All Practice Areas</option>
                    {practiceAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={fetchAvailableLawyers}
                  disabled={!selectedDate || !selectedTime || loading}
                  className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-8 py-3 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Searching...' : 'Find Available Lawyers'}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Choose Lawyer */}
          {bookingStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#d4a017] text-white rounded-full flex items-center justify-center font-semibold mr-3">
                    2
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Choose Your Lawyer</h2>
                </div>
                <button
                  onClick={() => {
                    setBookingStep(1);
                    setAvailableLawyers([]);
                  }}
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  ← Back to Date Selection
                </button>
              </div>

              <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-amber-800">
                  <strong>Selected:</strong> {selectedDate} at {selectedTime}
                  {selectedPracticeArea && ` • ${selectedPracticeArea}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableLawyers.map((lawyer) => (
                  <motion.div
                    key={lawyer.id}
                    whileHover={{ y: -4 }}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                      selectedLawyer?.id === lawyer.id
                        ? 'border-[#d4a017] bg-amber-50'
                        : 'border-gray-200 hover:border-[#d4a017] hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedLawyer(lawyer)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {lawyer.user.firstName[0]}{lawyer.user.lastName[0]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {lawyer.user.firstName} {lawyer.user.lastName}
                        </h3>
                        <p className="text-gray-600 mb-2">{lawyer.firm}</p>
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {lawyer.location}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {lawyer.experience} years experience
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {lawyer.practiceAreas.slice(0, 3).map((area, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {area}
                            </span>
                          ))}
                          {lawyer.practiceAreas.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                              +{lawyer.practiceAreas.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      {selectedLawyer?.id === lawyer.id && (
                        <CheckCircle className="w-6 h-6 text-[#d4a017]" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {selectedLawyer && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setBookingStep(3)}
                    className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-8 py-3 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                  >
                    Continue to Booking Details
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Confirm Booking */}
          {bookingStep === 3 && selectedLawyer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-[#d4a017] text-white rounded-full flex items-center justify-center font-semibold mr-3">
                    3
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Confirm Booking</h2>
                </div>
                <button
                  onClick={() => setBookingStep(2)}
                  className="text-gray-500 hover:text-gray-700 font-medium"
                >
                  ← Back to Lawyer Selection
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Booking Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Summary</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold">
                          {selectedLawyer.user.firstName[0]}{selectedLawyer.user.lastName[0]}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {selectedLawyer.user.firstName} {selectedLawyer.user.lastName}
                          </h4>
                          <p className="text-gray-600">{selectedLawyer.firm}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">{selectedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{bookingData.duration} minutes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details Form */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Consultation Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Practice Area
                      </label>
                      <select
                        value={bookingData.practiceArea}
                        onChange={(e) => setBookingData({...bookingData, practiceArea: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                        required
                      >
                        <option value="">Select practice area</option>
                        {practiceAreas.map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meeting Type
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'VIRTUAL', icon: Video, label: 'Video Call' },
                          { value: 'PHONE', icon: Phone, label: 'Phone Call' },
                          { value: 'IN_PERSON', icon: User, label: 'In Person' },
                        ].map((type) => (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => setBookingData({...bookingData, meetingType: type.value as any})}
                            className={`p-3 border rounded-lg text-center transition-all ${
                              bookingData.meetingType === type.value
                                ? 'border-[#d4a017] bg-amber-50 text-[#d4a017]'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <type.icon className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-sm font-medium">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <select
                        value={bookingData.duration}
                        onChange={(e) => setBookingData({...bookingData, duration: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                      >
                        <option value="30">30 minutes</option>
                        <option value="60">60 minutes</option>
                        <option value="90">90 minutes</option>
                        <option value="120">2 hours</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description of Legal Matter
                      </label>
                      <textarea
                        value={bookingData.description}
                        onChange={(e) => setBookingData({...bookingData, description: e.target.value})}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d4a017] focus:border-[#d4a017]"
                        placeholder="Please describe your legal matter briefly..."
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleBookAppointment}
                  disabled={loading || !bookingData.practiceArea || !bookingData.description}
                  className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-12 py-4 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Booking Appointment...' : 'Confirm Booking'}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
}
