import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useOnboarding, type Equipment } from '@/components/onboarding/onboarding-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { OnboardingHeader } from '@/components/ui/onboarding-header';
import { PillButton } from '@/components/ui/pill-button';
import { SelectRowItem } from '@/components/ui/select-items';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

const EQUIPMENT_OPTIONS: {
  value: Equipment;
  title: string;
  subtitle: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}[] = [
  {
    value: 'bodyweight',
    title: 'Beban Tubuh (Bodyweight)',
    subtitle: 'Hanya butuh matras, latihan di mana saja & kapan saja',
    icon: 'karate',
  },
  {
    value: 'dumbbell',
    title: 'Dumbbell',
    subtitle: 'Set beban bebas untuk latihan kekuatan',
    icon: 'dumbbell',
  },
  {
    value: 'resistance-band',
    title: 'Resistance Band',
    subtitle: 'Fleksibel untuk mobilitas & kekuatan ringan',
    icon: 'gesture-swipe-horizontal',
  },
  {
    value: 'pull-up-bar',
    title: 'Pull-up Bar',
    subtitle: 'Untuk latihan tarikan tubuh bagian atas',
    icon: 'human-handsup',
  },
  {
    value: 'kettlebell',
    title: 'Kettlebell',
    subtitle: 'Latihan dinamis & fungsional',
    icon: 'weight',
  },
  {
    value: 'barbell',
    title: 'Barbell',
    subtitle: 'Akses gym lengkap dengan beban progresif',
    icon: 'weight-lifter',
  },
];

export default function EquipmentStep() {
  const theme = useTheme();
  const { data, update, toggleInList } = useOnboarding();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <OnboardingHeader
            eyebrow="ONBOARDING ASSESSMENT"
            step={3}
            totalSteps={4}
            title="Peralatan Apa yang Kamu Miliki?"
            description="RagaKu menyesuaikan program latihan harian dengan fasilitas yang kamu punya hari ini."
          />

          <Card style={styles.gymRow}>
            <View style={styles.gymTextBlock}>
              <ThemedText type="smallBold">Keanggotaan Gym</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Akses ke mesin & beban lengkap
              </ThemedText>
            </View>
            <Switch
              value={data.gymMembership}
              onValueChange={(gymMembership) => update({ gymMembership })}
              trackColor={{ true: theme.primary, false: theme.border }}
              thumbColor="#FFFFFF"
            />
          </Card>

          <View style={styles.listGap}>
            {EQUIPMENT_OPTIONS.map((option) => (
              <SelectRowItem
                key={option.value}
                title={option.title}
                subtitle={option.subtitle}
                selected={data.equipment.includes(option.value)}
                onPress={() => toggleInList('equipment', option.value)}
                icon={
                  <MaterialCommunityIcons
                    name={option.icon}
                    size={20}
                    color={data.equipment.includes(option.value) ? '#FFFFFF' : theme.textSecondary}
                  />
                }
              />
            ))}
          </View>

          <View style={[styles.recommendationBox, { backgroundColor: theme.backgroundSelected }]}>
            <Ionicons name="sparkles" size={16} color={theme.primary} />
            <ThemedText type="small" themeColor="textSecondary" style={styles.recommendationText}>
              Rekomendasi Adaptif: RagaKu otomatis mengeliminasi gerakan yang membutuhkan alat yang
              tidak kamu miliki.
            </ThemedText>
          </View>

          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: theme.primary }]} />
            <ThemedText type="small" themeColor="textSecondary">
              Status Seleksi: {data.equipment.length} peralatan dipilih
            </ThemedText>
          </View>

          <PillButton
            label="LANJUT: OLAHRAGA FAVORIT →"
            disabled={data.equipment.length === 0}
            onPress={() => router.push('/onboarding/activities')}
          />
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
  gymRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gymTextBlock: {
    gap: 2,
  },
  listGap: {
    gap: Spacing.two,
  },
  recommendationBox: {
    flexDirection: 'row',
    gap: 8,
    padding: Spacing.three,
    borderRadius: 16,
  },
  recommendationText: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
