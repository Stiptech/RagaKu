import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PillButton } from '@/components/ui/pill-button';
import { TextField } from '@/components/ui/text-field';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/hooks/use-theme';

function isValidEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value);
}

export default function LoginScreen() {
  const theme = useTheme();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    setFormError(undefined);

    const nextEmailError = isValidEmail(email) ? undefined : 'Masukkan email yang valid';
    const nextPasswordError = password.length >= 6 ? undefined : 'Kata sandi minimal 6 karakter';

    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);

    if (nextEmailError || nextPasswordError) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn(email.trim(), password);

      if (error) {
        setFormError(error);
        return;
      }

      router.replace('/onboarding');
    } catch (err) {
      console.error('[login] unexpected error during login:', err);
      setFormError('Terjadi kesalahan tak terduga. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

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
            <View style={styles.brandRow}>
              <View style={[styles.brandMark, { backgroundColor: theme.primary }]}>
                <ThemedText type="default" style={styles.brandMarkLetter}>
                  R
                </ThemedText>
              </View>
              <ThemedText type="default" style={styles.brandWord}>
                RagaKu
              </ThemedText>
            </View>

            <View
              style={[
                styles.badge,
                { backgroundColor: theme.backgroundSelected, borderColor: theme.primary },
              ]}>
              <ThemedText type="smallBold" themeColor="primary" style={styles.badgeText}>
                POWERED BY AI ADAPTIVE COACHING
              </ThemedText>
            </View>

            <ThemedText type="subtitle" style={styles.heading}>
              Masuk & Lanjutkan{'\n'}Perjalananmu
            </ThemedText>
            <ThemedText type="default" themeColor="textSecondary" style={styles.subheading}>
              Program latihan personal yang menyesuaikan tubuh, alat, dan kondisi kesehatanmu.
            </ThemedText>

            <View style={styles.form}>
              <TextField
                label="Email"
                placeholder="nama@email.com"
                keyboardType="email-address"
                value={email}
                onChangeText={(value) => {
                  setEmail(value);
                  if (emailError) setEmailError(undefined);
                  if (formError) setFormError(undefined);
                }}
                errorText={emailError}
                returnKeyType="next"
              />

              <TextField
                label="Kata Sandi"
                placeholder="Minimal 6 karakter"
                isPassword
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  if (passwordError) setPasswordError(undefined);
                  if (formError) setFormError(undefined);
                }}
                errorText={passwordError}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />

              <Pressable style={styles.forgotRow} hitSlop={8}>
                <ThemedText type="smallBold" themeColor="primary">
                  Lupa kata sandi?
                </ThemedText>
              </Pressable>
            </View>

            {formError ? (
              <View
                accessibilityRole="alert"
                style={[
                  styles.formErrorBox,
                  { backgroundColor: theme.backgroundElement, borderColor: theme.error },
                ]}>
                <ThemedText type="small" themeColor="error">
                  {formError}
                </ThemedText>
              </View>
            ) : null}

            <PillButton
              label="MASUK"
              loading={loading}
              onPress={handleLogin}
              style={styles.loginButton}
            />

            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
              <ThemedText type="small" themeColor="textSecondary">
                atau
              </ThemedText>
              <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
            </View>

            <PillButton
              label="LANJUTKAN SEBAGAI TAMU"
              variant="outline"
              onPress={() => router.replace('/onboarding')}
            />

            <View style={styles.footerRow}>
              <ThemedText type="default" themeColor="textSecondary">
                Belum punya akun?{' '}
              </ThemedText>
              <Pressable hitSlop={8}>
                <ThemedText type="default" themeColor="primary" style={styles.footerLink}>
                  Daftar
                </ThemedText>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandMark: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandMarkLetter: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  brandWord: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: Spacing.three,
  },
  badgeText: {
    letterSpacing: 0.4,
    fontSize: 11,
  },
  heading: {
    marginTop: Spacing.three,
  },
  subheading: {
    marginTop: 4,
  },
  form: {
    marginTop: Spacing.four,
    gap: Spacing.three,
  },
  forgotRow: {
    alignSelf: 'flex-end',
  },
  loginButton: {
    marginTop: Spacing.two,
  },
  formErrorBox: {
    marginTop: Spacing.three,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    marginVertical: Spacing.two,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.two,
  },
  footerLink: {
    fontWeight: '700',
  },
});