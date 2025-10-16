'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { User, Phone, Camera, Save } from 'lucide-react';
import { updateUserProfile } from '@/lib/supabase/profile';

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: user?.phoneNumber || '',
  });

  const handleSave = async () => {
    if (!user) {
      console.error('No user found');
      return;
    }

    setIsLoading(true);
    try {
      await updateUserProfile(user.id, {
        phoneNumber: formData.phoneNumber,
      });
      
      // Show success message (you'll need to implement toast)
      console.log('Profile updated successfully!');
      // If you have a toast system: showToast('Profile updated successfully!', 'success');
      
    } catch (error) {
      console.error('Failed to update profile:', error);
      // If you have a toast system: showToast('Failed to update profile', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if no user
  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      
      <div className="bg-card rounded-lg shadow-sm p-6 space-y-6">
        {/* Phone Number */}
        <div>
          <label className="text-sm font-medium mb-2 flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg text-foreground"
            placeholder="+1 (555) 123-4567"
            disabled={isLoading}
          />
        </div>

        {/* Avatar Upload */}
        <div>
          <label className="text-sm font-medium mb-2 flex items-center">
            <Camera className="w-4 h-4 mr-2" />
            Profile Picture
          </label>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <button 
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-background disabled:opacity-50"
              disabled={isLoading}
            >
              Upload Photo
            </button>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-blue-600 dark:bg-blue-700text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}