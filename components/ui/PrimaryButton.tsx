import { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme/tokens';

type Props = { label: string; onPress?: () => void; icon?: LucideIcon; disabled?: boolean };

export function PrimaryButton({ label, onPress, icon: Icon, disabled }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}>
      {Icon ? <Icon color={colors.white} size={20} strokeWidth={2.2} /> : null}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    flexDirection: 'row',
    gap: spacing.sm,
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: spacing.xl,
  },
  pressed: { backgroundColor: colors.primaryDark },
  disabled: { opacity: 0.5 },
  label: {
    color: colors.white,
    fontFamily: typography.family,
    fontSize: typography.sizes.label,
    fontWeight: typography.weights.semibold,
  },
});

