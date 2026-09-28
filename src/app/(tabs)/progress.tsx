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
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const WEEK_DAYS = [
  { label: 'SEN', done: true },
  { label: 'SEL', done: true },
  { label: 'RAB', done: true },
  { label: 'KAM', done: false, rest: true },
  { label: 'JUM', done: true },
  { label: 'SAB', done: true },
  { label: 'MIN', done: false, rest: true },
];

export default function ProgressTelemetryScreen() {
  const theme = useTheme();
  const { data } = useOnboarding();

  const baseline = data.weightKg;
  const target = data.targetWeightKg;
  const diff = baseline - target;
  const current = +(baseline - diff * 0.6).toFixed(1);
  const weightSeries = [
    baseline,
    +(baseline - diff * 0.22).toFixed(1),
    +(baseline - diff * 0.4).toFixed(1),
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
            <View>
              <ThemedText type="small" themeColor="textSecondary" style={styles.eyebrow}>
                PROGRESS TELEMETRY
              </ThemedText>
              <ThemedText type="subtitle" style={styles.title}>
                Progres & Transformasi
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Konsistensi 28 hari terakhir
              </ThemedText>
            </View>
            <View style={[styles.cycleBadge, { backgroundColor: theme.backgroundSelected }]}>
              <ThemedText type="small" themeColor="primary">
                Siklus 1 · Bulan ke-1
              </ThemedText>
            </View>
          </View>

          <View style={[styles.reminderRow, { backgroundColor: '#FFF7ED', borderColor: theme.warning }]}>
            <Ionicons name="alarm" size={16} color={theme.warning} />
            <ThemedText type="small" themeColor="textSecondary" style={styles.reminderText}>
              Reminder pengukuran berkala: check-in bobot & lingkar pinggang, 2 hari lagi.
            </ThemedText>
            <View style={[styles.soonBadge, { backgroundColor: theme.warning }]}>
              <ThemedText type="small" style={styles.soonBadgeText}>
                SEGERA
              </ThemedText>
            </View>
          </View>

          <View style={styles.statsRow}>
            <StatTile label="Berat Badan" value={`${current}`} unit="kg" trend={`↓ ${totalLoss} kg`} />
            <StatTile label="Massa Otot" value="+1.2" unit="kg" trend="↑ Hipertrofi" />
            <StatTile label="Pinggang" value="-5" unit="cm" trend="Defisit" />
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
            <ThemedText type="small" themeColor="textSecondary">
              Hari 28: {current} kg · Target {target} kg
            </ThemedText>
          </Card>

          <Card style={styles.section}>
            <View style={styles.rowBetween}>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
                KOMPARASI VISUAL ATLET
              </ThemedText>
              <ThemedText type="small" themeColor="primary">
                -3.8% Lemak Tubuh
              </ThemedText>
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
                <View style={[styles.comparePhoto, { backgroundColor: theme.backgroundSelected }]}>
                  <Ionicons name="body" size={36} color={theme.primary} />
                </View>
                <View style={styles.compareTitleRow}>
                  <ThemedText type="smallBold">Hari 28</ThemedText>
                  <View style={[styles.tonedBadge, { backgroundColor: theme.primary }]}>
                    <ThemedText type="small" style={styles.tonedBadgeText}>
                      Toned
                    </ThemedText>
                  </View>
                </View>
                <ThemedText type="small" themeColor="textSecondary">
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
              <ThemedText type="smallBold" themeColor="primary">
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
                      <ThemedText type="small" themeColor="textSecondary">
                        ·
                      </ThemedText>
                    ) : (
                      <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                    )}
                  </View>
                  <ThemedText type="small" themeColor="textSecondary">
                    {day.label}
                  </ThemedText>
                </View>
              ))}
            </View>
            <ThemedText type="small" themeColor="textSecondary" style={styles.streakSummary}>
              Sempurna, 5 dari 5 sesi selesai minggu ini.
            </ThemedText>
          </Card>

          <PillButton label="UNDUH LAPORAN PROGRES PDF" variant="outline" onPress={() => {}} />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
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
    alignItems: 'flex-start',
  },
  eyebrow: {
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    lineHeight: 28,
  },
  cycleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 1,
  },
  reminderText: {
    flex: 1,
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
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
    gap: 6,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakSummary: {
    marginTop: 4,
  },
});
