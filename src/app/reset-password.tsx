import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { AuthHeader } from '@/components/ui/auth-header';
import { PillButton } from '@/components/ui/pill-button';
import { TextField } from '@/components/ui/text-field';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { describeAuthError, supabase } from '@/lib/supabase';

type Exchange = 'pending' | 'ok' | 'failed';

function passwordProblem(value: string) {
  if (value.length < 8) return 'Kata sandi minimal 8 karakter';
  if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) return 'Gunakan huruf besar dan kecil';
  if (!/\d/.test(value)) return 'Tambahkan minimal satu angka';
  return undefined;
}

export default function ResetPasswordScreen() {
  const theme = useTheme();
  const { code } = useLocalSearchParams<{ code?: string }>();
  const [exchange, setExchange] = useState<Exchange>('pending');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [confirmError, setConfirmError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const handledCode = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!code || handledCode.current === code) return;
    handledCode.current = code;

    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      setExchange(error ? 'failed' : 'ok');
    });
  }, [code]);

  const status = done
    ? 'done'
    : !code
      ? 'invalid'
      : exchange === 'pending'
        ? 'checking'
        : exchange === 'ok'
          ? 'ready'
          : 'invalid';

  const handleSubmit = async () => {
    const nextPasswordError = passwordProblem(password);
    const nextConfirmError = confirm === password ? undefined : 'Konfirmasi kata sandi tidak sama';

    setPasswordError(nextPasswordError);
    setConfirmError(nextConfirmError);
    setFormError(undefined);
    if (nextPasswordError || nextConfirmError) return;

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setLoading(false);
      setFormError(describeAuthError(error));
      return;
    }
    await supabase.auth.signOut();
    setLoading(false);
    setDone(true);
  };

  const goToLogin = () => router.replace('/login');

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <AuthHeader showBack={false} />

            {status === 'checking' ? (
              <View style={styles.centerBlock}>
                <ThemedText type="subtitle" style={styles.heading}>
                  MEMVERIFIKASI TAUTAN
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
                  Mohon tunggu sebentar...
                </ThemedText>
              </View>
            ) : null}

            {status === 'invalid' ? (
              <View style={styles.centerBlock}>
                <View style={[styles.iconCircle, { backgroundColor: '#FFF1E6' }]}>
                  <Ionicons name="alert-circle" size={30} color={theme.warning} />
                </View>
                <ThemedText type="subtitle" style={styles.heading}>
                  TAUTAN TIDAK VALID
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
                  Tautan pemulihan sudah kedaluwarsa, sudah dipakai, atau dibuka di perangkat yang
                  berbeda dari yang meminta pemulihan. Minta tautan baru dari HP ini.
                </ThemedText>
                <PillButton
                  label="MINTA TAUTAN BARU"
                  onPress={() => router.replace('/lupa-password')}
                  style={styles.fullWidth}
                />
              </View>
            ) : null}

            {status === 'ready' ? (
              <>
                <View style={[styles.iconCircle, styles.iconCenter, { backgroundColor: theme.backgroundSelected }]}>
                  <Ionicons name="key" size={28} color={theme.primary} />
                </View>
                <ThemedText type="subtitle" style={styles.heading}>
                  BUAT KATA SANDI BARU
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
                  Gunakan minimal 8 karakter dengan huruf besar, huruf kecil, dan angka.
                </ThemedText>

                <View
                  style={[
                    styles.card,
                    { backgroundColor: theme.backgroundElement, borderColor: theme.border },
                  ]}>
                  <TextField
                    label="Kata Sandi Baru"
                    placeholder="Minimal 8 karakter"
                    isPassword
                    value={password}
                    onChangeText={(value) => {
                      setPassword(value);
                      if (passwordError) setPasswordError(undefined);
                    }}
                    errorText={passwordError}
                    returnKeyType="next"
                  />
                  <TextField
                    label="Konfirmasi Kata Sandi"
                    placeholder="Ulangi kata sandi baru"
                    isPassword
                    value={confirm}
                    onChangeText={(value) => {
                      setConfirm(value);
                      if (confirmError) setConfirmError(undefined);
                    }}
                    errorText={confirmError}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit}
                  />

                  {formError ? (
                    <ThemedText type="small" themeColor="warning">
                      {formError}
                    </ThemedText>
                  ) : null}

                  <PillButton label="SIMPAN KATA SANDI BARU" loading={loading} onPress={handleSubmit} />
                </View>
              </>
            ) : null}

            {status === 'done' ? (
              <View style={styles.centerBlock}>
                <View style={[styles.iconCircle, { backgroundColor: theme.backgroundSelected }]}>
                  <Ionicons name="checkmark-circle" size={32} color={theme.primary} />
                </View>
                <ThemedText type="subtitle" style={styles.heading}>
                  KATA SANDI DIPERBARUI
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
                  Kata sandimu berhasil diganti. Silakan masuk dengan kata sandi yang baru.
                </ThemedText>
                <PillButton label="MASUK SEKARANG" onPress={goToLogin} style={styles.fullWidth} />
              </View>
            ) : null}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  centerBlock: {
    alignItems: 'center',
    gap: Spacing.three,
    marginTop: Spacing.four,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCenter: {
    alignSelf: 'center',
    marginTop: Spacing.two,
  },
  heading: {
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: Spacing.three,
    gap: Spacing.three,
  },
});
