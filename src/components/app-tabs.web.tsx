import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="index" href="/" asChild>
            <TabButton icon="local_fire_department">Workout</TabButton>
          </TabTrigger>
          <TabTrigger name="exercise" href="/exercise" asChild>
            <TabButton icon="fitness_center">Exercise</TabButton>
          </TabTrigger>
          <TabTrigger name="progress" href="/progress" asChild>
            <TabButton icon="show_chart">Progress</TabButton>
          </TabTrigger>
          <TabTrigger name="vip" href="/vip" asChild>
            <TabButton icon="crown">VIP</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

type IconKey = 'local_fire_department' | 'fitness_center' | 'show_chart' | 'crown';

const iconMap: Record<IconKey, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  local_fire_department: 'fire',
  fitness_center: 'dumbbell',
  show_chart: 'chart-line',
  crown: 'crown',
};

export function TabButton({
  children,
  isFocused,
  icon,
  ...props
}: TabTriggerSlotProps & { icon: IconKey }) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <Pressable {...props} style={({ pressed }) => [styles.tabItem, pressed && styles.pressed]}>
      <MaterialCommunityIcons
        name={iconMap[icon]}
        size={18}
        color={isFocused ? colors.primary : colors.textSecondary}
      />
      <ThemedText type="small" themeColor={isFocused ? 'primary' : 'textSecondary'}>
        {children}
      </ThemedText>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="smallBold" style={styles.brandText}>
          RagaKu
        </ThemedText>

        {props.children}

        <Ionicons name="person-circle-outline" size={20} color="#94A3B8" style={styles.profileIcon} />
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.four,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabItem: {
    alignItems: 'center',
    gap: 2,
  },
  profileIcon: {
    marginLeft: Spacing.three,
  },
});
