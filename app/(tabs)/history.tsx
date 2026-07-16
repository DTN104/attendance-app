import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { employee } from '@/data/attendance';
import { AttendanceStatus, attendanceHistory } from '@/data/history';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { formatMonthKey, formatMonthLabel, formatShortDate, formatWeekday, getCalendarMonth, parseIsoDate, shiftMonth } from '@/utils/date';

const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const status: Record<AttendanceStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  'on-time': { label: 'Đúng giờ', variant: 'success' },
  late: { label: 'Đi muộn', variant: 'warning' },
  leave: { label: 'Nghỉ phép', variant: 'warning' },
  missing: { label: 'Thiếu công', variant: 'danger' },
};

const statusColor: Record<AttendanceStatus, string> = {
  'on-time': colors.success,
  late: colors.warning,
  leave: colors.warning,
  missing: colors.danger,
};

export default function HistoryScreen() {
  const [selectedDate, setSelectedDate] = useState<number | null>(13);
  const [visibleMonth, setVisibleMonth] = useState(() => parseIsoDate(attendanceHistory[0].date));
  const monthKey = formatMonthKey(visibleMonth);
  const monthLabel = formatMonthLabel(visibleMonth);
  const calendar = getCalendarMonth(visibleMonth);
  const monthlyHistory = attendanceHistory.filter((item) => item.date.startsWith(monthKey));
  const statusByDate = new Map(monthlyHistory.map((item) => [parseIsoDate(item.date).getDate(), item.status]));

  const changeMonth = (offset: number) => {
    setVisibleMonth((month) => shiftMonth(month, offset));
    setSelectedDate(null);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          right={<UserAvatar initials={employee.initials} />}
          subtitle="Theo dõi giờ làm và trạng thái"
          title="Lịch sử chấm công"
        />

        <View style={styles.monthPicker}>
          <Pressable
            accessibilityLabel="Tháng trước"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => changeMonth(-1)}
            style={({ pressed }) => [styles.monthButton, pressed && styles.pressed]}>
            <ChevronLeft color={colors.textSecondary} size={21} />
          </Pressable>
          <Text style={styles.month}>{monthLabel}</Text>
          <Pressable
            accessibilityLabel="Tháng sau"
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => changeMonth(1)}
            style={({ pressed }) => [styles.monthButton, pressed && styles.pressed]}>
            <ChevronRight color={colors.textSecondary} size={21} />
          </Pressable>
        </View>

        <View style={styles.calendar}>
          <View style={styles.calendarRow}>
              {weekdays.map((day) => (
                <Text key={day} style={styles.weekday}>{day}</Text>
              ))}
              {Array.from({ length: calendar.leadingDays }, (_, index) => (
                <View key={`empty-${index}`} style={styles.dayCell} />
              ))}
              {calendar.days.map((day) => {
                const isSelected = day === selectedDate;
                const dayStatus = statusByDate.get(day);

                return (
                  <Pressable
                    accessibilityLabel={`Ngày ${day}, ${monthLabel}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    key={day}
                    onPress={() => setSelectedDate(day)}
                    style={({ pressed }) => [styles.dayCell, pressed && styles.pressed]}>
                    <View style={[styles.dayCircle, isSelected && styles.selectedDay]}>
                      <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{day}</Text>
                    </View>
                    <View style={styles.dotSlot}>
                      {dayStatus ? (
                        <View style={[styles.statusDot, { backgroundColor: statusColor[dayStatus] }]} />
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Chi tiết gần đây</Text>
        {monthlyHistory.length ? (
          <View style={styles.list}>
            {monthlyHistory.slice(0, 4).map((item) => {
              const date = parseIsoDate(item.date);

              return (
                <AppCard key={item.id} style={styles.record}>
                  <View style={styles.dateBox}>
                    <Text style={styles.recordDate}>{date.getDate()}</Text>
                  </View>
                  <View style={styles.recordCopy}>
                    <Text style={styles.recordTitle}>{item.id === '13' ? 'Hôm nay' : formatWeekday(date)}, {formatShortDate(date)}</Text>
                    <Text style={styles.times}>{item.checkIn}  →  {item.checkOut}</Text>
                  </View>
                  <StatusBadge label={item.worked} variant={status[item.status].variant} />
                </AppCard>
              );
            })}
          </View>
        ) : (
          <AppCard style={styles.emptyCard}>
            <Text style={styles.emptyText}>Chưa có dữ liệu chấm công trong tháng này.</Text>
          </AppCard>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  monthPicker: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: StyleSheet.hairlineWidth, flexDirection: 'row', justifyContent: 'space-between', minHeight: 52 },
  monthButton: { alignItems: 'center', alignSelf: 'stretch', justifyContent: 'center', paddingHorizontal: spacing.lg },
  month: { color: colors.text, fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.semibold },
  calendar: { marginTop: -spacing.sm },
  calendarRow: { flexDirection: 'row', flexWrap: 'wrap' },
  weekday: { color: colors.textSecondary, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold, marginBottom: spacing.md, textAlign: 'center', width: '14.2857%' },
  dayCell: { alignItems: 'center', minHeight: 58, width: '14.2857%' },
  dayCircle: { alignItems: 'center', borderRadius: radius.full, height: 38, justifyContent: 'center', width: 38 },
  dayText: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.medium },
  selectedDay: { backgroundColor: colors.primary },
  selectedDayText: { color: colors.white, fontWeight: typography.weights.semibold },
  dotSlot: { alignItems: 'center', height: spacing.sm, justifyContent: 'center' },
  statusDot: { borderRadius: radius.full, height: 5, width: 5 },
  pressed: { opacity: 0.72 },
  sectionTitle: { color: colors.text, fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.bold },
  emptyCard: { alignItems: 'center' },
  emptyText: { color: colors.textSecondary, fontSize: typography.sizes.body },
  list: { gap: spacing.md },
  record: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, minHeight: 72, padding: spacing.md },
  dateBox: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.full, height: 44, justifyContent: 'center', width: 44 },
  recordDate: { color: colors.primary, fontSize: typography.sizes.label, fontWeight: typography.weights.bold },
  recordCopy: { flex: 1, gap: spacing.xs },
  recordTitle: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  times: { color: colors.textSecondary, fontSize: typography.sizes.body },
});
