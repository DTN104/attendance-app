import { useState } from 'react';
import { CalendarDays, ChevronDown, ChevronUp, Clock3 } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AttendanceStatus, attendanceHistory, calendarDays } from '@/data/history';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

const status: Record<AttendanceStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  'on-time': { label: 'Đúng giờ', variant: 'success' },
  late: { label: 'Đi muộn', variant: 'warning' },
  leave: { label: 'Nghỉ phép', variant: 'warning' },
  missing: { label: 'Thiếu công', variant: 'danger' },
};

export default function HistoryScreen() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(13);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Lịch sử chấm công" subtitle="Theo dõi thời gian làm việc của bạn" />

        <Pressable
          accessibilityLabel="Mở lịch tháng 7 năm 2026"
          accessibilityRole="button"
          accessibilityState={{ expanded: isCalendarOpen }}
          onPress={() => setIsCalendarOpen((open) => !open)}
          style={({ pressed }) => [styles.monthPicker, pressed && styles.pressed]}>
          <CalendarDays color={colors.primary} size={19} />
          <Text style={styles.month}>Tháng 07/2026</Text>
          {isCalendarOpen ? (
            <ChevronUp color={colors.textSecondary} size={18} />
          ) : (
            <ChevronDown color={colors.textSecondary} size={18} />
          )}
        </Pressable>

        {isCalendarOpen ? (
          <View style={styles.calendar}>
            <View style={styles.calendarRow}>
              {weekdays.map((day) => (
                <Text key={day} style={styles.weekday}>{day}</Text>
              ))}
              {calendarDays.map((day, index) => {
                const isSelected = day.date === selectedDate;

                return (
                  <Pressable
                    accessibilityLabel={`Ngày ${day.date} tháng 7`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    key={day.date}
                    onPress={() => setSelectedDate(day.date)}
                    style={({ pressed }) => [styles.dayCell, index === 0 && styles.firstDay, pressed && styles.pressed]}>
                    <View style={[styles.dayCircle, isSelected && styles.selectedDay]}>
                      <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{day.date}</Text>
                    </View>
                    <View style={styles.dotSlot}>
                      {day.status ? (
                        <View style={[styles.statusDot, { backgroundColor: day.status === 'late' ? colors.warning : colors.success }]} />
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ) : null}

        <Text style={styles.sectionTitle}>Chi tiết gần đây</Text>
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
  monthPicker: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.sm, minHeight: 52, paddingHorizontal: spacing.lg },
  month: { color: colors.text, flex: 1, fontSize: typography.sizes.label, fontWeight: typography.weights.semibold },
  calendar: { marginTop: -spacing.sm },
  calendarRow: { flexDirection: 'row', flexWrap: 'wrap' },
  weekday: { color: colors.textSecondary, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold, marginBottom: spacing.md, textAlign: 'center', width: '14.2857%' },
  dayCell: { alignItems: 'center', minHeight: 58, width: '14.2857%' },
  firstDay: { marginLeft: '28.5714%' },
  dayCircle: { alignItems: 'center', borderRadius: radius.full, height: 38, justifyContent: 'center', width: 38 },
  dayText: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.medium },
  selectedDay: { backgroundColor: colors.primary },
  selectedDayText: { color: colors.white, fontWeight: typography.weights.semibold },
  dotSlot: { alignItems: 'center', height: spacing.sm, justifyContent: 'center' },
  statusDot: { borderRadius: radius.full, height: 5, width: 5 },
  pressed: { opacity: 0.72 },
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
