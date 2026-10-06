import { supabase } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  username: string | null;
  name: string | null;
  age: number | null;
  height: number | null;
  current_weight: number | null;
  target_weight: number | null;
}

export async function fetchUserProfile(): Promise<UserProfile | null> {
  try {
    // 1. Get current authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Auth user error:', userError?.message);
      return null;
    }

    // 2. Fetch profile row matching user ID
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError.message);
      return null;
    }

    return profile as UserProfile;
  } catch (err) {
    console.error('Unexpected error fetching profile:', err);
    return null;
  }
}