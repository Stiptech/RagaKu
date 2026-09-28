import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type OnboardingHeaderProps = {
  eyebrow: string;
  step: number;
  totalSteps: number;
  title: string;
  description?: string;
  onBack?: () => void;
};

export function OnboardingHeader({
  eyebrow,
  step,
  totalSteps,
  title,
  description,
  onBack,
}: OnboardingHeaderProps) {
  const theme = useTheme();
  const percent = Math.round((step / totalSteps) * 100);

  return (
    <View style={styles.wrapper}>
      <View style={styles.topRow}>
        <Pressable
          onPress={onBack ?? (() => router.back())}
          hitSlop={10}
          style={[styles.iconButton, { borderColor: theme.border }]}>
          <Ionicons name="chevron-back" size={18} color={theme.text} />
        </Pressable>

        <View style={styles.eyebrowBlock}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.eyebrow}>
            {eyebrow}
          </ThemedText>
        </View>

        <View style={[styles.stepBadge, { backgroundColor: theme.backgroundSelected }]}>
          <View style={[styles.dot, { backgroundColor: theme.primary }]} />
          <ThemedText type="small" themeColor="primary" style={styles.stepBadgeText}>
            STEP AKTIF
          </ThemedText>
        </View>
      </View>

      <View style={styles.progressRow}>
        <ThemedText type="smallBold" themeColor="textSecondary">
          LANGKAH {step} DARI {totalSteps}
        </ThemedText>
        <ThemedText type="smallBold" themeColor="primary">
          {percent}% Selesai
        </ThemedText>
      </View>

      <View style={[styles.track, { backgroundColor: theme.border }]}>
        <View
          style={[styles.fill, { backgroundColor: theme.primary, width: `${percent}%` }]}
        />
      </View>

      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      {description ? (
        <ThemedText type="default" themeColor="textSecondary" style={styles.description}>
          {description}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Spacing.two,
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
  eyebrowBlock: {
    flex: 1,
  },
  eyebrow: {
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  stepBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  stepBadgeText: {
    fontSize: 10,
    letterSpacing: 0.4,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  title: {
    marginTop: Spacing.three,
    fontSize: 24,
    lineHeight: 30,
  },
  description: {
    marginTop: 4,
  },
});
