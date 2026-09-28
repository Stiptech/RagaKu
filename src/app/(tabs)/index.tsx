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
import { BottomTabInset, MaxContentWidth, OverlaySurface, Spacing } from '@/constants/theme';
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
    ? 'Pemulihan otot prima. Variasi gerakan hari ini dirancang ramah lutut kanan sesuai catatan riwayat latihan kemarin.'
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
              <ThemedText type="subtitle" style={styles.greeting}>
                Halo, Juara!
              </ThemedText>
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

          <View style={[styles.streakBadge, { backgroundColor: theme.backgroundSelected }]}>
            <ThemedText type="smallBold" themeColor="primary">
              🔥 Hari ke-11 · Target Fase Fat-Burn 1 · Minggu 2 dari 6
            </ThemedText>
          </View>

          <View style={styles.statsRow}>
            <StatTile label="Skor Kesiapan AI" value="92%" trend="Siap intensitas tinggi" />
            <View style={styles.rhrCard}>
              <Card style={styles.rhrInner}>
                <ThemedText type="small" themeColor="textSecondary" style={styles.rhrLabel}>
                  RHR (DETAK ISTIRAHAT)
                </ThemedText>
                <ThemedText type="subtitle" style={styles.rhrValue}>
                  54 <ThemedText type="smallBold" themeColor="textSecondary">BPM</ThemedText>
                </ThemedText>
                <LineChart data={[58, 57, 56, 55, 56, 54, 54]} height={36} />
              </Card>
            </View>
          </View>

          <View style={[styles.recommendationBox, { backgroundColor: '#FFF7ED', borderColor: theme.warning }]}>
            <Ionicons name="bulb" size={16} color={theme.warning} />
            <ThemedText type="small" themeColor="textSecondary" style={styles.recommendationText}>
              Rekomendasi AI: {recommendation}
            </ThemedText>
          </View>

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
              <ThemedText type="subtitle" style={styles.featuredTitle}>
                Upper Body & Core Hypertrophy
              </ThemedText>
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
            <ThemedText type="smallBold">Daftar Rangkaian ({TODAY_EXERCISES.length})</ThemedText>
            <ThemedText type="small" themeColor="primary">
              Pratinjau Semua &gt;
            </ThemedText>
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
                  <ThemedText type="smallBold">{exercise.title}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {exercise.meta} · {exercise.duration} · {exercise.tag}
                  </ThemedText>
                </View>
              </Card>
            ))}
          </View>

          <View style={[styles.streakFooter, { borderColor: theme.border }]}>
            <Ionicons name="flame" size={18} color={theme.warning} />
            <ThemedText type="small" themeColor="textSecondary" style={styles.streakFooterText}>
              Streak Latihan: 4 Hari Berturut-turut. Selesaikan sesi ini untuk membuka badge
              &quot;Iron Will&quot;.
            </ThemedText>
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
    fontSize: 26,
    lineHeight: 30,
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
  streakBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  rhrCard: {
    flex: 1,
  },
  rhrInner: {
    gap: 4,
  },
  rhrLabel: {
    letterSpacing: 0.4,
    fontSize: 11,
  },
  rhrValue: {
    fontSize: 22,
    lineHeight: 26,
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
  streakFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderTopWidth: 1,
    paddingTop: Spacing.three,
    marginTop: Spacing.two,
  },
  streakFooterText: {
    flex: 1,
  },
});
