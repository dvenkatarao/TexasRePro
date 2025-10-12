'use client';

import React from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: { name: string; href: string }[];
  user: any;
}

export default function MobileMenu({ isOpen, onClose, navigation, user }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="relative bg-white w-80 max-w-full h-full ml-auto shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4 space-y-6">
          {/* Navigation Links */}
          <nav className="space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-lg font-medium text-gray-700 hover:text-blue-600 py-2"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          {/* Auth Section */}
          <div className="pt-6 border-t border-gray-200 space-y-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block text-lg font-medium text-gray-700 hover:text-blue-600 py-2"
                  onClick={onClose}
                >
                  Dashboard
                </Link>
                <button className="block w-full text-left text-lg font-medium text-red-600 hover:text-red-700 py-2">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="block text-lg font-medium text-gray-700 hover:text-blue-600 py-2"
                  onClick={onClose}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-center text-lg"
                  onClick={onClose}
                >
                  Start Free Trial
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}