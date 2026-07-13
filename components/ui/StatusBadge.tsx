import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme/tokens';

type Variant = 'success' | 'warning' | 'danger';
type Props = { label: string; variant?: Variant };

const palette = {
  success: { backgroundColor: colors.successSoft, color: colors.success },
  warning: { backgroundColor: colors.warningSoft, color: colors.warning },
  danger: { backgroundColor: colors.dangerSoft, color: colors.danger },
};

export function StatusBadge({ label, variant = 'success' }: Props) {
  return (
    <View style={[styles.badge, { backgroundColor: palette[variant].backgroundColor }]}>
      <View style={[styles.dot, { backgroundColor: palette[variant].color }]} />
      <Text style={[styles.label, { color: palette[variant].color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: radius.full,
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  dot: { borderRadius: radius.full, height: 6, width: 6 },
  label: {
    fontFamily: typography.family,
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.lineHeights.caption,
  },
});

