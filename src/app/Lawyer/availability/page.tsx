"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface AvailabilitySlot {
  id?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  date?: string;
  isAvailable: boolean;
}

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday', 
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function LawyerAvailabilityPage() {
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [lawyerId, setLawyerId] = useState<string>('');

  // Form states for adding new slots
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSlot, setNewSlot] = useState<AvailabilitySlot>({
    dayOfWeek: 1,
    startTime: '09:00',
    endTime: '17:00',
    isAvailable: true,
  });

  useEffect(() => {
    // Get lawyer ID from localStorage or auth context
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setLawyerId(user.id);
      fetchAvailability(user.id);
    }
  }, []);

  const fetchAvailability = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/availability/lawyer/${id}/availability`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAvailabilitySlots(data.data || []);
      } else {
        setMessage({ type: 'error', text: 'Failed to fetch availability' });
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
      setMessage({ type: 'error', text: 'Failed to fetch availability' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlot = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/availability/lawyer/${lawyerId}/availability`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(newSlot)
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAvailabilitySlots([...availabilitySlots, data.data]);
        setShowAddForm(false);
        setNewSlot({
          dayOfWeek: 1,
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: true,
        });
        setMessage({ type: 'success', text: 'Availability slot added successfully!' });
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.message || 'Failed to add slot' });
      }
    } catch (error) {
      console.error('Error adding slot:', error);
      setMessage({ type: 'error', text: 'Failed to add slot' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/availability/availability/${slotId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.ok) {
        setAvailabilitySlots(availabilitySlots.filter(slot => slot.id !== slotId));
        setMessage({ type: 'success', text: 'Availability slot deleted successfully!' });
      } else {
        setMessage({ type: 'error', text: 'Failed to delete slot' });
      }
    } catch (error) {
      console.error('Error deleting slot:', error);
      setMessage({ type: 'error', text: 'Failed to delete slot' });
    }
  };

  const handleCreateRecurring = async () => {
    const schedule = DAYS_OF_WEEK.slice(1, 6).map((_, index) => ({
      dayOfWeek: index + 1, // Monday to Friday (1-5)
      startTime: '09:00',
      endTime: '17:00',
    }));

    try {
      setSaving(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/availability/lawyer/${lawyerId}/availability/recurring`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ schedule })
        }
      );

      if (response.ok) {
        fetchAvailability(lawyerId); // Refresh the list
        setMessage({ type: 'success', text: 'Recurring availability created for Mon-Fri 9AM-5PM!' });
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.message || 'Failed to create recurring availability' });
      }
    } catch (error) {
      console.error('Error creating recurring availability:', error);
      setMessage({ type: 'error', text: 'Failed to create recurring availability' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Manage Your Availability
          </h1>
          <p className="text-gray-600">
            Set your available hours so clients can book consultations with you.
          </p>
        </div>

        {/* Message */}
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
              className="ml-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Availability Slot
            </button>
            <button
              onClick={handleCreateRecurring}
              disabled={saving}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center disabled:opacity-50"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Set Mon-Fri 9AM-5PM
            </button>
          </div>
        </div>

        {/* Add Slot Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-sm p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Availability Slot</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Day of Week
                </label>
                <select
                  value={newSlot.dayOfWeek}
                  onChange={(e) => setNewSlot({ ...newSlot, dayOfWeek: parseInt(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {DAYS_OF_WEEK.map((day, index) => (
                    <option key={index} value={index}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  value={newSlot.startTime}
                  onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={newSlot.endTime}
                  onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
              <div className="flex items-end">
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddSlot}
                    disabled={saving}
                    className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Availability Slots */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Availability Slots ({availabilitySlots.length})
            </h2>
          </div>
          <div className="p-6">
            {availabilitySlots.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No availability slots set
                </h3>
                <p className="text-gray-600 mb-6">
                  Add your first availability slot to start accepting bookings.
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Add Your First Slot
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availabilitySlots.map((slot) => (
                  <motion.div
                    key={slot.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">
                        {DAYS_OF_WEEK[slot.dayOfWeek]}
                      </h4>
                      <button
                        onClick={() => slot.id && handleDeleteSlot(slot.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{slot.startTime} - {slot.endTime}</span>
                    </div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      slot.isAvailable 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {slot.isAvailable ? 'Available' : 'Unavailable'}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
