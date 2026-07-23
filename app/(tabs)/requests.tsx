import { router } from 'expo-router';
import { CalendarDays, ChevronRight, Clock3, FilePenLine, Plane, Plus } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { useRequests } from '@/context/RequestsContext';
import { employee } from '@/data/attendance';
import { requestTypes } from '@/data/requests';
import type { RequestStatus, RequestTypeId } from '@/data/requests';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const status: Record<RequestStatus, { label: string; variant: 'neutral' | 'success' | 'warning' | 'danger' }> = {
  draft: { label: 'Bản nháp', variant: 'neutral' },
  pending: { label: 'Chờ duyệt', variant: 'warning' },
  approved: { label: 'Đã duyệt', variant: 'success' },
  rejected: { label: 'Từ chối', variant: 'danger' },
};
const icons = { adjustment: FilePenLine, business: Plane, leave: CalendarDays, overtime: Clock3 } satisfies Record<RequestTypeId, typeof CalendarDays>;
const routes = {
  adjustment: '/adjustment-request',
  business: '/business-trip-request',
  leave: '/leave-request',
  overtime: '/overtime-request',
} as const satisfies Record<RequestTypeId, string>;
const iconTones = {
  adjustment: colors.dangerSoft,
  business: colors.primarySoft,
  leave: colors.successSoft,
  overtime: colors.warningSoft,
} satisfies Record<RequestTypeId, string>;

export default function RequestsScreen() {
  const { requests } = useRequests();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          right={<UserAvatar initials={employee.initials} />}
          subtitle="Tạo và theo dõi các yêu cầu"
          title="Đơn từ"
        />
        <PrimaryButton icon={Plus} label="Tạo đơn mới" onPress={() => router.push('/request-types')} />

        <Text style={styles.sectionTitle}>Loại đơn</Text>
        <View style={styles.typeList}>
          {requestTypes.map((item) => {
            const Icon = icons[item.id];
            return (
              <Pressable
                accessibilityRole="button"
                key={item.id}
                onPress={() => router.push(routes[item.id])}
                style={({ pressed }) => [styles.typeCard, pressed && styles.pressed]}>
                <View style={[styles.typeIcon, { backgroundColor: iconTones[item.id] }]}><Icon color={colors.text} size={22} /></View>
                <View style={styles.typeCopy}>
                  <Text style={styles.typeTitle}>{item.title}</Text>
                  <Text style={styles.typeDescription}>{item.description}</Text>
                </View>
                <ChevronRight color={colors.textSecondary} size={20} />
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Đơn gần đây</Text>

        <View style={styles.list}>
          {requests.slice(0, 2).map((item) => {
            return (
              <Pressable accessibilityRole="button" key={item.id} onPress={() => router.push({ pathname: '/request-detail', params: { id: item.id } })} style={({ pressed }) => pressed && styles.pressed}>
                <AppCard style={styles.requestCard}>
                  <View style={styles.requestCopy}>
                    <Text style={styles.requestTitle}>{item.title}</Text>
                    <Text style={styles.period}>{item.period}</Text>
                  </View>
                  <StatusBadge label={status[item.status].label} variant={status[item.status].variant} />
                </AppCard>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  sectionTitle: { color: colors.text, fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.bold },
  typeList: { gap: spacing.sm },
  typeCard: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flexDirection: 'row', gap: spacing.md, minHeight: 62, padding: spacing.md },
  typeIcon: { alignItems: 'center', borderRadius: radius.md, height: 42, justifyContent: 'center', width: 42 },
  typeCopy: { flex: 1 },
  typeTitle: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.semibold },
  typeDescription: { color: colors.textSecondary, fontSize: typography.sizes.caption, marginTop: 2 },
  list: { gap: spacing.md },
  pressed: { opacity: 0.72 },
  requestCard: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, minHeight: 72 },
  requestCopy: { flex: 1, gap: spacing.xs },
  requestTitle: { color: colors.text, flex: 1, fontSize: typography.sizes.body, fontWeight: typography.weights.bold },
  period: { color: colors.textSecondary, fontSize: typography.sizes.caption, lineHeight: typography.lineHeights.caption },
});
