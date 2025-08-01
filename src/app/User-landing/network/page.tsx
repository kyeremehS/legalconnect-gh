"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inter } from 'next/font/google';
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
  Globe,
} from "lucide-react";

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Lawyer data structure (compliant with regulations)
interface Lawyer {
  id: string;
  name: string;
  title: string;
  firm: string;
  location: string;
  barAdmissionYear: number;
  experience: number;
  practiceAreas: string[];
  education: string;
  barAssociation: string;
  profileImage: string;
  isConnected: boolean;
  isPending: boolean;
  connectionCount: number;
  professionalSummary: string;
  publications?: string[];
  calendlyLink?: string;
  email?: string;
  phone?: string;
  website?: string;
  detailedBio?: string;
  specializations?: string[];
  awards?: string[];
  languages?: string[];
}

// Sample lawyers data (regulation compliant)
const lawyers: Lawyer[] = [
  {
    id: "1",
    name: "Ama Kwarteng",
    title: "Senior Partner",
    firm: "Kwarteng & Associates",
    location: "Accra, Ghana",
    barAdmissionYear: 2008,
    experience: 15,
    practiceAreas: ["Corporate Law", "Commercial Litigation", "Contract Law"],
    education: "University of Ghana School of Law, LLB (2007)",
    barAssociation: "Ghana Bar Association",
    profileImage: "/lawyers/ama-kwarteng.jpg",
    isConnected: false,
    isPending: false,
    connectionCount: 500,
    professionalSummary: "Legal practitioner specializing in corporate and commercial matters.",
    publications: ["Understanding Corporate Governance in Ghana", "Contract Law Basics"],
    calendlyLink: "https://calendly.com/affum3331/30min",
    email: "ama@kwartenglaw.com",
    phone: "+233 24 123 4567",
    website: "www.kwartenglaw.com",
    detailedBio: "Ama Kwarteng is a highly experienced corporate lawyer with over 15 years of practice in Ghana. She specializes in corporate governance, mergers and acquisitions, and commercial litigation. She has advised numerous multinational corporations and local businesses on complex legal matters.",
    specializations: ["Mergers & Acquisitions", "Securities Law", "International Trade"],
    awards: ["Ghana Law Awards - Corporate Lawyer of the Year 2022", "Outstanding Legal Practitioner 2021"],
    languages: ["English", "Twi", "French"]
  },
  {
    id: "2",
    name: "Kwame Mensah",
    title: "Legal Practitioner",
    firm: "Mensah Legal Consultancy",
    location: "Kumasi, Ghana",
    barAdmissionYear: 2011,
    experience: 12,
    practiceAreas: ["Land Law", "Property Law", "Real Estate"],
    education: "KNUST Faculty of Law, LLB (2010)",
    barAssociation: "Ghana Bar Association",
    profileImage: "/lawyers/kwame-mensah.jpg",
    isConnected: true,
    isPending: false,
    connectionCount: 342,
    professionalSummary: "Legal practitioner with focus on land and property law matters.",
    publications: ["Land Rights in Ghana: A Guide"],
    calendlyLink: "https://calendly.com/kwame-mensah/consultation",
    email: "kwame@mensahlegal.com",
    phone: "+233 20 987 6543",
    detailedBio: "Kwame Mensah has dedicated his career to property and land law in Ghana. He has successfully handled over 200 land disputes and property transactions, making him one of the most sought-after property lawyers in the Ashanti region.",
    specializations: ["Land Disputes", "Property Transactions", "Real Estate Development"],
    awards: ["Best Property Lawyer - Ashanti Region 2020"],
    languages: ["English", "Twi", "Asante Twi"]
  },
  {
    id: "3",
    name: "Abena Owusu",
    title: "Family Law Practitioner",
    firm: "Owusu Family Law Chambers",
    location: "Takoradi, Ghana",
    barAdmissionYear: 2013,
    experience: 10,
    practiceAreas: ["Family Law", "Matrimonial Law", "Child Welfare"],
    education: "University of Cape Coast Faculty of Law, LLB (2012)",
    barAssociation: "Ghana Bar Association",
    profileImage: "/lawyers/abena-owusu.jpg",
    isConnected: false,
    isPending: true,
    connectionCount: 278,
    professionalSummary: "Legal practitioner focusing on family and matrimonial law.",
    publications: ["Family Law in Ghana: Know Your Rights"],
    calendlyLink: "https://calendly.com/abena-owusu/family-law-session",
    email: "abena@owusufamilylaw.com",
    phone: "+233 31 456 7890",
    detailedBio: "Abena Owusu is a compassionate family law practitioner who has helped hundreds of families navigate complex legal situations. She specializes in divorce proceedings, child custody, and domestic violence cases.",
    specializations: ["Divorce & Separation", "Child Custody", "Domestic Violence"],
    awards: ["Family Law Excellence Award 2021"],
    languages: ["English", "Fante", "Twi"]
  },
  {
    id: "4",
    name: "Kojo Asante",
    title: "Criminal Law Practitioner",
    firm: "Asante Defense Chambers",
    location: "Accra, Ghana",
    barAdmissionYear: 2005,
    experience: 18,
    practiceAreas: ["Criminal Law", "Constitutional Law", "Human Rights"],
    education: "Ghana School of Law, BL (2005)",
    barAssociation: "Ghana Bar Association",
    profileImage: "/lawyers/kojo-asante.jpg",
    isConnected: false,
    isPending: false,
    connectionCount: 612,
    professionalSummary: "Legal practitioner with experience in criminal and constitutional matters.",
    publications: ["Understanding Your Rights Under Ghana's Constitution", "Criminal Procedure Guide"],
    calendlyLink: "https://calendly.com/kojo-asante/criminal-defense",
    email: "kojo@asantedefense.com",
    phone: "+233 26 789 0123",
    website: "www.asantedefense.com",
    detailedBio: "Kojo Asante is a renowned criminal defense lawyer with an impressive track record in high-profile criminal and constitutional cases. He has successfully defended clients in the Supreme Court and is known for his expertise in human rights law.",
    specializations: ["Criminal Defense", "Constitutional Law", "Human Rights Advocacy"],
    awards: ["Criminal Defense Lawyer of the Year 2019", "Human Rights Advocate 2020"],
    languages: ["English", "Twi", "Ga"]
  },
  {
    id: "5",
    name: "Efua Boateng",
    title: "Employment Law Practitioner",
    firm: "Boateng Legal Services",
    location: "Tema, Ghana",
    barAdmissionYear: 2015,
    experience: 8,
    practiceAreas: ["Employment Law", "Labour Law", "Industrial Relations"],
    education: "University of Professional Studies Law School, LLB (2014)",
    barAssociation: "Ghana Bar Association",
    profileImage: "/lawyers/efua-boateng.jpg",
    isConnected: false,
    isPending: false,
    connectionCount: 289,
    professionalSummary: "Legal practitioner specializing in employment and labour law.",
    publications: ["Workers' Rights in Ghana: An Overview"],
    calendlyLink: "https://calendly.com/efua-boateng/employment-consultation",
    email: "efua@boatenglegal.com",
    phone: "+233 30 234 5678",
    detailedBio: "Efua Boateng is a dedicated employment lawyer who advocates for workers' rights and helps businesses navigate complex employment regulations. She has extensive experience in labor disputes and employment contract negotiations.",
    specializations: ["Employment Contracts", "Labor Disputes", "Workplace Rights"],
    awards: ["Rising Star in Employment Law 2022"],
    languages: ["English", "Twi", "Ewe"]
  },
];

// Filter options
const practiceAreaFilters = [
  "All Areas",
  "Corporate Law",
  "Land Law",
  "Family Law", 
  "Criminal Law",
  "Employment Law",
  "Commercial Law",
  "Constitutional Law",
];

const locationFilters = [
  "All Locations",
  "Accra",
  "Kumasi", 
  "Takoradi",
  "Tema",
  "Cape Coast",
];

// Lawyer Profile Modal Component
function LawyerProfileModal({ 
  lawyer, 
  isOpen, 
  onClose 
}: { 
  lawyer: Lawyer; 
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

// Lawyer Card Component (simplified)
function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
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
        className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 h-[400px] flex flex-col cursor-pointer ${inter.className}`}
        onClick={handleViewProfile}
      >
        {/* Header - Fixed Height */}
        <div className="flex items-start gap-3 mb-3 h-[60px]">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {lawyer.name.split(' ').map(n => n[0]).join('')}
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
            {lawyer.practiceAreas.slice(0, 2).map((area, idx) => (
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
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded-xl text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProfile();
            }}
          >
            <Eye className="w-3 h-3" />
            <span className="truncate">View Profile</span>
          </motion.button>
          
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

// Mobile Sidebar Component (unchanged)
function MobileSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className={`fixed left-0 top-0 bottom-0 w-72 bg-white border-r border-gray-200 z-50 lg:hidden overflow-y-auto ${inter.className}`}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#d4a017] rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg text-gray-800">Legal Directory</h1>
                    <p className="text-xs text-gray-500">Find Legal Practitioners</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={onClose}
                >
                  <X className="w-4 h-4 text-gray-600" />
                </motion.button>
              </div>

              {/* Professional Directory Info */}
              <div className="bg-gradient-to-r from-[#d4a017]/10 to-[#b8941f]/10 rounded-xl p-3 mb-4">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">Directory Information</h3>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Listed Practitioners</span>
                    <span className="font-medium">{lawyers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Practice Areas</span>
                    <span className="font-medium">{practiceAreaFilters.length - 1}</span>
                  </div>
                </div>
              </div>

              {/* Directory Actions */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-700 text-sm">Directory</h3>
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#d4a017]" />
                    <span className="text-sm">Search Practitioners</span>
                  </div>
                </button>
                <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#d4a017]" />
                    <span className="text-sm">Educational Content</span>
                  </div>
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function LegalDirectoryPage() {
  const [filteredLawyers, setFilteredLawyers] = useState(lawyers);
  const [selectedPracticeArea, setSelectedPracticeArea] = useState("All Areas");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter lawyers based on selected filters
  React.useEffect(() => {
    let filtered = lawyers;

    if (selectedPracticeArea !== "All Areas") {
      filtered = filtered.filter(lawyer =>
        lawyer.practiceAreas.includes(selectedPracticeArea)
      );
    }

    if (selectedLocation !== "All Locations") {
      filtered = filtered.filter(lawyer =>
        lawyer.location.includes(selectedLocation)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(lawyer =>
        lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lawyer.practiceAreas.some(area =>
          area.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        lawyer.firm.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLawyers(filtered);
  }, [selectedPracticeArea, selectedLocation, searchQuery]);

  return (
    <div className={`min-h-screen bg-gray-50 mb-20 lg:mb-0 ${inter.className}`}>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-30">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </motion.button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#d4a017] rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <h1 className="font-bold text-base text-gray-800">Legal Directory</h1>
          </div>

          <div className="w-9" />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex h-screen pt-16 lg:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-72 bg-white border-r border-gray-200 flex-col py-4 px-3 shadow-sm m-4 rounded-xl">
          <div>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6 px-2"
            >
              <div className="w-10 h-10 bg-[#d4a017] rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-800">Legal Directory</h1>
                <p className="text-xs text-gray-500">Find Legal Practitioners</p>
              </div>
            </motion.div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search practitioners..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#d4a017]/20 focus:border-[#d4a017] transition-colors text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              {/* Practice Area Filter */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-1 text-sm">
                  <Filter className="w-3 h-3" />
                  Practice Area
                </h3>
                <div className="space-y-1">
                  {practiceAreaFilters.map((area) => (
                    <motion.button
                      key={area}
                      whileHover={{ x: 3 }}
                      className={`w-full text-left px-2 py-1 rounded-lg transition-colors text-xs ${
                        selectedPracticeArea === area
                          ? "bg-[#d4a017] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedPracticeArea(area)}
                    >
                      {area}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" />
                  Location
                </h3>
                <div className="space-y-1">
                  {locationFilters.map((location) => (
                    <motion.button
                      key={location}
                      whileHover={{ x: 3 }}
                      className={`w-full text-left px-2 py-1 rounded-lg transition-colors text-xs ${
                        selectedLocation === location
                          ? "bg-[#d4a017] text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedLocation(location)}
                    >
                      {location}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Regulatory Compliance Notice */}
            <div className="mt-6 p-3 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-700 mb-1 text-xs">Professional Directory</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                This directory lists qualified legal practitioners for informational purposes. 
                All practitioners are members of the Ghana Bar Association.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Ghana Legal Practitioners Directory
              </h1>
              <p className="text-sm text-gray-600">
                Professional directory of qualified legal practitioners in Ghana. Found {filteredLawyers.length} practitioners.
              </p>
            </motion.div>

            {/* Mobile Filters */}
            <div className="lg:hidden mb-4 space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {practiceAreaFilters.slice(0, 4).map((area) => (
                  <button
                    key={area}
                    className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-medium transition-colors ${
                      selectedPracticeArea === area
                        ? "bg-[#d4a017] text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                    onClick={() => setSelectedPracticeArea(area)}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Lawyers Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {filteredLawyers.map((lawyer, index) => (
                <motion.div
                  key={lawyer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LawyerCard lawyer={lawyer} />
                </motion.div>
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredLawyers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  No practitioners found
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Try adjusting your search criteria.
                </p>
                <button
                  className="bg-[#d4a017] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#b8941f] transition-colors"
                  onClick={() => {
                    setSelectedPracticeArea("All Areas");
                    setSelectedLocation("All Locations");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}