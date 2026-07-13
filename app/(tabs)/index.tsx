import { Bell, ChevronRight, Clock3 } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { employee, monthlyStats, recentAttendance, today } from '@/data/attendance';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function OverviewScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title={`Xin chào, ${employee.name.split(' ').at(-1)}!`}
          subtitle={today.label}
          right={
            <View style={styles.notification}>
              <Bell color={colors.text} size={21} />
              <View style={styles.notificationDot} />
            </View>
          }
        />

        <AppCard style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <Text style={styles.eyebrow}>TRẠNG THÁI HÔM NAY</Text>
              <StatusBadge label={today.status} />
            </View>
            <View style={styles.clockIcon}><Clock3 color={colors.primary} size={24} /></View>
          </View>
          <View style={styles.times}>
            <TimeItem label="Giờ vào" value={today.checkIn} />
            <View style={styles.divider} />
            <TimeItem label="Giờ ra" value={today.checkOut} />
            <View style={styles.divider} />
            <TimeItem label="Đã làm" value="22 phút" />
          </View>
        </AppCard>

        <Text style={styles.sectionTitle}>Tổng quan tháng này</Text>
        <View style={styles.stats}>
          {monthlyStats.map((item) => (
            <AppCard key={item.label} style={styles.statCard}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </AppCard>
          ))}
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Chấm công gần đây</Text>
          <Text style={styles.link}>Xem tất cả</Text>
        </View>
        <AppCard style={styles.listCard}>
          {recentAttendance.map((item, index) => (
            <View key={item.date} style={[styles.row, index > 0 && styles.rowBorder]}>
              <View style={styles.dateBox}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.day}>{item.day}</Text>
              </View>
              <View style={styles.rowCopy}>
                <Text style={styles.rowTime}>{item.time}</Text>
                <StatusBadge label={item.status} variant={item.status === 'Đi muộn' ? 'warning' : 'success'} />
              </View>
              <ChevronRight color={colors.textSecondary} size={20} />
            </View>
          ))}
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

function TimeItem({ label, value }: { label: string; value: string }) {
  return <View style={styles.timeItem}><Text style={styles.timeLabel}>{label}</Text><Text style={styles.timeValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  notification: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.full, height: 44, justifyContent: 'center', width: 44 },
  notificationDot: { backgroundColor: colors.danger, borderColor: colors.surface, borderRadius: radius.full, borderWidth: 2, height: 9, position: 'absolute', right: 10, top: 9, width: 9 },
  heroCard: { gap: spacing.xl },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between' },
  eyebrow: { color: colors.textSecondary, fontSize: typography.sizes.caption, fontWeight: typography.weights.semibold, marginBottom: spacing.sm },
  clockIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 48, justifyContent: 'center', width: 48 },
  times: { flexDirection: 'row' },
  timeItem: { alignItems: 'center', flex: 1 },
  timeLabel: { color: colors.textSecondary, fontSize: typography.sizes.caption, marginBottom: spacing.xs },
  timeValue: { color: colors.text, fontSize: 17, fontWeight: typography.weights.bold },
  divider: { backgroundColor: colors.border, width: StyleSheet.hairlineWidth },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: typography.weights.bold },
  stats: { flexDirection: 'row', gap: spacing.sm },
  statCard: { flex: 1, padding: spacing.md },
  statValue: { color: colors.primary, fontSize: typography.sizes.title, fontWeight: typography.weights.bold },
  statLabel: { color: colors.textSecondary, fontSize: 11, lineHeight: 16, marginTop: spacing.xs },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: -spacing.sm },
  link: { color: colors.primary, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  listCard: { paddingVertical: 0 },
  row: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, minHeight: 88 },
  rowBorder: { borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth },
  dateBox: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, padding: spacing.sm, width: 58 },
  date: { color: colors.primary, fontSize: typography.sizes.label, fontWeight: typography.weights.bold },
  day: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  rowCopy: { flex: 1, gap: 6 },
  rowTime: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
});
