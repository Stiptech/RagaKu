import { supabase } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  username?: string | null;
  name?: string | null;
  height?: number | null;
  current_weight?: number | null;
}

export async function fetchUserProfile(): Promise<UserProfile | null> {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      console.error('Failed to get current user:', userError?.message ?? 'No user found');
      return null;
    }

    const user = userData.user;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error || !data) {
      console.error('Failed to fetch user profile:', error?.message ?? 'Profile data is null');
      return null;
    }

    return data as UserProfile;
  } catch (err) {
    console.error('Unexpected error fetching user profile:', err);
    return null;
  }
}
