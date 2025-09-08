"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, ChevronRight, Scale, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useRoleBasedNavigation } from "../../hooks/useRoleBasedNavigation";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const { user, logout } = useAuth();
  const { 
    getDashboardUrl, 
    getProfileUrl, 
    getDashboardLabel, 
    getLoginUrl 
  } = useRoleBasedNavigation();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();



  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is outside both button and dropdown
      if (
        buttonRef.current && 
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isOpen]);

  // Update button position when menu opens
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonRect(rect);
    }
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      router.push(getLoginUrl());
    } catch (error) {
      console.error('Logout failed:', error);
      setIsOpen(false);
      router.push('/');
    }
  };

  const handleLinkClick = (routeType: 'dashboard' | 'profile') => {
    setIsOpen(false);
    
    if (!user?.role) return;
    
    if (routeType === 'dashboard') {
      // Role-based dashboard routing logic
      switch (user.role) {
        case 'LAWYER':
          router.push('/Lawyer');
          break;
        case 'CLIENT':
          router.push('/User-landing');
          break;
        case 'ADMIN':
          router.push('/admin-dashboard');
          break;
        default:
          router.push('/User-landing');
      }
    } else if (routeType === 'profile') {
      // Role-based profile routing logic
      switch (user.role) {
        case 'LAWYER':
          router.push('/Lawyer/profile');
          break;
        case 'CLIENT':
          router.push('/User-landing/profile');
          break;
        case 'ADMIN':
          router.push('/admin/profile');
          break;
        default:
          router.push('/profile');
      }
    }
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const DropdownMenu = () => (
    <AnimatePresence>
      {isOpen && buttonRect && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-transparent z-[9998]"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="fixed bg-white rounded-lg shadow-xl border border-gray-200 z-[9999]"
            style={{
              top: buttonRect.bottom + 8,
              right: window.innerWidth - buttonRect.right,
              width: '256px',
              maxHeight: '400px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100">
              <p className="font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <span className="inline-block px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full mt-1">
                {user?.role}
              </span>
            </div>
            
            <div className="py-2">
              <button 
                onClick={() => handleLinkClick('dashboard')}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <User className="w-4 h-4" />
                {getDashboardLabel()}
              </button>
              
              <button 
                onClick={() => handleLinkClick('profile')}
                className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors text-left"
              >
                <Settings className="w-4 h-4" />
                Profile Settings
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-amber-50 transition-colors"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 bg-[#b98a11] rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {mounted && createPortal(<DropdownMenu />, document.body)}
    </>
  );
};

export default UserMenu;
