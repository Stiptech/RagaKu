import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Static web rendering runs on Node where `window` doesn't exist, so AsyncStorage would crash there.
const canUseStorage = Platform.OS !== 'web' || typeof window !== 'undefined';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: canUseStorage ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
  },
});

export function describeAuthError(error: { name?: string; message: string }) {
  const message = error.message.toLowerCase();

  if (error.name === 'AuthRetryableFetchError' || message.includes('fetch')) {
    return 'Tidak bisa menjangkau server. Cek koneksi internet kamu.';
  }
  if (message.includes('invalid login credentials')) return 'Email atau kata sandi salah.';
  if (message.includes('email not confirmed')) {
    return 'Email belum dikonfirmasi. Cek kotak masuk emailmu.';
  }
  if (message.includes('already registered')) return 'Email ini sudah terdaftar. Silakan masuk.';
  if (message.includes('different from the old')) {
    return 'Kata sandi baru tidak boleh sama dengan kata sandi lama.';
  }
  if (message.includes('code verifier') || message.includes('auth session missing')) {
    return 'Tautan hanya berlaku di perangkat yang meminta pemulihan. Minta tautan baru dari HP ini.';
  }
  if (message.includes('rate limit') || message.includes('security purposes')) {
    return 'Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.';
  }
  return error.message;
}