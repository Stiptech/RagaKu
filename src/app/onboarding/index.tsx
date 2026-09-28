import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PillButton } from '@/components/ui/pill-button';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const STATS = [
  { value: '99.4%', label: 'AKURASI AI' },
  { value: '120K+', label: 'PENGGUNA AKTIF' },
  { value: 'Realtime', label: 'BIOMETRIK' },
];

export default function OnboardingIntroScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
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
              styles.heroCard,
              { backgroundColor: theme.backgroundSelected, borderColor: theme.border },
            ]}>
            <View style={[styles.badge, { borderColor: theme.primary }]}>
              <ThemedText type="smallBold" themeColor="primary" style={styles.badgeText}>
                POWERED BY AI ADAPTIVE COACHING
              </ThemedText>
            </View>

            <ThemedText type="title" style={styles.heading}>
              Evolusi Performa{'\n'}
              <ThemedText type="title" themeColor="primary" style={styles.heading}>
                Tanpa Batas
              </ThemedText>
            </ThemedText>

            <ThemedText type="default" themeColor="textSecondary" style={styles.subheading}>
              Program latihan AI personal yang menyesuaikan tubuh, target, alat, dan kondisi
              kesehatanmu untuk gaya hidup urban aktif.
            </ThemedText>

            <View style={styles.statsRow}>
              {STATS.map((stat) => (
                <View key={stat.label} style={styles.statBlock}>
                  <ThemedText type="subtitle" themeColor="primary" style={styles.statValue}>
                    {stat.value}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary" style={styles.statLabel}>
                    {stat.label}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <PillButton
              label="MULAI PERJALANAN KEBUGARAN →"
              onPress={() => router.push('/onboarding/biometric')}
            />

            <Pressable
              hitSlop={8}
              style={styles.loginRow}
              onPress={() => router.replace('/login')}>
              <ThemedText type="default" themeColor="textSecondary">
                Sudah punya akun?{' '}
              </ThemedText>
              <ThemedText type="default" themeColor="primary" style={styles.loginLink}>
                Masuk
              </ThemedText>
            </Pressable>

            <View style={styles.trustRow}>
              <Ionicons name="lock-closed" size={12} color={theme.textSecondary} />
              <ThemedText type="small" themeColor="textSecondary">
                Enkripsi data biometrik · Privasi terjamin
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    paddingTop: Spacing.four,
    paddingBottom: Spacing.five,
    justifyContent: 'space-between',
    gap: Spacing.four,
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
  heroCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    letterSpacing: 0.4,
    fontSize: 11,
  },
  heading: {
    fontSize: 34,
    lineHeight: 40,
  },
  subheading: {
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  statBlock: {
    gap: 2,
  },
  statValue: {
    fontSize: 20,
    lineHeight: 24,
  },
  statLabel: {
    fontSize: 10,
    letterSpacing: 0.3,
  },
  footer: {
    gap: Spacing.three,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLink: {
    fontWeight: '700',
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
});
