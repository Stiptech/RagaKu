import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useOnboarding } from '@/components/onboarding/onboarding-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { LineChart } from '@/components/ui/line-chart';
import { PillButton } from '@/components/ui/pill-button';
import { StatTile } from '@/components/ui/stat-tile';
import { BottomTabInset, FontFamily, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const WEEK_DAYS = [
  { label: 'SEN', done: true, tag: 'Upper' },
  { label: 'SEL', done: true, tag: 'Lower' },
  { label: 'RAB', done: true, tag: 'Core' },
  { label: 'KAM', done: false, rest: true, tag: 'Rest' },
  { label: 'JUM', done: true, tag: 'Push' },
  { label: 'SAB', done: true, tag: 'Pull' },
  { label: 'MIN', done: false, rest: true, tag: 'Rest' },
];

export default function ProgressTelemetryScreen() {
  const theme = useTheme();
  const { data } = useOnboarding();

  const baseline = data.weightKg;
  const target = data.targetWeightKg;
  const diff = baseline - target;
  // Day-28 progress fraction of the baseline→target diff (matches Figma's -4.6kg/6kg demo curve).
  const DAY28_PROGRESS = 23 / 30;
  const current = +(baseline - diff * DAY28_PROGRESS).toFixed(1);
  const weightSeries = [
    baseline,
    +(baseline - diff * DAY28_PROGRESS * (0.22 / 0.6)).toFixed(1),
    +(baseline - diff * DAY28_PROGRESS * (0.4 / 0.6)).toFixed(1),
    current,
  ];
  const totalLoss = +(baseline - current).toFixed(1);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: BottomTabInset + Spacing.six }]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.telemetryRow}>
                <View style={[styles.liveDot, { backgroundColor: theme.primary }]} />
                <ThemedText type="smallBold" themeColor="primary" style={styles.eyebrow}>
                  TELEMETRY AKTIF
                </ThemedText>
              </View>
              <ThemedText style={styles.title}>PROGRES & TRANSFORMASI</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Konsistensi 28 hari terakhir
              </ThemedText>
            </View>
            <View style={[styles.cycleBadge, { borderColor: theme.warning }]}>
              <ThemedText type="smallBold" themeColor="warning" style={styles.cycleBadgeText}>
                Siklus 1 · Bulan ke-1
              </ThemedText>
            </View>
          </View>

          <View style={[styles.reminderRow, { backgroundColor: '#FFF7ED', borderColor: theme.warning }]}>
            <Ionicons name="alarm" size={16} color={theme.warning} />
            <View style={styles.reminderTextBlock}>
              <ThemedText type="smallBold" style={styles.reminderTitle}>
                REMINDER PENGUKURAN BERKALA
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Check-in bobot & lingkar pinggang 2 hari lagi.
              </ThemedText>
            </View>
            <View style={[styles.soonBadge, { backgroundColor: theme.warning }]}>
              <ThemedText type="small" style={styles.soonBadgeText}>
                SEGERA
              </ThemedText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatTile label="Berat Badan" value={`${current}`} unit="kg" trend={`↓ ${totalLoss} kg`} />
            <StatTile label="Massa Otot" value="+1.2" unit="kg" trend="↑ Hipertrofi" />
            <StatTile label="Pinggang" value="-5" unit="cm" trend="Defisit" trendPositive={false} />
          </View>

          <Card style={styles.section}>
            <View style={styles.rowBetween}>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
                TRAJEKTORI BERAT BADAN
              </ThemedText>
              <View style={[styles.onTrackBadge, { backgroundColor: theme.backgroundSelected }]}>
                <ThemedText type="small" themeColor="primary">
                  On Track
                </ThemedText>
              </View>
            </View>
            <ThemedText type="small" themeColor="textSecondary">
              Baseline {baseline} kg → Target {target} kg
            </ThemedText>
            <LineChart
              data={weightSeries}
              labels={['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']}
              targetValue={target}
              height={140}
            />
            <ThemedText type="smallBold" themeColor="primary">
              Hari 28: {current} kg · Target {target} kg
            </ThemedText>
          </Card>

          <Card style={styles.section}>
            <View style={styles.rowBetween}>
              <ThemedText style={styles.cardTitle}>KOMPARASI VISUAL ATLET</ThemedText>
              <View style={[styles.onTrackBadge, { backgroundColor: theme.backgroundSelected }]}>
                <ThemedText type="smallBold" themeColor="primary">
                  -3.8% Lemak Tubuh
                </ThemedText>
              </View>
            </View>
            <View style={styles.compareRow}>
              <View style={styles.compareItem}>
                <View style={[styles.comparePhoto, { backgroundColor: theme.background }]}>
                  <Ionicons name="body-outline" size={36} color={theme.textSecondary} />
                </View>
                <ThemedText type="smallBold">Hari 1</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  Kondisi Baseline Awal
                </ThemedText>
              </View>
              <View style={styles.compareItem}>
                <View style={[styles.comparePhoto, { backgroundColor: theme.backgroundSelected, borderColor: theme.primary, borderWidth: 1.5 }]}>
                  <Ionicons name="body" size={36} color={theme.primary} />
                </View>
                <View style={styles.compareTitleRow}>
                  <ThemedText type="smallBold" themeColor="primary">
                    Hari 28
                  </ThemedText>
                  <View style={[styles.tonedBadge, { backgroundColor: theme.primary }]}>
                    <ThemedText type="small" style={styles.tonedBadgeText}>
                      Toned
                    </ThemedText>
                  </View>
                </View>
                <ThemedText type="smallBold" themeColor="primary">
                  +1.2kg Massa Otot
                </ThemedText>
              </View>
            </View>
          </Card>

          <Card style={styles.section}>
            <View style={styles.rowBetween}>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
                WORKOUT STREAK PEKANAN
              </ThemedText>
              <ThemedText themeColor="primary" style={styles.streakPercentFont}>
                100%
              </ThemedText>
            </View>
            <View style={styles.weekRow}>
              {WEEK_DAYS.map((day) => (
                <View key={day.label} style={styles.dayColumn}>
                  <View
                    style={[
                      styles.dayCircle,
                      day.rest
                        ? { backgroundColor: theme.background, borderColor: theme.border, borderWidth: 1 }
                        : { backgroundColor: day.done ? theme.primary : theme.border },
                    ]}>
                    {day.rest ? (
                      <Ionicons name="moon" size={13} color={theme.textMuted} />
                    ) : (
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    )}
                  </View>
                  <ThemedText type="small" themeColor="textSecondary" style={styles.dayLabel}>
                    {day.label}
                  </ThemedText>
                  <ThemedText
                    type="small"
                    themeColor={day.rest ? 'textMuted' : 'textSecondary'}
                    style={styles.dayTag}>
                    {day.tag}
                  </ThemedText>
                </View>
              ))}
            </View>
            <ThemedText type="small" themeColor="textSecondary" style={styles.streakSummary}>
              Sempurna, 5 dari 5 sesi selesai minggu ini.
            </ThemedText>
          </Card>

          <PillButton label="UNDUH LAPORAN PROGRES RAGAKU PDF" variant="outline" onPress={() => {}} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
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
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
    gap: 2,
  },
  telemetryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  eyebrow: {
    letterSpacing: 0.6,
    fontSize: 12,
  },
  title: {
    fontFamily: FontFamily.headingBold,
    fontSize: 28,
    lineHeight: 32,
  },
  cycleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  cycleBadgeText: {
    fontSize: 12,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 1,
  },
  reminderTextBlock: {
    flex: 1,
    gap: 2,
  },
  reminderTitle: {
    fontSize: 12,
  },
  soonBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  soonBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  section: {
    gap: Spacing.two,
  },
  sectionLabel: {
    letterSpacing: 0.4,
  },
  cardTitle: {
    fontFamily: FontFamily.headingBold,
    fontSize: 18,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onTrackBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  compareRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  compareItem: {
    flex: 1,
    gap: 2,
  },
  comparePhoto: {
    height: 120,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  compareTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tonedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  tonedBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  streakPercentFont: {
    fontFamily: FontFamily.headingBold,
    fontSize: 18,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    gap: 4,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabel: {
    fontSize: 11,
  },
  dayTag: {
    fontSize: 10,
  },
  streakSummary: {
    marginTop: 4,
  },
});
