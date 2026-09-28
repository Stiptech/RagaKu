import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { PillButton } from '@/components/ui/pill-button';
import { CardRadius, MaxContentWidth, OverlaySurface, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const TOTAL_SETS = 4;
const SET_SECONDS = 45;

const STEPS = [
  {
    title: 'Posisi Awal',
    detail: 'Berdiri tegak dengan kaki selebar bahu, genggam dumbbell dengan telapak tangan menghadap satu sama lain (neutral grip).',
  },
  {
    title: 'Gerakan Kontraksi',
    detail: 'Angkat beban dengan menekuk siku tanpa mengayunkan pinggul, hembuskan napas di puncak kontraksi.',
  },
  {
    title: 'Fase Eksentrik',
    detail: 'Turunkan beban secara perlahan (tempo 3 detik) sambil menarik napas dalam.',
  },
];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function ActiveSessionScreen() {
  const theme = useTheme();
  const [currentSet, setCurrentSet] = useState(1);
  const [secondsLeft, setSecondsLeft] = useState(SET_SECONDS);
  const [playing, setPlaying] = useState(true);
  const [feedback, setFeedback] = useState<'ringan' | 'pas' | 'berat' | null>(null);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [playing]);

  const elapsed = SET_SECONDS - secondsLeft;
  const percent = (elapsed / SET_SECONDS) * 100;

  const handleFinishSet = () => {
    if (currentSet >= TOTAL_SETS) {
      router.replace('/(tabs)');
      return;
    }
    setCurrentSet((value) => value + 1);
    setSecondsLeft(SET_SECONDS);
    setPlaying(true);
    setFeedback(null);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <Pressable
              onPress={() => router.back()}
              hitSlop={10}
              style={[styles.iconButton, { borderColor: theme.border }]}>
              <Ionicons name="chevron-back" size={18} color={theme.text} />
            </Pressable>
            <View style={styles.topCenter}>
              <ThemedText type="small" themeColor="textSecondary" style={styles.eyebrow}>
                ACTIVE SESSION
              </ThemedText>
              <ThemedText type="smallBold">Biceps + Brachialis</ThemedText>
            </View>
            <View style={[styles.visionBadge, { backgroundColor: theme.backgroundSelected }]}>
              <ThemedText type="small" themeColor="primary">
                VISION 2.4
              </ThemedText>
            </View>
          </View>

          <View style={[styles.playerCard, { backgroundColor: OverlaySurface }]}>
            <View style={[styles.setBadge, { backgroundColor: theme.primary }]}>
              <ThemedText type="small" style={styles.setBadgeText}>
                SET {currentSet} SEDANG BERJALAN
              </ThemedText>
            </View>

            <Pressable
              onPress={() => setPlaying((value) => !value)}
              style={styles.playButton}
              hitSlop={12}>
              <Ionicons name={playing ? 'pause' : 'play'} size={30} color="#FFFFFF" />
            </Pressable>

            <View style={styles.playerFooter}>
              <ThemedText type="small" style={styles.timerText}>
                {formatTime(elapsed)} / SET {currentSet}
              </ThemedText>
              <ProgressBar percent={percent} color="#FFFFFF" trackColor="rgba(255,255,255,0.25)" />
              <View style={styles.playerControlsRow}>
                <Ionicons name="play-skip-back" size={16} color="rgba(255,255,255,0.7)" />
                <ThemedText type="small" style={styles.speedText}>
                  1.0x
                </ThemedText>
                <Ionicons name="play-skip-forward" size={16} color="rgba(255,255,255,0.7)" />
              </View>
            </View>
          </View>

          <Card style={styles.section}>
            <View style={styles.rowBetween}>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
                SMART CAMERA TRACKER
              </ThemedText>
              <View style={[styles.activeTag, { backgroundColor: theme.backgroundSelected }]}>
                <ThemedText type="small" themeColor="primary">
                  AKTIF
                </ThemedText>
              </View>
            </View>
            <View style={styles.rowBetween}>
              <ThemedText type="small" themeColor="textSecondary">
                Sudut Siku Optimal: 85° – 90°
              </ThemedText>
              <View style={[styles.optimalBadge, { backgroundColor: theme.primary }]}>
                <ThemedText type="small" style={styles.optimalBadgeText}>
                  Optimal (88°)
                </ThemedText>
              </View>
            </View>

            <View style={styles.metricRow}>
              <Metric label="TARGET" value={`${TOTAL_SETS} Set`} />
              <Metric label="VOLUME" value="12 Reps" />
              <Metric label="BEBAN" value="8 Kg" />
              <Metric label="JEDA" value="60 Detik" />
            </View>
          </Card>

          <View style={styles.feedbackRow}>
            {(
              [
                { key: 'ringan', label: 'Terlalu Ringan' },
                { key: 'pas', label: 'Pas' },
                { key: 'berat', label: 'Terlalu Berat' },
              ] as const
            ).map((option) => (
              <Pressable
                key={option.key}
                onPress={() => setFeedback(option.key)}
                style={[
                  styles.feedbackChip,
                  {
                    backgroundColor: feedback === option.key ? theme.primary : theme.backgroundElement,
                    borderColor: feedback === option.key ? theme.primary : theme.border,
                  },
                ]}>
                <ThemedText
                  type="small"
                  style={{ color: feedback === option.key ? '#FFFFFF' : theme.text }}>
                  {option.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
            INSTRUKSI TAHAP DEMI TAHAP
          </ThemedText>
          <View style={styles.stepsList}>
            {STEPS.map((step, index) => (
              <View key={step.title} style={styles.stepRow}>
                <View style={[styles.stepIndex, { backgroundColor: theme.primary }]}>
                  <ThemedText type="smallBold" style={styles.stepIndexText}>
                    {index + 1}
                  </ThemedText>
                </View>
                <View style={styles.stepTextBlock}>
                  <ThemedText type="smallBold">{step.title}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {step.detail}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>

          <View style={[styles.tipBox, { backgroundColor: '#FFF7ED', borderColor: theme.warning }]}>
            <Ionicons name="shield-checkmark" size={16} color={theme.warning} />
            <ThemedText type="small" themeColor="textSecondary" style={styles.tipText}>
              RagaKu AI Pro Tip · Proteksi Sendi: jaga bahu tetap rileks untuk menghindari
              ketegangan berlebih pada leher dan maksimalkan aktivasi brachioradialis.
            </ThemedText>
          </View>

          <PillButton
            label={
              currentSet >= TOTAL_SETS
                ? 'SELESAIKAN LATIHAN →'
                : `SELESAIKAN SET ${currentSet} & MULAI ISTIRAHAT →`
            }
            onPress={handleFinishSet}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricItem}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.metricLabel}>
        {label}
      </ThemedText>
      <ThemedText type="smallBold">{value}</ThemedText>
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
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCenter: {
    flex: 1,
  },
  eyebrow: {
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    fontSize: 10,
  },
  visionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  playerCard: {
    borderRadius: CardRadius + 4,
    padding: Spacing.three,
    gap: Spacing.three,
    alignItems: 'center',
  },
  setBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  setBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    letterSpacing: 0.3,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.four,
  },
  playerFooter: {
    width: '100%',
    gap: 6,
  },
  timerText: {
    color: '#FFFFFF',
  },
  playerControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.four,
  },
  speedText: {
    color: 'rgba(255,255,255,0.7)',
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
  activeTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  optimalBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  optimalBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  metricItem: {
    alignItems: 'center',
    gap: 2,
  },
  metricLabel: {
    fontSize: 10,
    letterSpacing: 0.3,
  },
  feedbackRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  feedbackChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  stepsList: {
    gap: Spacing.three,
  },
  stepRow: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  stepIndex: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndexText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  stepTextBlock: {
    flex: 1,
    gap: 2,
  },
  tipBox: {
    flexDirection: 'row',
    gap: 8,
    padding: Spacing.three,
    borderRadius: 16,
    borderWidth: 1,
  },
  tipText: {
    flex: 1,
  },
});
