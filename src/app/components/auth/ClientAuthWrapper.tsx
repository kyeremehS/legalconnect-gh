"use client";

import { ReactNode } from "react";

interface ClientAuthWrapperProps {
  children: ReactNode;
}

export default function ClientAuthWrapper({ children }: ClientAuthWrapperProps) {
  // For now, we'll just render the children
  // In a real app, you would check authentication status here
  
  return <>{children}</>;
}
