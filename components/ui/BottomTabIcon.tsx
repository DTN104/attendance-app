import { LucideIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/theme/tokens';

type Props = { icon: LucideIcon; color: string; focused: boolean };

export function BottomTabIcon({ icon: Icon, color, focused }: Props) {
  return (
    <View style={[styles.container, focused && styles.focused]}>
      <Icon color={color} size={22} strokeWidth={focused ? 2.5 : 2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: 6 },
  focused: { backgroundColor: colors.primarySoft },
});

