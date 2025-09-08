"use client";
import { useState, useEffect } from 'react';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import BookAppointmentModal from '../components/scheduling/BookAppointmentModal';
import { apiClient } from '../../lib/api';

interface LawyerCardProps {
  lawyer: {
    id: string;
    name: string;
    firm: string;
    location: string;
    practiceAreas: string[];
    experience: number;
    avatar?: string;
  };
}

function LawyerCard({ lawyer }: LawyerCardProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookAppointment = async (appointmentData: any) => {
    try {
      const response = await apiClient.createAppointment(appointmentData);
      if (response.success) {
        alert('Appointment request sent successfully!');
      } else {
        alert('Failed to send appointment request. Please try again.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to send appointment request. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{lawyer.name}</h3>
            <p className="text-gray-600">{lawyer.firm}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{lawyer.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{lawyer.experience} years experience</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Practice Areas:</p>
          <div className="flex flex-wrap gap-1">
            {lawyer.practiceAreas.slice(0, 3).map((area, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs"
              >
                {area}
              </span>
            ))}
            {lawyer.practiceAreas.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{lawyer.practiceAreas.length - 3} more
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowBookingModal(true)}
          className="w-full bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors font-medium"
        >
          Book Appointment
        </button>
      </div>

      {showBookingModal && (
        <BookAppointmentModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          lawyer={lawyer}
          onBook={handleBookAppointment}
        />
      )}
    </>
  );
}

export default function TestBookingPage() {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getLawyers();
      
      if (response.success && response.data) {
        // Transform API data to match our component interface
        const transformedLawyers = response.data.map((lawyer: any) => ({
          id: lawyer.userId || lawyer.user?.id, // Use the user ID for appointments
          name: `${lawyer.user?.firstName || ''} ${lawyer.user?.lastName || ''}`.trim(),
          firm: lawyer.firm,
          location: lawyer.location,
          practiceAreas: lawyer.practiceAreas || [],
          experience: lawyer.experience,
          avatar: lawyer.user?.avatar
        }));
        
        setLawyers(transformedLawyers);
      } else {
        setError('Failed to fetch lawyers');
      }
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      setError('Failed to fetch lawyers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading lawyers...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book an Appointment
          </h1>
          <p className="text-gray-600">
            Choose a lawyer and schedule your consultation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer: any) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            How to Test the Scheduling System
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>1. Book an Appointment:</strong> Click "Book Appointment" on any lawyer card above
            </p>
            <p>
              <strong>2. Fill the Form:</strong> Select date, time, practice area, and meeting type
            </p>
            <p>
              <strong>3. View Lawyer Dashboard:</strong> Go to /Lawyer to see appointment notifications pop up
            </p>
            <p>
              <strong>4. Confirm/Reject:</strong> Lawyers can confirm or reject appointments from the popup
            </p>
            <p>
              <strong>5. Real-time Updates:</strong> Notifications appear automatically when appointments are booked
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
