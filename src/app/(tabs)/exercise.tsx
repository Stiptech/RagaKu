import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { BottomTabInset, FontFamily, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ExerciseCategory = 'Semua' | 'Dumbbell' | 'Bodyweight' | 'Kardio' | 'Mobilitas';

const EXERCISES: {
  title: string;
  muscle: string;
  meta: string;
  category: ExerciseCategory;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
}[] = [
  { title: 'Goblet Squat', muscle: 'Paha & Glutes', meta: '4 SET x 12 REPS', category: 'Dumbbell', icon: 'dumbbell' },
  { title: 'Bicep Curl & Hammer Press', muscle: 'Lengan', meta: '4 SET x 12 REPS', category: 'Dumbbell', icon: 'dumbbell' },
  { title: 'Incline Bench Push-Up', muscle: 'Dada & Trisep', meta: '3 SET x 15 REPS', category: 'Bodyweight', icon: 'human-handsup' },
  { title: 'Core Plank with Knee Tap', muscle: 'Inti Tubuh', meta: '3 SET x 45 DETIK', category: 'Bodyweight', icon: 'yoga' },
  { title: 'Banded Face Pull', muscle: 'Bahu & Postur', meta: '3 SET x 15 REPS', category: 'Mobilitas', icon: 'arm-flex' },
  { title: 'Glute Bridge', muscle: 'Glutes & Lutut Aman', meta: '3 SET x 15 REPS', category: 'Bodyweight', icon: 'human-handsup' },
  { title: 'Jump Rope Interval', muscle: 'Kardio Full Body', meta: '5 SET x 60 DETIK', category: 'Kardio', icon: 'run-fast' },
  { title: 'Straight Leg Isometric', muscle: 'Lutut & Paha Depan', meta: '3 SET x 30 DETIK', category: 'Mobilitas', icon: 'yoga' },
];

const CATEGORIES: ExerciseCategory[] = ['Semua', 'Dumbbell', 'Bodyweight', 'Kardio', 'Mobilitas'];

export default function ExerciseLibraryScreen() {
  const theme = useTheme();
  const [category, setCategory] = useState<ExerciseCategory>('Semua');
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () =>
      EXERCISES.filter((exercise) => {
        const matchesCategory = category === 'Semua' || exercise.category === category;
        const matchesQuery = exercise.title.toLowerCase().includes(query.toLowerCase());
        return matchesCategory && matchesQuery;
      }),
    [category, query],
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: BottomTabInset + Spacing.six }]}
          showsVerticalScrollIndicator={false}>
          <View>
            <ThemedText type="small" themeColor="textSecondary" style={styles.eyebrow}>
              EXERCISE LIBRARY
            </ThemedText>
            <ThemedText style={styles.title}>Daftar Gerakan</ThemedText>
          </View>

          <View style={[styles.searchRow, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
            <Ionicons name="search" size={18} color={theme.textSecondary} />
            <TextInput
              placeholder="Cari nama gerakan..."
              placeholderTextColor={theme.textSecondary}
              value={query}
              onChangeText={setQuery}
              style={[styles.searchInput, { color: theme.text }]}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.chipRow}>
              {CATEGORIES.map((item) => (
                <Chip
                  key={item}
                  label={item}
                  selected={category === item}
                  onPress={() => setCategory(item)}
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.list}>
            {filtered.map((exercise, index) => (
              <Pressable key={exercise.title} onPress={() => router.push('/active-session')}>
                <Card style={styles.exerciseRow}>
                  <View style={[styles.exerciseIndex, { backgroundColor: theme.background }]}>
                    <ThemedText type="smallBold" themeColor="textSecondary">
                      {String(index + 1).padStart(2, '0')}
                    </ThemedText>
                  </View>
                  <View style={[styles.iconBox, { backgroundColor: theme.backgroundSelected }]}>
                    <MaterialCommunityIcons name={exercise.icon} size={22} color={theme.primary} />
                  </View>
                  <View style={styles.exerciseTextBlock}>
                    <ThemedText style={styles.exerciseTitle}>{exercise.title}</ThemedText>
                    <ThemedText type="smallBold" themeColor="primary" style={styles.exerciseMeta}>
                      {exercise.meta}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {exercise.muscle}
                    </ThemedText>
                  </View>
                  <Ionicons name="play-circle" size={26} color={theme.primary} />
                </Card>
              </Pressable>
            ))}

            {filtered.length === 0 ? (
              <ThemedText type="small" themeColor="textSecondary" style={styles.emptyText}>
                Tidak ada gerakan yang cocok dengan pencarianmu.
              </ThemedText>
            ) : null}
          </View>
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
  eyebrow: {
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: FontFamily.headingBold,
    fontSize: 28,
    lineHeight: 32,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: Spacing.three,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: FontFamily.bodyMedium,
  },
  chipRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    paddingVertical: 2,
  },
  list: {
    gap: Spacing.two,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  exerciseIndex: {
    width: 28,
    height: 28,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseTextBlock: {
    flex: 1,
    gap: 2,
  },
  exerciseTitle: {
    fontFamily: FontFamily.headingBold,
    fontSize: 18,
    lineHeight: 22,
  },
  exerciseMeta: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: Spacing.four,
  },
});
