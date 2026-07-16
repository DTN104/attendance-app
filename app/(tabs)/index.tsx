import { router } from 'expo-router';
import { BriefcaseBusiness, CalendarDays, Clock3, FilePenLine } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { AppCard } from '@/components/ui/AppCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { employee, monthlyStats, today } from '@/data/attendance';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const quickActions = [
  { icon: CalendarDays, label: 'Xin nghỉ', route: '/leave-request' },
  { icon: Clock3, label: 'Tăng ca', route: '/overtime-request' },
  { icon: BriefcaseBusiness, label: 'Đi công tác', route: '/business-trip-request' },
  { icon: FilePenLine, label: 'Chỉnh công', route: '/adjustment-request' },
] as const satisfies readonly { icon: LucideIcon; label: string; route: string }[];

export default function OverviewScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title={`Chào buổi sáng, ${employee.preferredName}`}
          subtitle={today.label}
          right={<UserAvatar initials={employee.initials} />}
        />

        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <Text style={styles.eyebrow}>TRẠNG THÁI HÔM NAY</Text>
            <View style={styles.statusChip}><Text style={styles.statusText}>{today.status.toUpperCase()}</Text></View>
          </View>
          <View style={styles.heroBody}>
            <View>
              <Text style={styles.checkIn}>{today.checkIn}</Text>
              <Text style={styles.heroLabel}>Giờ vào ca</Text>
              <Text style={styles.workTime}>{today.workTime}</Text>
              <Text style={styles.heroLabel}>Thời gian làm việc</Text>
            </View>
            <ProgressRing progress={today.progress} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tổng quan tháng 7</Text>
        <View style={styles.stats}>
          {monthlyStats.map((item) => (
            <AppCard key={item.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statDetail}>{item.detail}</Text>
            </AppCard>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Thao tác nhanh</Text>
        <View style={styles.actions}>
          {quickActions.map(({ icon: Icon, label, route }) => (
            <Pressable
              accessibilityRole="button"
              key={label}
              onPress={() => router.push(route)}
              style={({ pressed }) => [styles.action, pressed && styles.pressed]}>
              <View style={styles.actionIcon}><Icon color={colors.text} size={23} /></View>
              <Text style={styles.actionLabel}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProgressRing({ progress }: { progress: number }) {
  const radiusValue = 27;
  const circumference = 2 * Math.PI * radiusValue;

  return (
    <View style={styles.progress}>
      <Svg height={68} style={styles.progressSvg} viewBox="0 0 68 68" width={68}>
        <Circle cx="34" cy="34" fill="none" r={radiusValue} stroke={colors.primaryRing} strokeWidth="8" />
        <Circle
          cx="34"
          cy="34"
          fill="none"
          r={radiusValue}
          stroke={colors.surface}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - progress / 100)}
          strokeLinecap="round"
          strokeWidth="8"
        />
      </Svg>
      <Text style={styles.progressText}>{progress}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  heroCard: { backgroundColor: colors.primary, borderRadius: radius.xl, gap: spacing.xl, padding: spacing.xl },
  heroTop: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  eyebrow: { color: colors.avatarSurface, fontSize: typography.sizes.caption, fontWeight: typography.weights.semibold },
  statusChip: { backgroundColor: colors.primaryRing, borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: 6 },
  statusText: { color: colors.surface, fontSize: typography.sizes.caption, fontWeight: typography.weights.semibold },
  heroBody: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  checkIn: { color: colors.surface, fontSize: 44, fontWeight: typography.weights.bold, letterSpacing: -1.5, lineHeight: 50 },
  heroLabel: { color: colors.avatarSurface, fontSize: typography.sizes.body, lineHeight: typography.lineHeights.body },
  workTime: { color: colors.surface, fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.bold, marginTop: spacing.sm },
  progress: { alignItems: 'center', height: 68, justifyContent: 'center', width: 68 },
  progressSvg: { position: 'absolute', transform: [{ rotate: '-90deg' }] },
  progressText: { color: colors.surface, fontSize: typography.sizes.label, fontWeight: typography.weights.bold },
  sectionTitle: { color: colors.text, fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.bold },
  stats: { flexDirection: 'row', gap: spacing.sm },
  statCard: { flex: 1, minHeight: 104, padding: spacing.md },
  statValue: { color: colors.text, fontSize: typography.sizes.title, fontWeight: typography.weights.bold, marginTop: spacing.md },
  statLabel: { color: colors.textSecondary, fontSize: typography.sizes.caption },
  statDetail: { color: colors.textSecondary, fontSize: typography.sizes.caption, marginTop: spacing.xs },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  action: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flexBasis: '46%', flexDirection: 'row', flexGrow: 1, gap: spacing.md, minHeight: 62, minWidth: 150, paddingHorizontal: spacing.md },
  actionIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 42, justifyContent: 'center', width: 42 },
  actionLabel: { color: colors.text, flexShrink: 1, fontSize: typography.sizes.label, fontWeight: typography.weights.semibold },
  pressed: { opacity: 0.68 },
});
