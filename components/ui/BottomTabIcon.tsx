import { LucideIcon } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/theme/tokens';

type Props = { icon: LucideIcon; color: string; focused: boolean };

export function BottomTabIcon({ icon: Icon, focused }: Props) {
  return (
    <View style={styles.container}>
      {focused ? <View style={styles.indicator} /> : null}
      <Icon color={colors.text} size={24} strokeWidth={focused ? 2.5 : 2.2} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  indicator: { backgroundColor: colors.primary, borderRadius: radius.full, height: 2, position: 'absolute', top: -12, width: 16 },
});
