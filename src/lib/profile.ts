import { OnboardingData } from '@/components/onboarding/onboarding-context';
import { supabase } from '@/lib/supabase';
import { mapOnboardingToSupabase } from '@/types/onboarding';

export interface UserProfile {
  id: string;
  username?: string | null;
  name?: string | null;
  gender?: string | null;
  age?: number | null;
  height_cm?: number | null;
  weight_kg?: number | null;
  target_weight_kg?: number | null;
  goals?: string[] | null;
  injuries?: string[] | null;
  health_notes?: string[] | null;
  gym_membership?: boolean | null;
  equipment?: string[] | null;
  activities?: string[] | null;
  days_per_week?: number | null;
  session_duration?: number | null;
  onboarding_completed?: boolean | null;
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

export async function saveUserProfileOnboarding(
  userId: string,
  onboardingData: OnboardingData
): Promise<UserProfile | null> {
  try {
    const payload = mapOnboardingToSupabase(onboardingData);

    // 1. Upsert profiles table (insert if the row doesn't exist yet, else update)
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        ...payload,
      })
      .select()
      .single();

    if (error) throw error;

    // 2. Clear old equipment records and insert new ones
    await supabase.from('user_equipment').delete().eq('user_id', userId);

    if (onboardingData.equipment && onboardingData.equipment.length > 0) {
      const equipmentRows = onboardingData.equipment.map((item) => ({
        user_id: userId,
        equipment_name: item,
      }));
      await supabase.from('user_equipment').insert(equipmentRows);
    }

    return data as UserProfile;
  } catch (err) {
    console.error('Unexpected error saving onboarding profile:', err);
    throw err;
  }
}