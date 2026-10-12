import { OnboardingData } from '@/components/onboarding/onboarding-context';

export interface SupabaseProfileOnboardingUpdate {
  gender: string;
  age: number;
  height: number;           // Matches existing DB column 'height'
  current_weight: number;   // Matches existing DB column 'current_weight'
  target_weight: number;    // Matches existing DB column 'target_weight'
  goals: string[];
  injuries: string[];
  health_notes: string[];
  gym_membership: boolean;
  activities: string[];
  days_per_week: number;
  session_duration: number;
  onboarding_completed: boolean;
  updated_at: string;
}

export const mapOnboardingToSupabase = (
  data: OnboardingData
): SupabaseProfileOnboardingUpdate => {
  const cleanedInjuries = data.injuries.filter((i) => i !== 'tidak-ada');

  return {
    gender: data.gender || 'rahasia',
    age: data.age,
    height: data.heightCm,
    current_weight: data.weightKg,
    target_weight: data.targetWeightKg,
    goals: data.goals,
    injuries: cleanedInjuries,
    health_notes: data.healthNotes || [],
    gym_membership: data.gymMembership,
    activities: data.activities,
    days_per_week: data.daysPerWeek,
    session_duration: data.sessionDuration,
    onboarding_completed: true,
    updated_at: new Date().toISOString(),
  };
};