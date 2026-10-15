import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';

// '/workout' is the first tab inside the (tabs) group. '/(tabs)' itself is not a
// navigable route — the group has no index.tsx — and Expo's typed routes reject it.
type Target = '/login' | '/workout' | '/onboarding';

export default function RootIndex() {
  // undefined = still resolving auth + profile; a route once known.
  const [target, setTarget] = useState<Target | undefined>(undefined);
  const theme = useTheme();

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data.user) {
          if (active) setTarget('/login');
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', data.user.id)
          .maybeSingle();

        // Missing row or a falsy flag both mean onboarding is unfinished.
        if (active) setTarget(profile?.onboarding_completed === true ? '/workout' : '/onboarding');
      } catch (err) {
        // Never strand the user on the spinner: fall back to login.
        console.error('[index] auth/profile check failed:', err);
        if (active) setTarget('/login');
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  if (!target) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return <Redirect href={target} />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
