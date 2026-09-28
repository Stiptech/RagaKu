import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BodyDiagram, type BodyZone } from '@/components/onboarding/body-diagram';
import { useOnboarding, type Injury } from '@/components/onboarding/onboarding-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { OnboardingHeader } from '@/components/ui/onboarding-header';
import { PillButton } from '@/components/ui/pill-button';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const ZONE_TO_INJURY: Record<BodyZone, Injury> = {
  bahu: 'bahu',
  punggung: 'punggung',
  lutut: 'lutut',
};

const QUICK_CONDITIONS: { value: Injury; label: string }[] = [
  { value: 'lutut', label: 'Lutut Sensitif' },
  { value: 'punggung', label: 'Nyeri Punggung Bawah' },
  { value: 'bahu', label: 'Cedera Bahu' },
  { value: 'tekanan-rendah', label: 'Tekanan Darah Rendah' },
  { value: 'tekanan-tinggi', label: 'Tekanan Darah Tinggi' },
  { value: 'asma', label: 'Asma' },
  { value: 'tidak-ada', label: 'Tidak Ada Cedera / Kondisi Fit' },
];

const PROTECTION_NOTES: Partial<Record<Injury, string>> = {
  lutut: 'Kecualikan Box Jumps & Deep Lunges, gunakan Glute Bridges & Straight Leg Isometric.',
  punggung: 'Kecualikan gerakan fleksi tulang belakang berlebih dan deadlift beban berat.',
  bahu: 'Kecualikan overhead press berat dan gerakan rotasi ekstrem pada bahu.',
  'tekanan-tinggi':
    'Kecualikan posisi kepala lebih rendah dari jantung dalam waktu lama & latihan isometric berlebih.',
  'tekanan-rendah': 'Tambahkan transisi gerakan bertahap untuk menghindari pusing mendadak.',
  asma: 'Sesuaikan intensitas kardio dan sediakan jeda istirahat lebih panjang.',
};

export default function HealthStep() {
  const theme = useTheme();
  const { data, toggleInList } = useOnboarding();

  const toggleInjury = (value: Injury) => {
    if (value === 'tidak-ada') {
      toggleInList('injuries', 'tidak-ada');
      return;
    }
    toggleInList('injuries', value);
  };

  const toggleZone = (zone: BodyZone) => toggleInjury(ZONE_TO_INJURY[zone]);

  const activeInjuries = data.injuries.filter((item) => item !== 'tidak-ada');
  const activeZones = (Object.keys(ZONE_TO_INJURY) as BodyZone[]).filter((zone) =>
    data.injuries.includes(ZONE_TO_INJURY[zone]),
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <OnboardingHeader
            eyebrow="ONBOARDING ASSESSMENT"
            step={2}
            totalSteps={4}
            title="Riwayat Cedera & Kesehatan"
            description="Tandai area tubuh yang perlu dihindari atau dipulihkan agar AI memodifikasi gerakan secara aman."
          />

          <Card style={styles.section}>
            <View style={[styles.scanBadge, { backgroundColor: theme.backgroundSelected }]}>
              <Ionicons name="body" size={14} color={theme.primary} />
              <ThemedText type="small" themeColor="primary">
                KETUK AREA TUBUH YANG BERMASALAH
              </ThemedText>
            </View>

            <BodyDiagram activeZones={activeZones} onToggleZone={toggleZone} />
          </Card>

          <Card style={styles.section}>
            <View style={styles.rowBetween}>
              <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
                KONDISI CEPAT
              </ThemedText>
              <ThemedText type="small" themeColor="primary">
                {activeInjuries.length} TERPILIH
              </ThemedText>
            </View>
            <View style={styles.chipRow}>
              {QUICK_CONDITIONS.map((condition) => (
                <Chip
                  key={condition.value}
                  label={condition.label}
                  selected={data.injuries.includes(condition.value)}
                  onPress={() => toggleInjury(condition.value)}
                />
              ))}
            </View>
          </Card>

          {activeInjuries.length > 0 ? (
            <View style={[styles.protectionBox, { backgroundColor: '#FFF7ED', borderColor: theme.warning }]}>
              <View style={styles.protectionHeader}>
                <Ionicons name="shield-checkmark" size={16} color={theme.warning} />
                <ThemedText type="smallBold" style={{ color: theme.warning }}>
                  AI PROTECTION PROTOCOL AKTIF
                </ThemedText>
              </View>
              {activeInjuries.map((injury) => (
                <ThemedText key={injury} type="small" themeColor="textSecondary" style={styles.protectionText}>
                  • {PROTECTION_NOTES[injury]}
                </ThemedText>
              ))}
            </View>
          ) : null}

          <PillButton
            label="SIMPAN & LANJUT PILIH ALAT →"
            onPress={() => router.push('/onboarding/equipment')}
          />
          <ThemedText
            type="smallBold"
            themeColor="textSecondary"
            style={styles.skipLink}
            onPress={() => router.push('/onboarding/equipment')}>
            LEWATI LANGKAH INI
          </ThemedText>
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
    paddingTop: Spacing.three,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
  },
  section: {
    gap: Spacing.three,
  },
  sectionLabel: {
    letterSpacing: 0.4,
  },
  scanBadge: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  protectionBox: {
    borderWidth: 1,
    borderRadius: 16,
    padding: Spacing.three,
    gap: 6,
  },
  protectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  protectionText: {
    lineHeight: 18,
  },
  skipLink: {
    textAlign: 'center',
  },
});
