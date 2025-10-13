import { createClient } from './client';
import { uploadAvatar, updatePhoneNumber } from './storage';

export async function updateUserProfile(
  userId: string, 
  updates: { phoneNumber?: string; avatarFile?: File }
) {
  const supabase = createClient();
  
  try {
    let avatarUrl: string | undefined;

    // Handle avatar upload if provided
    if (updates.avatarFile) {
      avatarUrl = await uploadAvatar(userId, updates.avatarFile);
    }

    // Update profile data
    const { error } = await supabase
      .from('profiles')
      .update({
        phone_number: updates.phoneNumber, // This matches your database column name
        ...(avatarUrl && { avatar_url: avatarUrl }),
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;

    return { avatarUrl };
  } catch (error) {
    console.error('Profile update failed:', error);
    throw error;
  }
}