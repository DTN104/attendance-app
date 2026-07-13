import { CalendarDays, ChevronDown, Clock3 } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AttendanceStatus, attendanceHistory, historySummary } from '@/data/history';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const status: Record<AttendanceStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  'on-time': { label: 'Đúng giờ', variant: 'success' },
  late: { label: 'Đi muộn', variant: 'warning' },
  leave: { label: 'Nghỉ phép', variant: 'warning' },
  missing: { label: 'Thiếu công', variant: 'danger' },
};

export default function HistoryScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Lịch sử chấm công" subtitle="Theo dõi thời gian làm việc của bạn" />

        <View style={styles.monthPicker}>
          <CalendarDays color={colors.primary} size={19} />
          <Text style={styles.month}>Tháng 07/2026</Text>
          <ChevronDown color={colors.textSecondary} size={18} />
        </View>

        <View style={styles.summary}>
          {historySummary.map((item) => (
            <AppCard key={item.label} style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{item.value}</Text>
              <Text style={styles.summaryLabel}>{item.label}</Text>
            </AppCard>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Chi tiết chấm công</Text>
        <AppCard style={styles.listCard}>
          {attendanceHistory.map((item, index) => (
            <View key={item.id} style={[styles.record, index > 0 && styles.recordBorder]}>
              <View style={styles.dateBox}>
                <Text style={styles.recordDate}>{item.date}</Text>
                <Text style={styles.recordDay}>{item.day}</Text>
              </View>
              <View style={styles.recordCopy}>
                <View style={styles.timeRow}>
                  <Clock3 color={colors.textSecondary} size={15} />
                  <Text style={styles.times}>{item.checkIn} - {item.checkOut}</Text>
                </View>
                <Text style={styles.worked}>{item.worked}</Text>
              </View>
              <View>
                <StatusBadge label={status[item.status].label} variant={status[item.status].variant} />
              </View>
            </View>
          ))}
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  monthPicker: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.sm, minHeight: 44, paddingHorizontal: spacing.md },
  month: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  summary: { flexDirection: 'row', gap: spacing.sm },
  summaryCard: { flex: 1, padding: spacing.md },
  summaryValue: { color: colors.primary, fontSize: typography.sizes.title, fontWeight: typography.weights.bold },
  summaryLabel: { color: colors.textSecondary, fontSize: 11, lineHeight: 16, marginTop: spacing.xs },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: typography.weights.bold },
  listCard: { paddingVertical: 0 },
  record: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, minHeight: 94 },
  recordBorder: { borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth },
  dateBox: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, paddingVertical: spacing.sm, width: 58 },
  recordDate: { color: colors.primary, fontSize: typography.sizes.label, fontWeight: typography.weights.bold },
  recordDay: { color: colors.textSecondary, fontSize: 10, marginTop: 2 },
  recordCopy: { flex: 1, gap: spacing.xs },
  timeRow: { alignItems: 'center', flexDirection: 'row', gap: 6 },
  times: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  worked: { color: colors.textSecondary, fontSize: typography.sizes.caption },
});
