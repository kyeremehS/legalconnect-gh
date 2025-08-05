
import {
lawyers, Lawyer as MockLawyer
} from "../../components/mockdata";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookAppointment from "../../components/BookAppointment";


import {
  Users,
  Check,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Filter,
  Search,
  Menu,
  X,
  UserPlus,
  MessageCircle,
  Phone,
  BookOpen,
  Award,
  Building,
  Eye,
  Star,
  Mail,
  Globe
} from "lucide-react";


export default function LawyerProfileModal({ 
  lawyer, 
  isOpen, 
  onClose 
}: { 
  lawyer: MockLawyer; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {lawyer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{lawyer.name}</h2>
                  <p className="text-xl opacity-90">{lawyer.title}</p>
                  <p className="text-lg opacity-80">{lawyer.firm}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Professional Summary */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#d4a017]" />
                    Professional Summary
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {lawyer.detailedBio || lawyer.professionalSummary}
                  </p>
                </div>

                {/* Practice Areas */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#d4a017]" />
                    Practice Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {lawyer.practiceAreas.map((area, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#d4a017]/10 text-[#d4a017] rounded-full font-medium text-sm"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                {lawyer.specializations && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#d4a017]" />
                      Specializations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {lawyer.specializations.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#d4a017] rounded-full" />
                          <span className="text-gray-700">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Publications */}
                {lawyer.publications && lawyer.publications.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#d4a017]" />
                      Publications
                    </h3>
                    <div className="space-y-2">
                      {lawyer.publications.map((pub, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-[#d4a017] rounded-full mt-2" />
                          <span className="text-gray-700">{pub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Awards */}
                {lawyer.awards && lawyer.awards.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#d4a017]" />
                      Awards & Recognition
                    </h3>
                    <div className="space-y-2">
                      {lawyer.awards.map((award, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Award className="w-4 h-4 text-yellow-500 mt-0.5" />
                          <span className="text-gray-700">{award}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Contact & Details */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Quick Facts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{lawyer.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{lawyer.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Bar: {lawyer.barAdmissionYear}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{lawyer.barAssociation}</span>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Education
                  </h3>
                  <p className="text-sm text-gray-700">{lawyer.education}</p>
                </div>

                {/* Languages */}
                {lawyer.languages && (
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {lawyer.languages.map((lang, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-900 mb-3">Contact</h3>
                  <div className="space-y-2">
                    {lawyer.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{lawyer.email}</span>
                      </div>
                    )}
                    {lawyer.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{lawyer.phone}</span>
                      </div>
                    )}
                    {lawyer.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{lawyer.website}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Book Appointment Button */}
                {lawyer.calendlyLink && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#d4a017] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-2"
                    onClick={() => setShowBookingModal(true)}
                  >
                    <Calendar className="w-5 h-5" />
                    Book Consultation
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Booking Modal */}
          {showBookingModal && lawyer.calendlyLink && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 flex items-center justify-center p-4"
              onClick={() => setShowBookingModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Book Consultation with {lawyer.name}
                    </h2>
                    <button
                      onClick={() => setShowBookingModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                  <p className="text-gray-600 mt-2">
                    {lawyer.title} at {lawyer.firm}
                  </p>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                  <BookAppointment
                    name={lawyer.name}
                    calendlyLink={lawyer.calendlyLink}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}