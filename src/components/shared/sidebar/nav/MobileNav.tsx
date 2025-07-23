"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { useNavigation } from "../../../../../hooks/useNavigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

type Props = {}

const MobileNav = () => {
  const paths = useNavigation();
  const pathname = usePathname();

  return (
    <Card className="fixed bottom-4 w-[calc(100vw-32px)] flex items-center justify-center h-16 p-2 lg:hidden">
      <div className="flex flex-row items-center justify-evenly w-full px-4">
        {/* Navigation paths */}
        {paths.map((path) => {
          const isActive = pathname === path.href;
          
          return (
            <Tooltip key={path.name}>
              <TooltipTrigger asChild>
                <Link
                  href={path.href}
                  className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors hover:bg-gray-100 flex-1 max-w-[80px] ${
                    isActive ? "bg-blue-500 text-white" : "text-gray-600"
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

        {/* Settings
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors hover:bg-gray-100 flex-1 max-w-[80px] ${
                pathname === "/settings" ? "bg-blue-500 text-white" : "text-gray-600"
              }`}
            >
              <Settings className="w-5 h-5" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Settings</p>
          </TooltipContent>
        </Tooltip> */}

        {/* User Profile - Show actual logged in account */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col items-center justify-center p-3 rounded-lg transition-colors hover:bg-gray-100 flex-1 max-w-[80px]">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-5 h-5"
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