import React from 'react';
import Sidebar from "@/app/components/lawyer/Sidebar";

interface LawyerLayoutProps {
  children: React.ReactNode;
}

const LawyerLayout: React.FC<LawyerLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default LawyerLayout;
