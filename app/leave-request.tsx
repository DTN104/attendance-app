import { router } from 'expo-router';
import { ArrowLeft, CalendarDays, Check, ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { leaveTypes } from '@/data/requests';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type LeaveType = (typeof leaveTypes)[number];
type LeaveSession = 'Cả ngày' | 'Buổi sáng' | 'Buổi chiều';

export default function LeaveRequestScreen() {
  const [leaveType, setLeaveType] = useState<LeaveType>('Nghỉ phép năm');
  const [showTypes, setShowTypes] = useState(false);
  const [session, setSession] = useState<LeaveSession>('Cả ngày');
  const [fromDate, setFromDate] = useState('15/07/2026');
  const [toDate, setToDate] = useState('16/07/2026');
  const [reason, setReason] = useState('');
  const [contact, setContact] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <ScreenHeader title="Đơn nghỉ phép" subtitle="Điền thông tin cho yêu cầu nghỉ" left={<BackButton />} />

          <AppCard style={styles.form}>
            <Text style={styles.label}>Loại nghỉ phép</Text>
            <Pressable accessibilityRole="button" onPress={() => setShowTypes((value) => !value)} style={styles.select}>
              <Text style={styles.inputText}>{leaveType}</Text>
              <ChevronDown color={colors.textSecondary} size={19} />
            </Pressable>
            {showTypes ? (
              <View style={styles.options}>
                {leaveTypes.map((item) => (
                  <Pressable key={item} onPress={() => { setLeaveType(item); setShowTypes(false); }} style={styles.option}>
                    <Text style={styles.optionText}>{item}</Text>
                    {leaveType === item ? <Check color={colors.primary} size={18} /> : null}
                  </Pressable>
                ))}
              </View>
            ) : null}

            <Text style={styles.label}>Thời gian nghỉ</Text>
            <View style={styles.dateRow}>
              <DateField label="Từ ngày" onChangeText={setFromDate} value={fromDate} />
              <DateField label="Đến ngày" onChangeText={setToDate} value={toDate} />
            </View>

            <Text style={styles.label}>Thời lượng</Text>
            <View style={styles.sessions}>
              {(['Cả ngày', 'Buổi sáng', 'Buổi chiều'] as LeaveSession[]).map((item) => (
                <Pressable key={item} onPress={() => setSession(item)} style={[styles.session, session === item && styles.sessionActive]}>
                  <Text style={[styles.sessionText, session === item && styles.sessionTextActive]}>{item}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.label}>Lý do nghỉ phép <Text style={styles.required}>*</Text></Text>
            <TextInput
              maxLength={300}
              multiline
              onChangeText={setReason}
              placeholder="Nhập lý do nghỉ phép"
              placeholderTextColor={colors.textSecondary}
              style={[styles.input, styles.textarea]}
              textAlignVertical="top"
              value={reason}
            />
            <Text style={styles.counter}>{reason.length}/300</Text>

            <Text style={styles.label}>Người liên hệ thay thế</Text>
            <TextInput
              onChangeText={setContact}
              placeholder="Họ tên hoặc số điện thoại (không bắt buộc)"
              placeholderTextColor={colors.textSecondary}
              style={styles.input}
              value={contact}
            />
          </AppCard>

          <View style={styles.note}>
            <Text style={styles.noteTitle}>Số ngày nghỉ dự kiến</Text>
            <Text style={styles.noteValue}>02 ngày</Text>
          </View>

          <PrimaryButton
            disabled={!reason.trim()}
            label="Gửi đơn nghỉ phép"
            onPress={() => Alert.alert('Đã gửi đơn', 'Đơn nghỉ phép đã được lưu bằng dữ liệu mô phỏng.')}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function BackButton() {
  return (
    <Pressable accessibilityLabel="Quay lại" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
      <ArrowLeft color={colors.text} size={22} />
    </Pressable>
  );
}

function DateField({ label, value, onChangeText }: { label: string; value: string; onChangeText: (value: string) => void }) {
  return (
    <View style={styles.dateField}>
      <Text style={styles.dateLabel}>{label}</Text>
      <View style={styles.dateValue}>
        <CalendarDays color={colors.primary} size={17} />
        <TextInput keyboardType="number-pad" maxLength={10} onChangeText={onChangeText} style={styles.dateInput} value={value} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  flex: { flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  back: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.full, borderWidth: StyleSheet.hairlineWidth, height: 42, justifyContent: 'center', width: 42 },
  form: { gap: spacing.md },
  label: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold, marginTop: spacing.xs },
  required: { color: colors.danger },
  select: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', minHeight: 50, paddingHorizontal: spacing.md },
  inputText: { color: colors.text, fontSize: typography.sizes.body },
  options: { borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, overflow: 'hidden' },
  option: { alignItems: 'center', borderBottomColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth, flexDirection: 'row', justifyContent: 'space-between', minHeight: 46, paddingHorizontal: spacing.md },
  optionText: { color: colors.text, fontSize: typography.sizes.body },
  dateRow: { flexDirection: 'row', gap: spacing.sm },
  dateField: { borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flex: 1, padding: spacing.md },
  dateLabel: { color: colors.textSecondary, fontSize: typography.sizes.caption, marginBottom: spacing.sm },
  dateValue: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  dateInput: { color: colors.text, flex: 1, fontSize: typography.sizes.body, padding: 0 },
  sessions: { flexDirection: 'row', gap: spacing.sm },
  session: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flex: 1, justifyContent: 'center', minHeight: 44, paddingHorizontal: spacing.xs },
  sessionActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  sessionText: { color: colors.textSecondary, fontSize: 11, fontWeight: typography.weights.medium, textAlign: 'center' },
  sessionTextActive: { color: colors.primary, fontWeight: typography.weights.semibold },
  input: { borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, color: colors.text, fontSize: typography.sizes.body, minHeight: 50, paddingHorizontal: spacing.md },
  textarea: { minHeight: 108, paddingTop: spacing.md },
  counter: { color: colors.textSecondary, fontSize: 10, marginTop: -spacing.sm, textAlign: 'right' },
  note: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.lg, flexDirection: 'row', justifyContent: 'space-between', padding: spacing.lg },
  noteTitle: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  noteValue: { color: colors.primary, fontSize: typography.sizes.title, fontWeight: typography.weights.bold },
});
