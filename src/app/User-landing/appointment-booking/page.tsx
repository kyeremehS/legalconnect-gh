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
} from "lucide-react";
import BookAppointmentModal from "../../components/scheduling/BookAppointmentModal";
import AuthWrapper from "../../components/auth/AuthWrapper";
import { apiClient } from "../../../lib/api";

interface LawyerCardProps {
  lawyer: {
    id: string;
    name: string;
    firm: string;
    location: string;
    practiceAreas: string[];
    experience: number;
    avatar?: string;
    professionalSummary?: string;
    availabilitySlots?: any[];
    bookedAppointments?: any[];
  };
  selectedDate?: string;
  selectedTime?: string;
}

function LawyerCard({ lawyer, selectedDate, selectedTime }: LawyerCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  // Generate available time slots for this lawyer
  useEffect(() => {
    if (selectedDate && lawyer.availabilitySlots) {
      const dayOfWeek = new Date(selectedDate).getDay();
      const slots: string[] = [];
      
      lawyer.availabilitySlots.forEach((slot: any) => {
        // Check if this slot matches the selected date (either specific date or recurring day)
        const slotMatches = !slot.date || 
          (slot.date && new Date(slot.date).toDateString() === new Date(selectedDate).toDateString()) ||
          (!slot.date && slot.dayOfWeek === dayOfWeek);
          
        if (slotMatches && slot.isAvailable) {
          // Generate time slots from startTime to endTime
          const startHour = parseInt(slot.startTime.split(':')[0]);
          const startMin = parseInt(slot.startTime.split(':')[1]);
          const endHour = parseInt(slot.endTime.split(':')[0]);
          const endMin = parseInt(slot.endTime.split(':')[1]);
          
          let currentTime = startHour * 60 + startMin; // Convert to minutes
          const endTimeMin = endHour * 60 + endMin;
          
          while (currentTime < endTimeMin) {
            const hours = Math.floor(currentTime / 60);
            const minutes = currentTime % 60;
            const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            
            // Check if this time slot is not already booked
            const isBooked = lawyer.bookedAppointments?.some((appointment: any) => {
              const appointmentDate = new Date(appointment.startTime).toDateString();
              const appointmentTime = new Date(appointment.startTime).toTimeString().substring(0, 5);
              return appointmentDate === new Date(selectedDate).toDateString() && 
                     appointmentTime === timeString;
            });
            
            if (!isBooked) {
              slots.push(timeString);
            }
            
            currentTime += 60; // 1-hour intervals
          }
        }
      });
      
      setAvailableTimeSlots(slots);
    }
  }, [selectedDate, lawyer.availabilitySlots, lawyer.bookedAppointments]);

  const handleBookAppointment = async (appointmentData: any) => {
    try {
      const response = await apiClient.createAppointment(appointmentData);
      if (response.success) {
        alert(
          "Appointment request sent successfully! The lawyer will be notified."
        );
        setShowBookingModal(false);
      } else {
        alert("Failed to send appointment request. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to send appointment request. Please try again.");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      >
        {/* Lawyer Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {lawyer.name}
              </h3>
              <p className="text-amber-600 font-medium">{lawyer.firm}</p>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {lawyer.location}
              </div>
            </div>
          </div>
        </div>

        {/* Lawyer Details */}
        <div className="p-6 space-y-4">
          {/* Experience */}
          <div className="flex items-center text-gray-600">
            <Briefcase className="w-5 h-5 mr-2 text-amber-500" />
            <span className="font-medium">
              {lawyer.experience} years experience
            </span>
          </div>

          {/* Practice Areas */}
          <div>
            <div className="flex items-center mb-2">
              <GraduationCap className="w-5 h-5 mr-2 text-amber-500" />
              <span className="font-medium text-gray-700">Practice Areas</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {lawyer.practiceAreas.slice(0, 3).map((area, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200"
                >
                  {area}
                </span>
              ))}
              {lawyer.practiceAreas.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  +{lawyer.practiceAreas.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {lawyer.professionalSummary && (
            <div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {lawyer.professionalSummary}
              </p>
            </div>
          )}

          {/* Available Time Slots */}
          {selectedDate && availableTimeSlots.length > 0 && (
            <div>
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 mr-2 text-amber-500" />
                <span className="font-medium text-gray-700">Available Times</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableTimeSlots.slice(0, 4).map((time, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200"
                  >
                    {time}
                  </span>
                ))}
                {availableTimeSlots.length > 4 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    +{availableTimeSlots.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* No availability message */}
          {selectedDate && availableTimeSlots.length === 0 && (
            <div className="flex items-center text-gray-500">
              <Clock className="w-5 h-5 mr-2" />
              <span className="text-sm">No availability on selected date</span>
            </div>
          )}

          {/* Rating placeholder */}
          <div className="flex items-center">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 text-amber-400 fill-current"
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">(4.8)</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 pt-0">
          <button
            onClick={() => setShowBookingModal(true)}
            disabled={!!selectedDate && availableTimeSlots.length === 0}
            className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform shadow-lg ${
              !!selectedDate && availableTimeSlots.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 hover:scale-105 hover:shadow-xl'
            }`}
          >
            {!!selectedDate && availableTimeSlots.length === 0 
              ? 'No Availability' 
              : 'Book Consultation'
            }
          </button>
        </div>
      </motion.div>

      <BookAppointmentModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        lawyer={{
          id: lawyer.id,
          name: lawyer.name,
          practiceAreas: lawyer.practiceAreas,
          avatar: lawyer.avatar,
        }}
        onBook={handleBookAppointment}
      />
    </>
  );
}

export default function AppointmentBookingPage() {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [filteredLawyers, setFilteredLawyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState("All Areas");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    fetchLawyers();
  }, []);

  useEffect(() => {
    // Refetch when switching to/from availability filter
    if (showAvailableOnly && selectedDate && selectedTime) {
      fetchLawyers();
    } else if (!showAvailableOnly) {
      fetchLawyers();
    }
  }, [showAvailableOnly, selectedDate, selectedTime]);

  useEffect(() => {
    filterLawyers();
  }, [lawyers, searchTerm, selectedPracticeArea, selectedDate, selectedTime, showAvailableOnly]);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      let lawyersData = [];
      
      // If date and time are selected, fetch available lawyers
      if (selectedDate && selectedTime && showAvailableOnly) {
        const availableResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/availability/lawyers/available?date=${selectedDate}&time=${selectedTime}`
        );
        if (availableResponse.ok) {
          const availableData = await availableResponse.json();
          lawyersData = availableData.data || [];
        }
      } else {
        // Otherwise fetch all lawyers
        const response = await apiClient.getLawyers();
        if (response.success && response.data) {
          lawyersData = response.data;
        }
      }

      // Transform API data to match our component interface
      const transformedLawyers = lawyersData.map((lawyer: any) => ({
        id: lawyer.userId || lawyer.user?.id,
        name: `${lawyer.user?.firstName || ""} ${
          lawyer.user?.lastName || ""
        }`.trim(),
        firm: lawyer.firm,
        location: lawyer.location,
        practiceAreas: lawyer.practiceAreas || [],
        experience: lawyer.experience,
        avatar: lawyer.user?.avatar,
        professionalSummary: lawyer.professionalSummary,
        availabilitySlots: lawyer.availabilitySlots || [],
        bookedAppointments: lawyer.bookedAppointments || [],
      }));

      setLawyers(transformedLawyers);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
      setError("Failed to fetch lawyers");
    } finally {
      setLoading(false);
    }
  };

  const filterLawyers = () => {
    let filtered = lawyers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lawyer.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lawyer.practiceAreas.some((area: string) =>
            area.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by practice area
    if (selectedPracticeArea !== "All Areas") {
      filtered = filtered.filter((lawyer) =>
        lawyer.practiceAreas.includes(selectedPracticeArea)
      );
    }

    setFilteredLawyers(filtered);
  };

  // Get unique practice areas from all lawyers
  const practiceAreas = [
    "All Areas",
    ...Array.from(new Set(lawyers.flatMap((lawyer) => lawyer.practiceAreas))),
  ];

  if (loading) {
    return (
      <AuthWrapper requiredRole="CLIENT">
        <div
          className={`min-h-screen bg-gradient-to-br from-gray-50 to-amber-50`}
        >
          <div className="flex items-center justify-center h-screen">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
            />
          </div>
        </div>
      </AuthWrapper>
    );
  }

  if (error) {
    return (
      <AuthWrapper requiredRole="CLIENT">
        <div
          className={`min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 flex items-center justify-center`}
        >
          <div className="text-center">
            <div className="text-red-600 text-lg font-medium mb-2">{error}</div>
            <button
              onClick={fetchLawyers}
              className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper requiredRole="CLIENT">
      <div
        className={`min-h-screen bg-gradient-to-br from-gray-50 to-amber-50`}
      >
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Book Your Legal Consultation
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with experienced legal professionals in Ghana. Choose
                from our network of qualified lawyers and schedule your
                consultation today.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search lawyers, firms, or practice areas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Date Selection */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Time Selection */}
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white"
                >
                  <option value="">Any Time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>

              {/* Practice Area Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedPracticeArea}
                  onChange={(e) => setSelectedPracticeArea(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors bg-white min-w-[200px]"
                >
                  {practiceAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Availability Filter Toggle */}
            <div className="mt-4 flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAvailableOnly}
                  onChange={(e) => setShowAvailableOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showAvailableOnly ? 'bg-amber-500' : 'bg-gray-300'
                }`}>
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showAvailableOnly ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  Show only lawyers available at selected time
                </span>
              </label>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredLawyers.length} of {lawyers.length} lawyers
              {selectedDate && (
                <span className="ml-2 text-amber-600">
                  for {new Date(selectedDate).toLocaleDateString()}
                  {selectedTime && ` at ${selectedTime}`}
                </span>
              )}
            </div>
          </motion.div>

          {/* Lawyers Grid */}
          {filteredLawyers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-500 text-lg">
                No lawyers found matching your criteria.
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedPracticeArea("All Areas");
                  setSelectedDate("");
                  setSelectedTime("");
                  setShowAvailableOnly(false);
                }}
                className="mt-4 bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredLawyers.map((lawyer: any, index: number) => (
                <motion.div
                  key={lawyer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <LawyerCard 
                    lawyer={lawyer} 
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">Need help choosing the right lawyer?</p>
              <p className="text-sm">
                Our lawyers are verified members of the Ghana Bar Association
                and are committed to providing quality legal services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}
