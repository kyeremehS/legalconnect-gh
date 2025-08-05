"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Inter } from 'next/font/google';
import BookAppointment from "../../components/BookAppointment";
import LawyerCard from "@/app/components/lawyer/LawyerCard";

import {
lawyers, Lawyer as MockLawyer
} from "../../components/mockdata";

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