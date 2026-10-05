import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useOnboarding } from '@/components/onboarding/onboarding-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { LineChart } from '@/components/ui/line-chart';
import { PillButton } from '@/components/ui/pill-button';
import { StatTile } from '@/components/ui/stat-tile';
import { BottomTabInset, FontFamily, MaxContentWidth, OverlaySurface, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const TODAY_EXERCISES = [
  {
    title: 'Bicep Curl & Hammer Press',
    meta: '4 SET x 12 REPS',
    duration: '8 Menit',
    tag: 'Dumbbell',
    icon: 'dumbbell' as const,
  },
  {
    title: 'Incline Bench Push-Up',
    meta: '3 SET x 15 REPS',
    duration: '6 Menit',
    tag: 'Bodyweight',
    icon: 'human-handsup' as const,
  },
  {
    title: 'Core Plank with Knee Tap',
    meta: '3 SET x 45 DETIK',
    duration: '5 Menit',
    tag: 'Inti Tubuh',
    icon: 'yoga' as const,
  },
  {
    title: 'Banded Face Pull',
    meta: '3 SET x 15 REPS',
    duration: '4 Menit',
    tag: 'Postur Bahu',
    icon: 'arm-flex' as const,
  },
];

export default function WorkoutHomeScreen() {
  const theme = useTheme();
  const { data } = useOnboarding();

  const hasKneeInjury = data.injuries.includes('lutut');
  const recommendation = hasKneeInjury
    ? 'Pemulihan otot prima. Variasi gerakan hari ini dirancang ramah sendi lutut kanan sesuai catatan riwayat latihan kemarin.'
    : 'Pemulihan otot prima. Volume latihan hari ini dinaikkan bertahap sesuai target mingguanmu.';

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: BottomTabInset + Spacing.six }]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View>
              <ThemedText type="small" themeColor="textSecondary" style={styles.eyebrow}>
                WORKOUT HOME
              </ThemedText>
              <ThemedText style={styles.greeting}>HALO, DIMAS! ⚡</ThemedText>
            </View>
            <View style={styles.headerIcons}>
              <Pressable style={[styles.iconButton, { borderColor: theme.border }]} hitSlop={8}>
                <Ionicons name="notifications-outline" size={18} color={theme.text} />
              </Pressable>
              <Pressable style={[styles.iconButton, { borderColor: theme.border }]} hitSlop={8}>
                <Ionicons name="person-outline" size={18} color={theme.text} />
              </Pressable>
            </View>
          </View>

          <View style={styles.badgeMetaRow}>
            <View style={[styles.streakBadge, { backgroundColor: theme.backgroundSelected }]}>
              <ThemedText type="smallBold" themeColor="primary" style={styles.streakBadgeText}>
                HARI KE-11
              </ThemedText>
            </View>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.targetText}>
              TARGET FAT-BURN PHASE 1 / MINGGU 2 DARI 6
            </ThemedText>
          </View>

          <Card style={styles.readinessCard}>
            <View style={styles.readinessTopRow}>
              <View style={styles.readinessLead}>
                <ThemedText type="smallBold" themeColor="textSecondary" style={styles.readinessLabel}>
                  SKOR KESIAPAN AI{'\n'}RAGAKU
                </ThemedText>
                <ThemedText style={styles.readinessValue}>92% PRIMA</ThemedText>
              </View>
              <View style={[styles.readinessBadge, { backgroundColor: '#FFF7ED', borderColor: theme.warning }]}>
                <ThemedText type="smallBold" themeColor="warning" style={styles.readinessBadgeText}>
                  SIAP INTENSITAS{'\n'}TINGGI
                </ThemedText>
              </View>
            </View>

            <View style={[styles.rhrInner, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={styles.rhrTextCol}>
                <ThemedText type="smallBold" themeColor="textSecondary" style={styles.rhrLabel}>
                  RHR (DETAK{'\n'}ISTIRAHAT)
                </ThemedText>
                <View style={styles.rhrValueRow}>
                  <ThemedText style={styles.rhrValue}>54</ThemedText>
                  <ThemedText type="smallBold" themeColor="textSecondary">
                    BPM
                  </ThemedText>
                </View>
              </View>
              <View style={styles.rhrChart}>
                <LineChart data={[58, 57, 56, 55, 56, 54, 54]} height={36} />
              </View>
            </View>

            <View style={[styles.recommendationBox, { backgroundColor: '#FFF7ED', borderColor: theme.warning }]}>
              <Ionicons name="hardware-chip-outline" size={16} color={theme.warning} />
              <ThemedText type="small" themeColor="warning" style={styles.recommendationText}>
                <ThemedText type="smallBold" themeColor="warning">
                  Rekomendasi AI RagaKu:
                </ThemedText>{' '}
                {recommendation}
              </ThemedText>
            </View>
          </Card>

          <Pressable onPress={() => router.push('/active-session')}>
            <View style={[styles.featuredCard, { backgroundColor: OverlaySurface }]}>
              <View style={styles.featuredTopRow}>
                <View style={[styles.pillBadge, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                  <ThemedText type="small" style={styles.featuredBadgeText}>
                    SESI HARI INI
                  </ThemedText>
                </View>
                <View style={[styles.pillBadge, { backgroundColor: theme.primary }]}>
                  <ThemedText type="small" style={styles.featuredBadgeText}>
                    LEVEL 3
                  </ThemedText>
                </View>
              </View>
              <ThemedText style={styles.featuredTitle}>Upper Body & Core Hypertrophy</ThemedText>
              <View style={styles.featuredStatsRow}>
                <FeaturedStat label="DURASI" value={`${data.sessionDuration} Menit`} />
                <FeaturedStat label="LATIHAN" value={`${TODAY_EXERCISES.length} Gerak`} />
                <FeaturedStat label="KALORI" value="380 Kkal" />
              </View>
              <PillButton
                label="MULAI LATIHAN HARI INI"
                onPress={() => router.push('/active-session')}
                style={styles.featuredButton}
              />
            </View>
          </Pressable>

          <View style={styles.listHeaderRow}>
            <View style={styles.listHeaderLeft}>
              <ThemedText style={styles.listHeaderTitle}>DAFTAR RANGKAIAN</ThemedText>
              <View style={[styles.countBadge, { backgroundColor: theme.backgroundSelected }]}>
                <ThemedText type="smallBold" themeColor="primary" style={styles.countBadgeText}>
                  {TODAY_EXERCISES.length}
                </ThemedText>
              </View>
            </View>
            <View style={styles.previewAllRow}>
              <ThemedText type="smallBold" themeColor="primary" style={styles.previewAllText}>
                PRATINJAU SEMUA
              </ThemedText>
              <Ionicons name="chevron-forward" size={14} color={theme.primary} />
            </View>
          </View>

          <View style={styles.exerciseList}>
            {TODAY_EXERCISES.map((exercise, index) => (
              <Card key={exercise.title} style={styles.exerciseRow}>
                <View style={[styles.exerciseIndex, { backgroundColor: theme.background }]}>
                  <ThemedText type="smallBold" themeColor="textSecondary">
                    {String(index + 1).padStart(2, '0')}
                  </ThemedText>
                </View>
                <MaterialCommunityIcons name={exercise.icon} size={22} color={theme.primary} />
                <View style={styles.exerciseTextBlock}>
                  <ThemedText style={styles.exerciseTitle}>{exercise.title}</ThemedText>
                  <ThemedText type="smallBold" themeColor="primary" style={styles.exerciseMeta}>
                    {exercise.meta}
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {exercise.duration} · {exercise.tag}
                  </ThemedText>
                </View>
              </Card>
            ))}
          </View>

          <View style={[styles.streakFooter, { borderColor: theme.border }]}>
            <View style={[styles.streakFooterIconWrap, { backgroundColor: '#FFF7ED' }]}>
              <Ionicons name="flame" size={20} color={theme.warning} />
            </View>
            <View style={styles.streakFooterTextBlock}>
              <ThemedText type="smallBold" style={styles.streakFooterTitle}>
                STREAK LATIHAN: 4 HARI BERTURUT-TURUT
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Selesaikan sesi ini untuk membuka badge &quot;Iron Will&quot;.
              </ThemedText>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function FeaturedStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.featuredStat}>
      <ThemedText type="small" style={styles.featuredStatLabel}>
        {label}
      </ThemedText>
      <ThemedText type="smallBold" style={styles.featuredStatValue}>
        {value}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, alignItems: 'center' },
  scrollContent: {
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    gap: Spacing.three,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eyebrow: {
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  greeting: {
    fontFamily: FontFamily.headingBold,
    fontSize: 28,
    lineHeight: 32,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flexWrap: 'wrap',
  },
  streakBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  streakBadgeText: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
  targetText: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
  readinessCard: {
    gap: Spacing.three,
  },
  readinessTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  readinessLead: {
    flex: 1,
    gap: 4,
  },
  readinessLabel: {
    fontSize: 11,
    letterSpacing: 0.4,
  },
  readinessValue: {
    fontFamily: FontFamily.headingBold,
    fontSize: 20,
  },
  readinessBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
  },
  readinessBadgeText: {
    fontSize: 11,
    textAlign: 'right',
  },
  rhrInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderRadius: 16,
    borderWidth: 1,
    padding: Spacing.three,
  },
  rhrTextCol: {
    gap: 4,
  },
  rhrLabel: {
    letterSpacing: 0.4,
    fontSize: 11,
  },
  rhrValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  rhrValue: {
    fontFamily: FontFamily.headingBold,
    fontSize: 30,
  },
  rhrChart: {
    flex: 1,
  },
  recommendationBox: {
    flexDirection: 'row',
    gap: 8,
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 1,
  },
  recommendationText: {
    flex: 1,
  },
  featuredCard: {
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  featuredTopRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  pillBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  featuredBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    letterSpacing: 0.4,
  },
  featuredTitle: {
    fontFamily: FontFamily.headingBold,
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 28,
  },
  featuredStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.two,
  },
  featuredStat: {
    gap: 2,
  },
  featuredStatLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 10,
    letterSpacing: 0.4,
  },
  featuredStatValue: {
    color: '#FFFFFF',
  },
  featuredButton: {
    marginTop: Spacing.two,
  },
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.two,
  },
  listHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listHeaderTitle: {
    fontFamily: FontFamily.headingBold,
    fontSize: 20,
  },
  countBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBadgeText: {
    fontSize: 11,
  },
  previewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  previewAllText: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
  exerciseList: {
    gap: Spacing.two,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  exerciseIndex: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseTextBlock: {
    flex: 1,
    gap: 2,
  },
  exerciseTitle: {
    fontFamily: FontFamily.headingBold,
    fontSize: 20,
    lineHeight: 24,
  },
  exerciseMeta: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
  streakFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    borderWidth: 1,
    borderRadius: 16,
    padding: Spacing.three,
    marginTop: Spacing.two,
  },
  streakFooterIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakFooterTextBlock: {
    flex: 1,
    gap: 2,
  },
  streakFooterTitle: {
    fontSize: 13,
  },
});
