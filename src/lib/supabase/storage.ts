import { createClient } from './client';

export async function uploadAvatar(userId: string, file: File) {
  const supabase = createClient();
  
  try {
    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(`user-${userId}`, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(`user-${userId}`);

    // Update profile with avatar URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId);

    if (updateError) throw updateError;

    return publicUrl;
  } catch (error) {
    console.error('Avatar upload failed:', error);
    throw error;
  }
}

export async function updatePhoneNumber(userId: string, phoneNumber: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('profiles')
    .update({ phone_number: phoneNumber })
    .eq('id', userId);

  if (error) throw error;
}