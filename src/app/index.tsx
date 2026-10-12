import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

export default function RootIndex() {
  // undefined = still resolving the stored session; true/false once known.
  const [hasSession, setHasSession] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    let active = true;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (active) setHasSession(!!data.session);
      })
      .catch(() => {
        if (active) setHasSession(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Render nothing until the session is known, otherwise a signed-in user
  // would flash the login screen on every cold start.
  if (hasSession === undefined) return null;

  return <Redirect href={hasSession ? '/workout' : '/login'} />;
}
