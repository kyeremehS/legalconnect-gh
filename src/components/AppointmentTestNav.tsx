import Link from 'next/link';

export default function AppointmentTestNav() {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-4 mb-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Appointment System Test Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/Lawyer/availability"
            className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-4 py-2 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 text-center font-medium"
          >
            Lawyer Availability
          </Link>
          <Link
            href="/Lawyer/appointment-dashboard"
            className="bg-gradient-to-r from-[#d4a017] to-[#b8941f] text-white px-4 py-2 rounded-lg hover:from-[#b8941f] hover:to-[#a17c1a] transition-all duration-300 text-center font-medium"
          >
            Lawyer Dashboard
          </Link>
          <Link
            href="/User-landing/appointment-booking"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-center font-medium"
          >
            Client Booking (Old)
          </Link>
          <Link
            href="/User-landing/appointment-booking-integrated"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 text-center font-medium"
          >
            Client Booking (New)
          </Link>
        </div>
      </div>
    </div>
  );
}
