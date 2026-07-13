import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, spacing, typography } from '@/theme/tokens';

type Props = { title: string; subtitle?: string; left?: ReactNode; right?: ReactNode };

export function ScreenHeader({ title, subtitle, left, right }: Props) {
  return (
    <View style={styles.container}>
      {left}
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, justifyContent: 'space-between' },
  copy: { flex: 1 },
  title: {
    color: colors.text,
    fontFamily: typography.family,
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.title,
  },
  subtitle: {
    color: colors.textSecondary,
    fontFamily: typography.family,
    fontSize: typography.sizes.body,
    lineHeight: typography.lineHeights.body,
    marginTop: spacing.xs,
  },
});
