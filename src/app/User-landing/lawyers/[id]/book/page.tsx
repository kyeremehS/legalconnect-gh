"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import BookAppointment from "../../../../components/BookAppointment";
import { Inter } from 'next/font/google';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// This would normally come from your database
const lawyersData = {
  "1": {
    name: "Ama Kwarteng",
    title: "Senior Partner",
    firm: "Kwarteng & Associates",
    calendlyLink: "https://calendly.com/ama-kwarteng/30min",
    practiceAreas: ["Corporate Law", "Commercial Litigation", "Contract Law"],
  },
  "2": {
    name: "Kwame Mensah",
    title: "Legal Practitioner",
    firm: "Mensah Legal Consultancy",
    calendlyLink: "https://calendly.com/kwame-mensah/consultation",
    practiceAreas: ["Land Law", "Property Law", "Real Estate"],
  },
  "3": {
    name: "Abena Owusu",
    title: "Family Law Practitioner",
    firm: "Owusu Family Law Chambers",
    calendlyLink: "https://calendly.com/abena-owusu/family-law-session",
    practiceAreas: ["Family Law", "Matrimonial Law", "Child Welfare"],
  },
  "4": {
    name: "Kojo Asante",
    title: "Criminal Law Practitioner",
    firm: "Asante Defense Chambers",
    calendlyLink: "https://calendly.com/kojo-asante/criminal-defense",
    practiceAreas: ["Criminal Law", "Constitutional Law", "Human Rights"],
  },
  "5": {
    name: "Efua Boateng",
    title: "Employment Law Practitioner",
    firm: "Boateng Legal Services",
    calendlyLink: "https://calendly.com/efua-boateng/employment-consultation",
    practiceAreas: ["Employment Law", "Labour Law", "Industrial Relations"],
  },
};

export default function BookLawyerAppointment() {
  const params = useParams();
  const lawyerId = params.id as string;
  const lawyer = lawyersData[lawyerId as keyof typeof lawyersData];

  if (!lawyer) {
    return (
      <div className={`min-h-screen bg-gray-50 flex items-center justify-center ${inter.className}`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Lawyer Not Found
          </h1>
          <p className="text-gray-600">
            The lawyer you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${inter.className}`}>
      <main className="p-4 lg:p-8 pt-20 lg:pt-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4a017] to-[#b8941f] rounded-full flex items-center justify-center text-white font-bold text-xl">
                {lawyer.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Book Appointment
                </h1>
                <p className="text-gray-600">
                  {lawyer.name} - {lawyer.title} at {lawyer.firm}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {lawyer.practiceAreas.slice(0, 3).map((area, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#d4a017]/10 text-[#d4a017] text-xs rounded-full font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Component */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
            <BookAppointment
              name={lawyer.name}
              calendlyLink={lawyer.calendlyLink}
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}
