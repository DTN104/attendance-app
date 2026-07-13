import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { CalendarDays, Clock3 } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme/tokens';
import { formatDate, formatTime } from '@/utils/date';

type SharedProps = { label: string; value: Date; onChange: (date: Date) => void };
type DateProps = SharedProps & { minimumDate?: Date; maximumDate?: Date };

export function DatePickerField(props: DateProps) {
  return <NativePickerField {...props} icon={CalendarDays} mode="date" />;
}

export function TimePickerField(props: SharedProps) {
  return <NativePickerField {...props} icon={Clock3} mode="time" />;
}

type TimeRangeProps = {
  label: string;
  fromValue: Date;
  toValue: Date;
  onChangeFrom: (date: Date) => void;
  onChangeTo: (date: Date) => void;
};

export function TimeRangePickerField({ label, fromValue, toValue, onChangeFrom, onChangeTo }: TimeRangeProps) {
  const [iosTarget, setIOSTarget] = useState<'from' | 'to' | null>(null);
  const activeValue = iosTarget === 'to' ? toValue : fromValue;

  const openPicker = (target: 'from' | 'to') => {
    const value = target === 'from' ? fromValue : toValue;
    const onChange = target === 'from' ? onChangeFrom : onChangeTo;

    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        display: 'clock',
        is24Hour: true,
        mode: 'time',
        onChange: (event, date) => {
          if (event.type === 'set' && date) onChange(date);
        },
        value,
      });
    } else {
      setIOSTarget(target);
    }
  };

  const handleIOSChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type !== 'set' || !date || !iosTarget) return;
    if (iosTarget === 'from') onChangeFrom(date);
    else onChangeTo(date);
  };

  return (
    <>
      <View style={styles.field}>
        <View style={styles.rangeCopy}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.rangeValues}>
            <Pressable accessibilityLabel={`Từ ${formatTime(fromValue)}`} accessibilityRole="button" onPress={() => openPicker('from')}>
              <Text style={styles.value}>{formatTime(fromValue)}</Text>
            </Pressable>
            <Text style={styles.separator}>–</Text>
            <Pressable accessibilityLabel={`Đến ${formatTime(toValue)}`} accessibilityRole="button" onPress={() => openPicker('to')}>
              <Text style={styles.value}>{formatTime(toValue)}</Text>
            </Pressable>
          </View>
        </View>
        <Clock3 color={colors.primary} size={22} />
      </View>

      {Platform.OS === 'ios' ? (
        <Modal animationType="fade" onRequestClose={() => setIOSTarget(null)} transparent visible={iosTarget !== null}>
          <Pressable onPress={() => setIOSTarget(null)} style={styles.overlay}>
            <Pressable onPress={(event) => event.stopPropagation()} style={styles.modal}>
              <DateTimePicker
                accentColor={colors.primary}
                display="spinner"
                is24Hour
                locale="vi-VN"
                mode="time"
                onChange={handleIOSChange}
                themeVariant="light"
                value={activeValue}
              />
              <Pressable accessibilityRole="button" onPress={() => setIOSTarget(null)} style={styles.doneButton}>
                <Text style={styles.doneText}>Xong</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      ) : null}
    </>
  );
}

type NativeProps = DateProps & { icon: LucideIcon; mode: 'date' | 'time' };

function NativePickerField({ label, value, onChange, minimumDate, maximumDate, icon: Icon, mode }: NativeProps) {
  const [showIOSPicker, setShowIOSPicker] = useState(false);
  const formattedValue = mode === 'date' ? formatDate(value) : formatTime(value);

  const handleChange = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type === 'set' && date) onChange(date);
  };

  const openPicker = () => {
    if (Platform.OS === 'android') {
      DateTimePickerAndroid.open({
        value,
        onChange: handleChange,
        mode,
        display: mode === 'date' ? 'calendar' : 'clock',
        is24Hour: true,
        minimumDate,
        maximumDate,
      });
    } else {
      setShowIOSPicker(true);
    }
  };

  return (
    <>
      <Pressable accessibilityLabel={`${label}: ${formattedValue}`} accessibilityRole="button" onPress={openPicker} style={({ pressed }) => [styles.field, pressed && styles.pressed]}>
        <View>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.value}>{formattedValue}</Text>
        </View>
        <Icon color={colors.primary} size={22} />
      </Pressable>

      {Platform.OS === 'ios' ? (
        <Modal animationType="fade" onRequestClose={() => setShowIOSPicker(false)} transparent visible={showIOSPicker}>
          <Pressable onPress={() => setShowIOSPicker(false)} style={styles.overlay}>
            <Pressable onPress={(event) => event.stopPropagation()} style={styles.modal}>
              <DateTimePicker
                accentColor={colors.primary}
                display={mode === 'date' ? 'inline' : 'spinner'}
                locale="vi-VN"
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                mode={mode}
                onChange={handleChange}
                themeVariant="light"
                value={value}
              />
              <Pressable accessibilityRole="button" onPress={() => setShowIOSPicker(false)} style={styles.doneButton}>
                <Text style={styles.doneText}>Xong</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  field: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flex: 1, flexDirection: 'row', justifyContent: 'space-between', minHeight: 76, padding: spacing.md },
  pressed: { opacity: 0.72 },
  label: { color: colors.textSecondary, fontSize: typography.sizes.caption, fontWeight: typography.weights.semibold, marginBottom: spacing.sm, textTransform: 'uppercase' },
  value: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.bold },
  rangeCopy: { flex: 1 },
  rangeValues: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm },
  separator: { color: colors.textSecondary, fontSize: typography.sizes.label },
  overlay: { alignItems: 'center', backgroundColor: colors.overlay, flex: 1, justifyContent: 'center', padding: spacing.lg },
  modal: { backgroundColor: colors.surface, borderRadius: radius.lg, padding: spacing.lg, width: '100%' },
  doneButton: { alignItems: 'center', alignSelf: 'flex-end', justifyContent: 'center', minHeight: 44, paddingHorizontal: spacing.lg },
  doneText: { color: colors.primary, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
});
