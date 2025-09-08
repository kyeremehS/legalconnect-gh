"use client";
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useNavigation } from "../../../../../hooks/useNavigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/ui/theme/theme-toggle";
// import { UserButton } from "@clerk/nextjs";


type Props = {}

const DesktopNav = () => {
  const paths = useNavigation();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-[calc(100vh-2rem)] lg:w-16 lg:px-2 lg:py-4 lg:fixed lg:left-4 lg:top-4 lg:z-50">
      {/* Top section - Navigation items */}
      <div className="flex flex-col items-center space-y-4 w-full">
        {paths.map((path) => {
          const isActive = pathname === path.href;
          
          return (
            <Tooltip key={path.name}>
              <TooltipTrigger asChild>
                <Link
                  href={path.href}
                  className={`p-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 w-full flex items-center justify-center ${
                    isActive ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {React.cloneElement(path.icon, { className: "w-6 h-6" })}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{path.name}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
      
      {/* Middle section - Theme Toggle */}
      <div className="flex flex-col items-center w-full">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="p-2 w-full flex items-center justify-center">
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Toggle Theme</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Bottom section - User Profile */}
      <div className="flex flex-col items-center w-full">
        <Tooltip>
         
          <TooltipContent side="right">
            <p>Profile & Settings</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
};

export default DesktopNav;