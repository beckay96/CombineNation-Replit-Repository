import { supabase } from '@/lib/supabase';

export interface ProfileDetails {
  displayName: string;
  fullName: string;
  bio?: string;
}

export async function updateProfileDetails(userId: string, data: ProfileDetails) {
  const { error } = await supabase
    .from('profiles')
    .update({
      display_name: data.displayName,
      full_name: data.fullName,
      bio: data.bio
    })
    .eq('id', userId);

  if (error) throw error;
  return data;
}
