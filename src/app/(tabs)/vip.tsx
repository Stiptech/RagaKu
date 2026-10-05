import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Card } from '@/components/ui/card';
import { PillButton } from '@/components/ui/pill-button';
import { BottomTabInset, CardRadius, FontFamily, MaxContentWidth, OverlaySurface, Spacing } from '@/constants/theme';
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
    title: 'Audit & Kalibrasi Program Harian',
    badge: 'ADAPTIF KESIAPAN',
    free: 'Akun Gratis · Program statis mingguan',
    pro: 'RagaKu Pro VIP · Evaluasi kesiapan fisik & modifikasi beban harian otomatis',
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
              <ThemedText type="smallBold" themeColor="primary" style={styles.badgeText}>
                RAGAKU PRO LIVE
              </ThemedText>
            </View>
          </View>

          <ThemedText style={styles.title}>
            BUKA PELATIH AI PERSONAL{'\n'}
            <ThemedText themeColor="primary" style={styles.title}>
              & KONSULTASI VIP REAL-TIME
            </ThemedText>
          </ThemedText>
          <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
            Program adaptif harian presisi, penyesuaian repetisi cerdas, dan bimbingan AI Coach 24/7
            tanpa batas.
          </ThemedText>

          <View style={[styles.previewCard, { backgroundColor: OverlaySurface }]}>
            <View style={styles.previewHeaderRow}>
              <View style={styles.previewHeaderLeft}>
                <View style={[styles.previewIconCircle, { backgroundColor: theme.primary }]}>
                  <Ionicons name="hardware-chip" size={18} color="#FFFFFF" />
                </View>
                <View>
                  <ThemedText style={styles.previewHeaderTitle}>VIP AI COACH ASSISTANT</ThemedText>
                  <ThemedText type="small" style={styles.previewHeaderSub}>
                    Online 24/7 · Respons Adaptif
                  </ThemedText>
                </View>
              </View>
              <View style={[styles.previewBadge, { borderColor: 'rgba(255,255,255,0.3)' }]}>
                <ThemedText type="small" style={styles.previewBadgeText}>
                  ULTRA{'\n'}INTELLIGENCE
                </ThemedText>
              </View>
            </View>

            <View style={[styles.chatBubble, styles.chatBubbleUser]}>
              <ThemedText type="smallBold" style={styles.chatLabelUser}>
                Konsultasi Atlet
              </ThemedText>
              <ThemedText type="small" style={styles.chatBodyUser}>
                Bahu kanan sedikit tegang sehabis overhead press kemarin. Ada penyesuaian beban hari
                ini?
              </ThemedText>
            </View>

            <View style={[styles.chatBubble, styles.chatBubbleBot, { backgroundColor: theme.primary }]}>
              <ThemedText type="smallBold" style={styles.chatLabelBot}>
                RagaKu AI Coach
              </ThemedText>
              <ThemedText type="small" style={styles.chatBodyBot}>
                Siap, beban compound shoulder press diturunkan 15% & ditambahkan 2 set rotasi rotator
                cuff. Nutrisi pemulihan & hidrasi dioptimalkan.
              </ThemedText>
            </View>

            <View style={styles.previewFooterRow}>
              <ThemedText type="small" style={styles.previewFooterText}>
                Analisis Program, Nutrisi & Cedera
              </ThemedText>
              <ThemedText type="small" style={styles.previewFooterLatency}>
                LATENSI &lt; 0.5 DETIK
              </ThemedText>
            </View>
          </View>

          <View style={styles.sectionHeaderRow}>
            <ThemedText style={styles.sectionTitle}>MATRIKS KEUNGGULAN</ThemedText>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
              GRATIS VS PRO
            </ThemedText>
          </View>
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
                <View style={styles.comparisonColumns}>
                  <View style={[styles.comparisonColumn, { borderColor: theme.border }]}>
                    <ThemedText type="small" themeColor="textSecondary" style={styles.comparisonColumnLabel}>
                      Akun Gratis
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {row.free.replace(/^Akun Gratis\s*·?\s*/, '')}
                    </ThemedText>
                  </View>
                  <View style={[styles.comparisonColumn, styles.comparisonColumnPro, { backgroundColor: theme.backgroundSelected }]}>
                    <ThemedText type="small" themeColor="primary" style={styles.comparisonColumnLabel}>
                      RagaKu Pro
                    </ThemedText>
                    <ThemedText type="smallBold" themeColor="primary">
                      {row.pro.replace(/^RagaKu Pro\s*·?\s*/, '')}
                    </ThemedText>
                  </View>
                </View>
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
                  <ThemedText style={styles.planTitle}>TAHUNAN</ThemedText>
                  <ThemedText type="smallBold" themeColor="primary">
                    VIP Unlimited
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    Ditagih Rp588.000/tahun setelah uji coba
                  </ThemedText>
                </View>
                <View style={styles.priceBlock}>
                  <ThemedText themeColor="primary" style={styles.priceValue}>
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
                  <ThemedText style={styles.planTitle}>BULANAN</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    Fartlek Flex
                  </ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    Fleksibel, batalkan kapan saja
                  </ThemedText>
                </View>
                <View style={styles.priceBlock}>
                  <ThemedText style={styles.priceValue}>Rp99.000</ThemedText>
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
              Pulihkan Pembelian
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
  badgeText: {
    fontSize: 12,
  },
  title: {
    fontFamily: FontFamily.headingBold,
    fontSize: 32,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 14,
  },
  previewCard: {
    borderRadius: CardRadius + 4,
    padding: Spacing.three,
    gap: Spacing.three,
  },
  previewHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  previewHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    flex: 1,
  },
  previewIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewHeaderTitle: {
    fontFamily: FontFamily.headingBold,
    color: '#FFFFFF',
    fontSize: 14,
  },
  previewHeaderSub: {
    color: '#99F6E4',
    fontSize: 11,
  },
  previewBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  previewBadgeText: {
    color: '#99F6E4',
    fontSize: 10,
    letterSpacing: 0.3,
    textAlign: 'right',
  },
  chatBubble: {
    borderRadius: 14,
    padding: Spacing.two,
    gap: 2,
    maxWidth: '85%',
  },
  chatBubbleUser: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignSelf: 'flex-start',
  },
  chatBubbleBot: {
    alignSelf: 'flex-end',
  },
  chatLabelUser: {
    color: '#5EEAD4',
    fontSize: 11,
  },
  chatBodyUser: {
    color: '#F1F5F9',
  },
  chatLabelBot: {
    color: '#CCFBF1',
    fontSize: 11,
  },
  chatBodyBot: {
    color: '#FFFFFF',
  },
  previewFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.12)',
  },
  previewFooterText: {
    color: '#CBD5E1',
    fontSize: 11,
  },
  previewFooterLatency: {
    color: '#5EEAD4',
    fontSize: 11,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: Spacing.two,
  },
  sectionTitle: {
    fontFamily: FontFamily.headingBold,
    fontSize: 20,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 0.4,
  },
  comparisonList: {
    gap: Spacing.two,
  },
  comparisonCard: {
    gap: 8,
  },
  comparisonColumns: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  comparisonColumn: {
    flex: 1,
    gap: 2,
    padding: Spacing.two,
    borderRadius: 12,
    borderWidth: 1,
  },
  comparisonColumnPro: {
    borderWidth: 0,
  },
  comparisonColumnLabel: {
    fontSize: 10,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
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
    gap: 2,
  },
  planTitle: {
    fontFamily: FontFamily.headingBold,
    fontSize: 18,
  },
  saveBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 6,
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
    fontFamily: FontFamily.headingBold,
    fontSize: 24,
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
