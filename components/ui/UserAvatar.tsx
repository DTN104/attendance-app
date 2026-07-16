import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, typography } from '@/theme/tokens';

type Props = { initials: string; size?: number };

export function UserAvatar({ initials, size = 42 }: Props) {
  return (
    <View style={[styles.avatar, { height: size, width: size }]}>
      <Text style={[styles.initials, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { alignItems: 'center', backgroundColor: colors.avatarSurface, borderRadius: radius.full, justifyContent: 'center' },
  initials: { color: colors.primaryDark, fontFamily: typography.family, fontWeight: typography.weights.bold },
});
