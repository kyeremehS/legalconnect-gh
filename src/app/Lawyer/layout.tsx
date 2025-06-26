import React from 'react';
import Sidebar from "@/app/components/lawyer/Sidebar";

export default function LawyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      
      <div >
        {children}
      </div>
    </div>
  );
}