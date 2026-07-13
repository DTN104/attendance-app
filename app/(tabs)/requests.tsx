import { router } from 'expo-router';
import { BriefcaseBusiness, CalendarDays, ChevronRight, Clock3, FilePenLine, Plus } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useRequests } from '@/context/RequestsContext';
import type { RequestStatus, RequestTypeId } from '@/data/requests';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const status: Record<RequestStatus, { label: string; variant: 'success' | 'warning' | 'danger' }> = {
  pending: { label: 'Chờ duyệt', variant: 'warning' },
  approved: { label: 'Đã duyệt', variant: 'success' },
  rejected: { label: 'Từ chối', variant: 'danger' },
};
const icons = { adjustment: FilePenLine, business: BriefcaseBusiness, leave: CalendarDays, overtime: Clock3 } satisfies Record<RequestTypeId, typeof CalendarDays>;

export default function RequestsScreen() {
  const { requests } = useRequests();
  const summary = [
    { label: 'Chờ duyệt', value: requests.filter((item) => item.status === 'pending').length },
    { label: 'Đã duyệt', value: requests.filter((item) => item.status === 'approved').length },
    { label: 'Từ chối', value: requests.filter((item) => item.status === 'rejected').length },
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Đơn từ" subtitle="Quản lý các yêu cầu của bạn" />
        <PrimaryButton icon={Plus} label="Tạo đơn mới" onPress={() => router.push('/request-types')} />

        <View style={styles.summary}>
          {summary.map((item) => (
            <View key={item.label} style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{String(item.value).padStart(2, '0')}</Text>
              <Text style={styles.summaryLabel}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Đơn gần đây</Text>
          <Text style={styles.filter}>Tất cả</Text>
        </View>

        <View style={styles.list}>
          {requests.map((item) => {
            const Icon = icons[item.type];
            return (
              <Pressable accessibilityRole="button" key={item.id} onPress={() => router.push({ pathname: '/request-detail', params: { id: item.id } })} style={({ pressed }) => pressed && styles.pressed}>
                <AppCard style={styles.requestCard}>
                  <View style={styles.requestIcon}><Icon color={colors.primary} size={20} /></View>
                  <View style={styles.requestCopy}>
                    <View style={styles.requestTop}>
                      <Text style={styles.requestTitle}>{item.title}</Text>
                      <StatusBadge label={status[item.status].label} variant={status[item.status].variant} />
                    </View>
                    <Text style={styles.period}>{item.period}</Text>
                    <Text style={styles.submitted}>{item.submittedAt} · {item.id}</Text>
                  </View>
                  <ChevronRight color={colors.textSecondary} size={19} />
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
  summary: { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: StyleSheet.hairlineWidth, flexDirection: 'row', paddingVertical: spacing.lg },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryValue: { color: colors.primary, fontSize: typography.sizes.title, fontWeight: typography.weights.bold },
  summaryLabel: { color: colors.textSecondary, fontSize: 11, marginTop: spacing.xs },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: typography.weights.bold },
  filter: { color: colors.primary, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  list: { gap: spacing.md },
  pressed: { opacity: 0.72 },
  requestCard: { alignItems: 'center', flexDirection: 'row', gap: spacing.md },
  requestIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 44, justifyContent: 'center', width: 44 },
  requestCopy: { flex: 1, gap: spacing.xs },
  requestTop: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, justifyContent: 'space-between' },
  requestTitle: { color: colors.text, flex: 1, fontSize: typography.sizes.body, fontWeight: typography.weights.bold },
  period: { color: colors.text, fontSize: typography.sizes.caption, lineHeight: typography.lineHeights.caption },
  submitted: { color: colors.textSecondary, fontSize: 10, lineHeight: 14 },
});
