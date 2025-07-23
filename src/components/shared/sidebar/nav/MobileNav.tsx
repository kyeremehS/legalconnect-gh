"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigation } from "../../../../../hooks/useNavigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";

type Props = {}

const MobileNav = () => {
  const paths = useNavigation();
  const pathname = usePathname();

  return (
    <Card className="fixed bottom-4 left-4 right-4 flex items-center justify-center h-16 p-2 lg:hidden z-50 bg-white shadow-lg">
      <div className="flex flex-row items-center justify-between w-full px-2">
        {/* Navigation paths */}
        <div className="flex items-center justify-evenly flex-1 gap-1">
          {paths.map((path) => {
            const isActive = pathname === path.href;
            
            return (
              <Tooltip key={path.name}>
                <TooltipTrigger asChild>
                  <Link
                    href={path.href}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors hover:bg-gray-100 min-w-[60px] ${
                      isActive ? "bg-blue-500 text-white hover:bg-blue-600" : "text-gray-600"
                    }`}
                  >
                    {React.cloneElement(path.icon, { className: "w-5 h-5" })}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{path.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* User Profile */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 min-w-[60px]">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Profile & Settings</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </Card>
  );
};

export default MobileNav;