import { ChevronDown, Paperclip } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme/tokens';

export function SelectField({ icon: Icon, value, detail, onPress }: { icon: LucideIcon; value: string; detail?: string; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.select, pressed && styles.pressed]}>
      <View style={styles.iconTile}><Icon color={colors.primary} size={22} /></View>
      <View style={styles.selectCopy}>
        <Text style={styles.selectValue}>{value}</Text>
        {detail ? <Text style={styles.selectDetail}>{detail}</Text> : null}
      </View>
      <ChevronDown color={colors.textSecondary} size={21} />
    </Pressable>
  );
}

export function TextAreaField({ value, onChangeText, placeholder, maxLength = 300 }: { value: string; onChangeText: (value: string) => void; placeholder: string; maxLength?: number }) {
  return (
    <View style={styles.textAreaWrap}>
      <TextInput
        maxLength={maxLength}
        multiline
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textPlaceholder}
        style={styles.textArea}
        textAlignVertical="top"
        value={value}
      />
      <Text style={styles.counter}>{value.length} / {maxLength}</Text>
    </View>
  );
}

export function AttachmentField({ onPress }: { onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.attachment, pressed && styles.pressed]}>
      <View style={[styles.iconTile, styles.attachmentIcon]}><Paperclip color={colors.textSecondary} size={23} /></View>
      <View style={styles.selectCopy}>
        <Text style={styles.selectValue}>Thêm hình ảnh hoặc tài liệu</Text>
        <Text style={styles.selectDetail}>PNG, JPG hoặc PDF · Tối đa 10 MB</Text>
      </View>
    </Pressable>
  );
}

type Tone = 'primary' | 'success' | 'warning';

export function SummaryCard({ icon: Icon, tone, title, value, detail }: { icon: LucideIcon; tone: Tone; title: string; value: string; detail: string }) {
  const palette = summaryPalette[tone];
  return (
    <View style={[styles.summary, { backgroundColor: palette.background }]}>
      <Icon color={palette.color} size={23} />
      <View style={styles.summaryCopy}>
        <Text style={styles.summaryTitle}>{title}</Text>
        <Text style={[styles.summaryValue, { color: palette.color }]}>{value}</Text>
      </View>
      <Text style={styles.summaryDetail}>{detail}</Text>
    </View>
  );
}

export function DurationChip({ label }: { label: string }) {
  return <View style={styles.chip}><Text style={styles.chipText}>{label}</Text></View>;
}

const summaryPalette = {
  primary: { background: colors.primarySoft, color: colors.primary },
  success: { background: colors.successSoft, color: colors.success },
  warning: { background: colors.warningSoft, color: colors.warning },
};

const styles = StyleSheet.create({
  select: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: 58, padding: spacing.md },
  iconTile: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 40, justifyContent: 'center', width: 40 },
  selectCopy: { flex: 1, gap: 2 },
  selectValue: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.semibold },
  selectDetail: { color: colors.textSecondary, fontSize: typography.sizes.body, lineHeight: typography.lineHeights.body },
  pressed: { opacity: 0.72 },
  textAreaWrap: { minHeight: 102 },
  textArea: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, color: colors.text, fontSize: typography.sizes.body, minHeight: 102, padding: spacing.lg, paddingBottom: spacing['2xl'] },
  counter: { bottom: spacing.md, color: colors.textSecondary, fontSize: typography.sizes.caption, position: 'absolute', right: spacing.lg },
  attachment: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderStyle: 'dashed', borderWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: 66, padding: spacing.md },
  attachmentIcon: { backgroundColor: colors.neutralSoft },
  summary: { alignItems: 'center', borderRadius: radius.lg, flexDirection: 'row', gap: spacing.md, minHeight: 70, padding: spacing.lg },
  summaryCopy: { flex: 1 },
  summaryTitle: { color: colors.textSecondary, fontSize: typography.sizes.body },
  summaryValue: { fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.bold, marginTop: 2 },
  summaryDetail: { color: colors.textSecondary, fontSize: typography.sizes.body, textAlign: 'right' },
  chip: { alignSelf: 'flex-start', backgroundColor: colors.primarySoft, borderRadius: radius.full, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  chipText: { color: colors.primary, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
});
