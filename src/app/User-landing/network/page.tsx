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
  professionalSummary: string; // Changed from promotional "bio"
  publications?: string[]; // Educational content they've published
  calendlyLink?: string; // Add this line
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
    calendlyLink: "https://calendly.com/affum3331/30min", // Add unique link
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
    calendlyLink: "https://calendly.com/kwame-mensah/consultation", // Add unique link
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
    calendlyLink: "https://calendly.com/abena-owusu/family-law-session", // Add unique link
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
    calendlyLink: "https://calendly.com/kojo-asante/criminal-defense", // Add unique link
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
    calendlyLink: "https://calendly.com/efua-boateng/employment-consultation", // Add unique link
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

// Lawyer Card Component (regulation compliant)
function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  const [isConnected, setIsConnected] = useState(lawyer.isConnected);
  const [isPending, setIsPending] = useState(lawyer.isPending);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleConnect = () => {
    if (!isConnected && !isPending) {
      setIsPending(true);
    }
  };

  const handleMessage = () => {
    // Navigate to messaging for professional consultation
    console.log("Professional consultation request:", lawyer.name);
  };

  const handleCall = () => {
    // Professional contact
    console.log("Professional contact:", lawyer.name);
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
        className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:shadow-lg transition-all duration-300 ${inter.className}`}
      >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold text-sm">
            {lawyer.name.split(' ').map(n => n[0]).join('')}
          </div>
          {isConnected && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <Check className="w-2 h-2 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-sm text-gray-900">{lawyer.name}</h3>
          <p className="text-[#d4a017] font-medium text-xs">{lawyer.title}</p>
          <p className="text-gray-600 text-xs">{lawyer.firm}</p>
          
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{lawyer.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-3 h-3 text-[#d4a017]" />
              <span>Bar: {lawyer.barAdmissionYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{lawyer.professionalSummary}</p>

      {/* Practice Areas */}
      <div className="mb-3">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Practice Areas</h4>
        <div className="flex flex-wrap gap-1">
          {lawyer.practiceAreas.slice(0, 3).map((area, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-[#d4a017]/10 text-[#d4a017] text-xs rounded-full font-medium"
            >
              {area}
            </span>
          ))}
          {lawyer.practiceAreas.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{lawyer.practiceAreas.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Professional Information */}
      <div className="grid grid-cols-2 gap-3 mb-3 py-2 border-t border-gray-100">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <GraduationCap className="w-3 h-3 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Education</span>
          </div>
          <p className="text-xs text-gray-600 line-clamp-2">{lawyer.education}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 mb-1">
            <Building className="w-3 h-3 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Experience</span>
          </div>
          <p className="text-xs font-medium text-gray-900">{lawyer.experience} years</p>
        </div>
      </div>

      {/* Educational Publications (if any) */}
      {lawyer.publications && lawyer.publications.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center gap-1 mb-1">
            <BookOpen className="w-3 h-3 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Educational Content</span>
          </div>
          <div className="space-y-1">
            {lawyer.publications.slice(0, 2).map((pub, idx) => (
              <p key={idx} className="text-xs text-gray-600 line-clamp-1">• {pub}</p>
            ))}
            {lawyer.publications.length > 2 && (
              <p className="text-xs text-gray-500">+{lawyer.publications.length - 2} more</p>
            )}
          </div>
        </div>
      )}

      {/* Professional Contact Options */}
      <div className="space-y-2">
        {isConnected ? (
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-[#d4a017] text-white py-2 px-3 rounded-xl text-xs font-medium hover:bg-[#b8941f] transition-colors flex items-center justify-center gap-1"
              onClick={handleMessage}
            >
              <MessageCircle className="w-3 h-3" />
              Consult
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-100 text-gray-700 py-2 px-3 rounded-xl text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
              onClick={handleCall}
            >
              <Phone className="w-3 h-3" />
            </motion.button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-2 px-3 rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
              isPending
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-[#d4a017] text-white hover:bg-[#b8941f]"
            }`}
            onClick={handleConnect}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Calendar className="w-3 h-3" />
                Request Sent
              </>
            ) : (
              <>
                <UserPlus className="w-3 h-3" />
                Connect
              </>
            )}
          </motion.button>
        )}
        
        {/* Book Appointment Button - Always visible if calendlyLink exists */}
        {lawyer.calendlyLink && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-green-600 text-white py-2 px-3 rounded-xl text-xs font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
            onClick={handleBookAppointment}
          >
            <Calendar className="w-3 h-3" />
            Book Appointment
          </motion.button>
        )}
      </div>
    </motion.div>

    {/* Booking Modal for this specific lawyer */}
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

// Mobile Sidebar Component
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