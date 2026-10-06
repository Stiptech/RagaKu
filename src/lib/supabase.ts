import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const RESTART_HINT =
  'Add it to .env at the project root, then restart with a cleared cache: npx expo start -c';

/**
 * EXPO_PUBLIC_* values are inlined into the bundle at build time. A missing var
 * arrives here as `undefined` (or the literal string "undefined"), which would
 * otherwise fail much later as a confusing 404 from the network layer.
 */
function requireEnv(name: string, raw: string | undefined): string {
  const value = raw?.trim();

  if (!value || value === 'undefined' || value === 'null') {
    throw new Error(`[supabase] Missing ${name}. ${RESTART_HINT}`);
  }

  return value;
}

/**
 * Normalizes the project URL to a bare origin.
 *
 * supabase-js appends its own service paths (`/auth/v1`, `/rest/v1`, ...), so a
 * URL that already carries one produces requests like
 * `/rest/v1/auth/v1/token` and every call fails with a 404
 * "Invalid path specified in request URL". Trailing whitespace is also stripped
 * because a CRLF .env file leaves a `\r` on the end of the value.
 */
export function normalizeSupabaseUrl(raw: string): string {
  let url = raw.replace(/\s+/g, '');

  // Drop any service path the client appends itself, with or without a trailing slash.
  url = url.replace(/\/+$/, '');
  url = url.replace(/\/(rest|auth|storage|realtime|functions)\/v\d+$/i, '');
  url = url.replace(/\/+$/, '');

  if (!/^https?:\/\//i.test(url)) {
    throw new Error(
      `[supabase] EXPO_PUBLIC_SUPABASE_URL must start with http:// or https:// (got "${raw}"). ${RESTART_HINT}`
    );
  }

  return url;
}

const supabaseUrl = normalizeSupabaseUrl(
  requireEnv('EXPO_PUBLIC_SUPABASE_URL', process.env.EXPO_PUBLIC_SUPABASE_URL)
);

const supabaseAnonKey = requireEnv(
  'EXPO_PUBLIC_SUPABASE_ANON_KEY',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);

if (__DEV__ && !supabaseAnonKey.startsWith('eyJ') && !supabaseAnonKey.startsWith('sb_')) {
  console.warn(
    '[supabase] EXPO_PUBLIC_SUPABASE_ANON_KEY does not look like a Supabase key. Check for a truncated or quoted value in .env.'
  );
}

// Custom storage wrapper to handle SSR safely
const SSRSafeStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') {
      return Promise.resolve(null);
    }
    return AsyncStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }
    return AsyncStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }
    return AsyncStorage.removeItem(key);
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: SSRSafeStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
