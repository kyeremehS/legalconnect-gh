"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, MessageCircle, MapPin, Briefcase } from "lucide-react";
import { apiClient } from "../../../lib/api";
import { transformLawyerData } from "../../../lib/api";

interface Lawyer {
  id: string;
  name: string;
  firm: string;
  location: string;
  practiceAreas: string[];
  profileImage?: string;
}

interface LawyerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLawyer: (lawyerId: string, lawyerName: string) => void;
}

export default function LawyerSelectionModal({
  isOpen,
  onClose,
  onSelectLawyer,
}: LawyerSelectionModalProps) {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch lawyers when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchLawyers();
    }
  }, [isOpen]);

  // Filter lawyers based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredLawyers(lawyers);
    } else {
      const filtered = lawyers.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.firm.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.practiceAreas.some((area) =>
            area.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
      setFilteredLawyers(filtered);
    }
  }, [searchQuery, lawyers]);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.getLawyers();

      if (response.success && response.data) {
        const transformedLawyers = response.data.map((lawyer: any) => ({
          id: lawyer.userId || lawyer.id,
          name: lawyer.user
            ? `${lawyer.user.firstName} ${lawyer.user.lastName}`
            : "Unknown Lawyer",
          firm: lawyer.firm || "Private Practice",
          location: lawyer.location || "Ghana",
          practiceAreas: lawyer.practiceAreas || [],
          profileImage: lawyer.user?.avatar,
        }));

        setLawyers(transformedLawyers);
      } else {
        setError("Failed to load lawyers");
      }
    } catch (err) {
      console.error("Error fetching lawyers:", err);
      setError("Failed to load lawyers");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLawyer = (lawyer: Lawyer) => {
    onSelectLawyer(lawyer.id, lawyer.name);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Select a Lawyer to Message
                </h2>
                <p className="text-gray-600 mt-1">
                  Choose a lawyer to start a conversation
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>

            {/* Search */}
            <div className="mt-4 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search lawyers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#d4a017] focus:border-transparent"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#d4a017]"></div>
                <span className="ml-3 text-gray-600">Loading lawyers...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">{error}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={fetchLawyers}
                  className="px-4 py-2 bg-[#d4a017] text-white rounded-lg hover:bg-[#b8941f] transition-colors"
                >
                  Try Again
                </motion.button>
              </div>
            ) : filteredLawyers.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchQuery ? "No lawyers found matching your search" : "No lawyers available"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLawyers.map((lawyer) => (
                  <motion.div
                    key={lawyer.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 border border-gray-200 rounded-xl hover:border-[#d4a017] hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => handleSelectLawyer(lawyer)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold">
                        {lawyer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {lawyer.name}
                        </h3>
                        <p className="text-sm text-gray-600 truncate">
                          {lawyer.firm}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{lawyer.location}</span>
                          </div>
                          {lawyer.practiceAreas.length > 0 && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Briefcase className="w-3 h-3" />
                              <span>{lawyer.practiceAreas[0]}</span>
                              {lawyer.practiceAreas.length > 1 && (
                                <span>+{lawyer.practiceAreas.length - 1}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Message button */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="p-2 bg-[#d4a017]/10 text-[#d4a017] rounded-lg group-hover:bg-[#d4a017] group-hover:text-white transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
