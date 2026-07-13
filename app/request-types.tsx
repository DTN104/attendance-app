import { router } from 'expo-router';
import { CalendarDays, ChevronRight, Clock3, FilePenLine, Plane, ShieldCheck, X } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RequestTypeId, requestTypes } from '@/data/requests';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const icons = { adjustment: FilePenLine, business: Plane, leave: CalendarDays, overtime: Clock3 } satisfies Record<RequestTypeId, typeof CalendarDays>;
const routes = {
  adjustment: '/adjustment-request',
  business: '/business-trip-request',
  leave: '/leave-request',
  overtime: '/overtime-request',
} as const satisfies Record<RequestTypeId, string>;

export default function RequestTypesScreen() {
  const close = () => router.canGoBack() ? router.back() : router.replace('/requests');

  return (
    <SafeAreaView edges={['bottom']} style={styles.overlay}>
      <Pressable accessibilityLabel="Đóng" accessibilityRole="button" onPress={close} style={StyleSheet.absoluteFill} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <View style={styles.header}>
          <View>
            <Text style={styles.heading}>Tạo đơn mới</Text>
            <Text style={styles.subtitle}>Chọn loại đơn bạn muốn tạo</Text>
          </View>
          <Pressable accessibilityLabel="Đóng" accessibilityRole="button" onPress={close} style={({ pressed }) => [styles.close, pressed && styles.pressed]}>
            <X color={colors.textSecondary} size={21} />
          </Pressable>
        </View>

        <View style={styles.list}>
          {requestTypes.map((item) => {
            const Icon = icons[item.id];
            return (
              <Pressable
                accessibilityRole="button"
                key={item.id}
                onPress={() => router.replace(routes[item.id])}
                style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
                <View style={styles.icon}><Icon color={colors.primary} size={23} /></View>
                <View style={styles.copy}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                </View>
                <ChevronRight color={colors.textSecondary} size={20} />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.note}>
          <ShieldCheck color={colors.primary} size={19} />
          <Text style={styles.noteText}>Đơn của bạn sẽ được gửi đến quản lý trực tiếp để xét duyệt.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: colors.overlay, flex: 1, justifyContent: 'flex-end' },
  sheet: { backgroundColor: colors.surface, borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, padding: spacing.xl, paddingBottom: spacing.lg },
  handle: { alignSelf: 'center', backgroundColor: colors.border, borderRadius: radius.full, height: 4, marginBottom: spacing.lg, width: 42 },
  header: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xl },
  heading: { color: colors.text, fontSize: typography.sizes.formTitle, fontWeight: typography.weights.bold, lineHeight: typography.lineHeights.formTitle },
  subtitle: { color: colors.textSecondary, fontSize: typography.sizes.body, marginTop: spacing.xs },
  close: { alignItems: 'center', backgroundColor: colors.neutralSoft, borderRadius: radius.full, height: 38, justifyContent: 'center', width: 38 },
  list: { gap: spacing.sm },
  card: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: 72, padding: spacing.md },
  icon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 44, justifyContent: 'center', width: 44 },
  copy: { flex: 1, gap: 2 },
  title: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.bold },
  description: { color: colors.textSecondary, fontSize: typography.sizes.caption, lineHeight: typography.lineHeights.caption },
  pressed: { opacity: 0.7 },
  note: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg, padding: spacing.md },
  noteText: { color: colors.textSecondary, flex: 1, fontSize: typography.sizes.caption, lineHeight: typography.lineHeights.caption },
});
