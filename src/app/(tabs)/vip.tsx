import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { PillButton } from '@/components/ui/pill-button';
import { BottomTabInset, CardRadius, MaxContentWidth, OverlaySurface, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type PlanKey = 'yearly' | 'monthly';

const COMPARISON_ROWS = [
  {
    title: 'AI Workout Plan',
    badge: 'ADAPTIF REALTIME',
    free: 'Akun Gratis · Dasar (Statik mingguan)',
    pro: 'RagaKu Pro · Adaptif tiap sesi otomatis',
  },
  {
    title: 'Live Form Tracking',
    badge: 'KAMERA HP',
    free: 'Akun Gratis · Tidak tersedia',
    pro: 'RagaKu Pro · Koreksi sudut & tempo realtime',
  },
  {
    title: 'Modifikasi Cedera',
    badge: 'MULTI-SENDI',
    free: 'Akun Gratis · Terbatas 1 area tubuh',
    pro: 'RagaKu Pro · Multi-sendi & recovery',
  },
  {
    title: 'Konsultasi AI Coach',
    badge: 'SUARA & TEKS 24/7',
    free: 'Akun Gratis · Maks. 3 tanya/hari',
    pro: 'RagaKu Pro · Chat suara & teks tanpa batas',
  },
];

export default function UpgradeVipScreen() {
  const theme = useTheme();
  const [plan, setPlan] = useState<PlanKey>('yearly');

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: BottomTabInset + Spacing.six }]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <View style={[styles.badge, { backgroundColor: theme.backgroundSelected }]}>
              <Ionicons name="sparkles" size={12} color={theme.primary} />
              <ThemedText type="small" themeColor="primary">
                RAGAKU PRO LIVE
              </ThemedText>
            </View>
          </View>

          <ThemedText type="subtitle" style={styles.title}>
            Buka Pelatih AI Real-Time & Live Form Tracking
          </ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            Koreksi postur otomatis, penyesuaian repetisi langsung via kamera, dan bimbingan audio
            adaptif setiap miledetik.
          </ThemedText>

          <View style={[styles.previewCard, { backgroundColor: OverlaySurface }]}>
            <View style={styles.previewTopRow}>
              <View style={[styles.previewBadge, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
                <ThemedText type="small" style={styles.previewBadgeText}>
                  OPTICAL AI 60 FPS
                </ThemedText>
              </View>
              <View style={[styles.previewBadge, { backgroundColor: theme.primary }]}>
                <ThemedText type="small" style={styles.previewBadgeText}>
                  172° SQUAT DEPTH
                </ThemedText>
              </View>
            </View>
            <View style={styles.previewIconWrap}>
              <Ionicons name="videocam" size={40} color="rgba(255,255,255,0.4)" />
            </View>
            <ThemedText type="small" style={styles.previewCaption}>
              Tempo Tepat: 3s Eksentrik / 1s Ledak · 98% Akurasi
            </ThemedText>
          </View>

          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
            MATRIKS KEUNGGULAN · GRATIS VS PRO
          </ThemedText>
          <View style={styles.comparisonList}>
            {COMPARISON_ROWS.map((row) => (
              <Card key={row.title} style={styles.comparisonCard}>
                <View style={styles.rowBetween}>
                  <ThemedText type="smallBold">{row.title}</ThemedText>
                  <View style={[styles.tinyBadge, { backgroundColor: theme.backgroundSelected }]}>
                    <ThemedText type="small" themeColor="primary" style={styles.tinyBadgeText}>
                      {row.badge}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText type="small" themeColor="textSecondary">
                  {row.free}
                </ThemedText>
                <ThemedText type="smallBold" themeColor="primary">
                  {row.pro}
                </ThemedText>
              </Card>
            ))}
          </View>

          <Pressable onPress={() => setPlan('yearly')}>
            <Card selected={plan === 'yearly'} style={styles.planCard}>
              <View style={[styles.saveBadge, { backgroundColor: theme.warning }]}>
                <ThemedText type="small" style={styles.saveBadgeText}>
                  HEMAT 50% · POPULER
                </ThemedText>
              </View>
              <View style={styles.rowBetween}>
                <View>
                  <ThemedText type="smallBold">Tahunan · VIP Unlimited</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    Ditagih Rp588.000/tahun setelah uji coba
                  </ThemedText>
                </View>
                <View style={styles.priceBlock}>
                  <ThemedText type="subtitle" themeColor="primary" style={styles.priceValue}>
                    Rp49.000
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    /bulan
                  </ThemedText>
                </View>
              </View>
            </Card>
          </Pressable>

          <Pressable onPress={() => setPlan('monthly')}>
            <Card selected={plan === 'monthly'} style={styles.planCard}>
              <View style={styles.rowBetween}>
                <View>
                  <ThemedText type="smallBold">Bulanan · Fartlek Flex</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    Fleksibel, batalkan kapan saja
                  </ThemedText>
                </View>
                <View style={styles.priceBlock}>
                  <ThemedText type="subtitle" style={styles.priceValue}>
                    Rp99.000
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    /bulan
                  </ThemedText>
                </View>
              </View>
            </Card>
          </Pressable>

          <PillButton label="MULAI 7 HARI GRATIS SEKARANG →" onPress={() => {}} />
          <ThemedText type="small" themeColor="textSecondary" style={styles.disclaimer}>
            Garansi 7 hari gratis. Batalkan kapan saja sebelum masa uji coba berakhir tanpa
            dipungut biaya.
          </ThemedText>

          <View style={styles.footerLinks}>
            <ThemedText type="small" themeColor="textSecondary">
              Syarat & Ketentuan
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Pemulihan Pembelian
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              Kebijakan Privasi
            </ThemedText>
          </View>
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
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
  },
  previewCard: {
    borderRadius: CardRadius + 4,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  previewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  previewBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    letterSpacing: 0.3,
  },
  previewIconWrap: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewCaption: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    textAlign: 'center',
  },
  sectionLabel: {
    letterSpacing: 0.4,
    marginTop: Spacing.two,
  },
  comparisonList: {
    gap: Spacing.two,
  },
  comparisonCard: {
    gap: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tinyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  tinyBadgeText: {
    fontSize: 10,
    letterSpacing: 0.3,
  },
  planCard: {
    gap: 6,
  },
  saveBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  saveBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    letterSpacing: 0.3,
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  priceValue: {
    fontSize: 20,
  },
  disclaimer: {
    textAlign: 'center',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
});
