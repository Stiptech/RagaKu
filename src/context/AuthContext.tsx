import { supabase } from '@/lib/supabase';
import { fetchUserProfile, UserProfile } from '@/lib/profile';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    // Check initial auth state. A storage or network rejection must still
    // release the loading gate, otherwise the app hangs on the splash forever.
    supabase.auth
      .getSession()
      .then(async ({ data, error }) => {
        if (!active) return;

        if (error) {
          console.error('[auth] getSession error:', error.message);
          return;
        }

        const currentSession = data.session;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          const initialProfile = await fetchUserProfile();
          if (active) setProfile(initialProfile);
        }
      })
      .catch((err) => {
        console.error('[auth] getSession rejected:', err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    // The auth listener is the single owner of profile loading: it fires on
    // SIGNED_IN, TOKEN_REFRESHED and SIGNED_OUT, so signIn() does not refetch.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_event: AuthChangeEvent, nextSession: Session | null) => {
        if (!active) return;

        try {
          setSession(nextSession);
          setUser(nextSession?.user ?? null);

          if (nextSession?.user) {
            const nextProfile = await fetchUserProfile();
            if (active) setProfile(nextProfile);
          } else {
            setProfile(null);
          }
        } catch (err) {
          console.error('[auth] onAuthStateChange handler failed:', err);
        } finally {
          if (active) setLoading(false);
        }
      }
    );

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };

      // Profile loading is handled by the SIGNED_IN listener above.
      return { error: null };
    } catch (err) {
      // Thrown rather than returned: misconfiguration, or fetch failed outright.
      console.error('[auth] signIn threw:', err);
      const message =
        err instanceof Error ? err.message : 'Tidak dapat terhubung ke server. Coba lagi.';
      return { error: message };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('[auth] signOut error:', error.message);
    setProfile(null);
  };

  const refreshProfile = async () => {
    const userProfile = await fetchUserProfile();
    setProfile(userProfile);
  };

  return (
    <AuthContext.Provider
      value={{ user, session, profile, loading, signIn, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
