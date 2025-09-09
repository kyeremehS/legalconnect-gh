"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import AuthWrapper from "../../../../components/auth/AuthWrapper";
import BookAppointmentModal from "../../../../components/scheduling/BookAppointmentModal";
import { apiClient } from "../../../../../lib/api";
import { ArrowLeft, Calendar, Clock, MapPin, Star, User } from "lucide-react";
import Link from "next/link";

interface LawyerData {
  id: string;
  name: string;
  title: string;
  firm: string;
  practiceAreas: string[];
  experience?: number;
  location?: string;
  avatar?: string;
  bio?: string;
}

export default function BookLawyerAppointment() {
  const params = useParams();
  const lawyerId = params.id as string;
  const [lawyer, setLawyer] = useState<LawyerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLawyerData();
  }, [lawyerId]);

  const fetchLawyerData = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Fetch lawyer data from API
      const response = await apiClient.getLawyerById(lawyerId);
      if (response.success && response.data) {
        const userId = response.data.userId || response.data.user?.id;
        if (!userId) {
          setError("Invalid lawyer data");
          return;
        }

        setLawyer({
          id: userId, // Use userId for appointments
          name:
            `${response.data.user?.firstName || ""} ${
              response.data.user?.lastName || ""
            }`.trim() || "Unknown Lawyer",
          title: response.data.professionalSummary || "Legal Practitioner",
          firm: response.data.firm || "Law Firm",
          practiceAreas: response.data.practiceAreas || ["General Practice"],
          experience: response.data.experience,
          location: response.data.location,
          bio: response.data.professionalSummary,
        });
      } else {
        setError("Lawyer not found");
      }
    } catch (error) {
      console.error("Error fetching lawyer:", error);
      setError("Failed to load lawyer information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookAppointment = async (appointmentData: any) => {
    try {
      const response = await apiClient.createAppointment({
        ...appointmentData,
        lawyerId: lawyerId,
      });

      if (response.success) {
        setShowBookingModal(false);
        // Show success message
        alert(
          "Appointment request sent successfully! The lawyer will be notified."
        );
      } else {
        alert("Failed to book appointment. Please try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <AuthWrapper requiredRole="CLIENT">
        <div
          className={`min-h-screen bg-gray-50 flex items-center justify-center `}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AuthWrapper>
    );
  }

  if (error || !lawyer) {
    return (
      <AuthWrapper requiredRole="CLIENT">
        <div
          className={`min-h-screen bg-gray-50 flex items-center justify-center `}
        >
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Lawyer Not Found
            </h1>
            <p className="text-gray-600 mb-4">
              The lawyer you're looking for doesn't exist or is no longer
              available.
            </p>
            <Link
              href="/User-landing"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lawyers
            </Link>
          </div>
        </div>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper requiredRole="CLIENT">
      <div className={`min-h-screen bg-gray-50 `}>
        <main className="p-4 lg:p-8 pt-20 lg:pt-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="mb-8">
              <Link
                href="/User-landing"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Lawyers
              </Link>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    {lawyer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {lawyer.name}
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">{lawyer.title}</p>
                    <p className="text-gray-600 mb-3">{lawyer.firm}</p>

                    {lawyer.location && (
                      <div className="flex items-center text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        {lawyer.location}
                      </div>
                    )}

                    {lawyer.experience && (
                      <div className="flex items-center text-gray-600 mb-4">
                        <Star className="w-4 h-4 mr-2" />
                        {lawyer.experience} years of experience
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {lawyer.practiceAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#d4a017]/10 text-[#d4a017] text-sm rounded-full font-medium"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Schedule Your Consultation
                </h2>
                <p className="text-gray-600">
                  Book a consultation with {lawyer.name} to discuss your legal
                  needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Information Panel */}
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Consultation Details
                    </h3>
                    <ul className="text-blue-800 space-y-1 text-sm">
                      <li>• Standard consultation: 60 minutes</li>
                      <li>• Initial consultation fee may apply</li>
                      <li>• Bring relevant documents if possible</li>
                      <li>• Video or in-person options available</li>
                    </ul>
                  </div>

                  {lawyer.bio && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        About
                      </h3>
                      <p className="text-gray-700 text-sm">{lawyer.bio}</p>
                    </div>
                  )}

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">
                      What to Expect
                    </h3>
                    <ul className="text-green-800 space-y-1 text-sm">
                      <li>• Professional legal consultation</li>
                      <li>• Case assessment and recommendations</li>
                      <li>• Clear explanation of your options</li>
                      <li>• Transparent fee structure discussion</li>
                    </ul>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="flex flex-col justify-center">
                  <div className="text-center space-y-4">
                    <Calendar className="w-16 h-16 text-[#d4a017] mx-auto" />
                    <button
                      onClick={() => setShowBookingModal(true)}
                      className="w-full bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white font-semibold py-4 px-6 rounded-lg hover:from-[#b8941f] hover:to-[#d4a017] transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      Schedule Appointment
                    </button>
                    <p className="text-sm text-gray-600">
                      Select your preferred date and time
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </main>

        {/* Booking Modal */}
        {showBookingModal && (
          <BookAppointmentModal
            isOpen={showBookingModal}
            onClose={() => setShowBookingModal(false)}
            lawyer={{
              id: lawyerId,
              name: lawyer.name,
              practiceAreas: lawyer.practiceAreas,
            }}
            onBook={handleBookAppointment}
          />
        )}
      </div>
    </AuthWrapper>
  );
}
