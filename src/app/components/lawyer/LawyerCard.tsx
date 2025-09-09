
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lawyer } from "../../../types/lawyer";
import LawyerProfileModal from "../lawyer/LawyerProfileModal";
import BookAppointment from "../BookAppointment";

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
  Globe,
} from "lucide-react";

export default function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleViewProfile = () => {
    setShowProfileModal(true);
  };

  const handleBookAppointment = () => {
    setShowBookingModal(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 max-h-[400px] flex flex-col cursor-pointer"
        onClick={handleViewProfile}
      >
        {/* Header - Fixed Height */}
        <div className="flex items-start gap-3 mb-3 h-[60px]">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {lawyer.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm text-gray-900 truncate">{lawyer.name}</h3>
            <p className="text-[#d4a017] font-medium text-xs truncate">{lawyer.title}</p>
            <p className="text-gray-600 text-xs truncate">{lawyer.firm}</p>
            
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
              <div className="flex items-center gap-1 flex-shrink-0">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{lawyer.location.split(',')[0]}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Award className="w-3 h-3 text-[#d4a017]" />
                <span>{lawyer.barAdmissionYear}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary - Fixed Height */}
        <div className="h-[32px] mb-3">
          <p className="text-gray-600 text-xs line-clamp-2">{lawyer.professionalSummary}</p>
        </div>

        {/* Practice Areas - Fixed Height */}
        <div className="mb-3 h-[60px]">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Practice Areas</h4>
          <div className="flex flex-wrap gap-1">
            {lawyer.practiceAreas.slice(0, 2).map((area: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 bg-[#d4a017]/10 text-[#d4a017] text-xs rounded-full font-medium truncate max-w-[120px]"
                title={area}
              >
                {area}
              </span>
            ))}
            {lawyer.practiceAreas.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                +{lawyer.practiceAreas.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Professional Information - Fixed Height */}
        <div className="grid grid-cols-2 gap-2 mb-3 py-2 border-t border-gray-100 h-[50px]">
          <div className="min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <GraduationCap className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Education</span>
            </div>
            <p className="text-xs text-gray-600 line-clamp-1" title={lawyer.education}>
              {lawyer.education.split(',')[0]}...
            </p>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <Building className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Experience</span>
            </div>
            <p className="text-xs font-medium text-gray-900">{lawyer.experience} years</p>
          </div>
        </div>

        {/* Educational Publications - Fixed Height (Optional) */}
        {lawyer.publications && lawyer.publications.length > 0 && (
          <div className="mb-3 h-[45px]">
            <div className="flex items-center gap-1 mb-1">
              <BookOpen className="w-3 h-3 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Publications</span>
            </div>
            <div>
              <p className="text-xs text-gray-600 line-clamp-1" title={lawyer.publications[0]}>
                • {lawyer.publications[0]}
              </p>
              {lawyer.publications.length > 1 && (
                <p className="text-xs text-gray-500">+{lawyer.publications.length - 1} more</p>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons - Fixed at Bottom */}
        <div className="mt-auto space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-100 text-gray-700 py-2 px-3 rounded-xl text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                handleViewProfile();
              }}
            >
              <Eye className="w-3 h-3" />
              <span className="truncate">View</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-100 text-blue-700 py-2 px-3 rounded-xl text-xs font-medium hover:bg-blue-200 transition-colors flex items-center justify-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                // Navigate to messages page with lawyer pre-selected
                window.location.href = `/User-landing/messages?lawyer=${lawyer.id}&name=${encodeURIComponent(lawyer.name)}`;
              }}
            >
              <MessageCircle className="w-3 h-3" />
              <span className="truncate">Message</span>
            </motion.button>
          </div>
          
          {/* Book Appointment Button */}
          {lawyer.calendlyLink && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#d4a017] text-white py-2 px-3 rounded-xl text-xs font-medium hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-1"
              onClick={(e) => {
                e.stopPropagation();
                handleBookAppointment();
              }}
            >
              <Calendar className="w-3 h-3" />
              <span className="truncate">Book Appointment</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Profile Modal */}
      <LawyerProfileModal
        lawyer={lawyer}
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      {/* Booking Modal */}
      {showBookingModal && lawyer.calendlyLink && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
                  Book Appointment with {lawyer.name}
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
    </>
  );
}
