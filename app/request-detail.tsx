import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, BriefcaseBusiness, CalendarDays, CheckCircle2, Clock3, FilePenLine } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useRequests } from '@/context/RequestsContext';
import { getRequestRoute } from '@/data/requests';
import type { RequestStatus, RequestTypeId } from '@/data/requests';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const icons = { adjustment: FilePenLine, business: BriefcaseBusiness, leave: CalendarDays, overtime: Clock3 } satisfies Record<RequestTypeId, typeof CalendarDays>;
const statuses: Record<RequestStatus, { label: string; variant: 'neutral' | 'success' | 'warning' | 'danger'; message: string }> = {
  draft: { label: 'Bản nháp', variant: 'neutral', message: 'Chưa gửi đến quản lý trực tiếp' },
  pending: { label: 'Chờ duyệt', variant: 'warning', message: 'Đang chờ quản lý trực tiếp xét duyệt' },
  approved: { label: 'Đã duyệt', variant: 'success', message: 'Yêu cầu đã được quản lý phê duyệt' },
  rejected: { label: 'Từ chối', variant: 'danger', message: 'Yêu cầu chưa được phê duyệt' },
};

export default function RequestDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { requests } = useRequests();
  const request = requests.find((item) => item.id === id);

  if (!request) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Không tìm thấy đơn</Text>
          <Text style={styles.notFoundText}>Dữ liệu trong phiên này không còn khả dụng.</Text>
          <PrimaryButton label="Về danh sách đơn" onPress={() => router.replace('/requests')} />
        </View>
      </SafeAreaView>
    );
  }

  const Icon = icons[request.type];
  const status = statuses[request.status];

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader left={<BackButton />} subtitle={request.id} title="Chi tiết đơn" />

        <AppCard style={styles.hero}>
          <View style={styles.icon}><Icon color={colors.primary} size={25} /></View>
          <View style={styles.heroCopy}>
            <Text style={styles.title}>{request.title}</Text>
            <Text style={styles.period}>{request.period}</Text>
          </View>
          <View><StatusBadge label={status.label} variant={status.variant} /></View>
        </AppCard>

        <Text style={styles.sectionTitle}>Thông tin đơn</Text>
        <AppCard style={styles.detailsCard}>
          {request.details.map((detail, index) => (
            <View key={detail.label} style={[styles.detailRow, index > 0 && styles.rowBorder]}>
              <Text style={styles.detailLabel}>{detail.label}</Text>
              <Text style={styles.detailValue}>{detail.value}</Text>
            </View>
          ))}
          {request.attachment ? (
            <View style={[styles.detailRow, styles.rowBorder]}>
              <Text style={styles.detailLabel}>Đính kèm</Text>
              <Text style={styles.detailValue}>{request.attachment.name}</Text>
            </View>
          ) : null}
        </AppCard>

        <Text style={styles.sectionTitle}>{request.status === 'draft' ? 'Trạng thái' : 'Tiến trình xét duyệt'}</Text>
        <AppCard style={styles.timeline}>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineIcon, styles.doneIcon]}><CheckCircle2 color={colors.success} size={19} /></View>
            <View style={styles.timelineCopy}>
              <Text style={styles.timelineTitle}>{request.status === 'draft' ? 'Đã lưu nháp' : 'Đã tạo đơn'}</Text>
              <Text style={styles.timelineText}>{request.submittedAt}</Text>
            </View>
          </View>
          <View style={styles.timelineLine} />
          <View style={styles.timelineItem}>
            <View style={styles.timelineIcon}><Clock3 color={statuses[request.status].variant === 'danger' ? colors.danger : colors.primary} size={19} /></View>
            <View style={styles.timelineCopy}>
              <Text style={styles.timelineTitle}>{status.label}</Text>
              <Text style={styles.timelineText}>{status.message}</Text>
            </View>
          </View>
        </AppCard>

        {request.status === 'draft' ? (
          <View style={styles.draftActions}>
            <PrimaryButton
              label="Tiếp tục chỉnh sửa"
              onPress={() => router.replace(getRequestRoute(request))}
            />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function BackButton() {
  const goBack = () => router.canGoBack() ? router.back() : router.replace('/requests');
  return (
    <Pressable accessibilityLabel="Quay lại" accessibilityRole="button" onPress={goBack} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
      <ArrowLeft color={colors.text} size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  backButton: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  pressed: { opacity: 0.72 },
  hero: { alignItems: 'center', flexDirection: 'row', gap: spacing.md },
  icon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 48, justifyContent: 'center', width: 48 },
  heroCopy: { flex: 1, gap: spacing.xs },
  title: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.bold },
  period: { color: colors.textSecondary, fontSize: typography.sizes.caption, lineHeight: typography.lineHeights.caption },
  sectionTitle: { color: colors.text, fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.semibold },
  detailsCard: { paddingVertical: 0 },
  detailRow: { gap: spacing.sm, paddingVertical: spacing.lg },
  rowBorder: { borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth },
  detailLabel: { color: colors.textSecondary, fontSize: typography.sizes.caption },
  detailValue: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold, lineHeight: typography.lineHeights.body },
  timeline: { paddingVertical: spacing.lg },
  timelineItem: { alignItems: 'center', flexDirection: 'row', gap: spacing.md },
  timelineIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.full, height: 38, justifyContent: 'center', width: 38 },
  doneIcon: { backgroundColor: colors.successSoft },
  timelineCopy: { flex: 1, gap: 2 },
  timelineTitle: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  timelineText: { color: colors.textSecondary, fontSize: typography.sizes.caption, lineHeight: typography.lineHeights.caption },
  timelineLine: { backgroundColor: colors.border, height: spacing.lg, marginLeft: 18, width: 1 },
  draftActions: { gap: spacing.sm },
  notFound: { flex: 1, gap: spacing.md, justifyContent: 'center', padding: spacing.xl },
  notFoundTitle: { color: colors.text, fontSize: typography.sizes.formTitle, fontWeight: typography.weights.bold, textAlign: 'center' },
  notFoundText: { color: colors.textSecondary, fontSize: typography.sizes.body, marginBottom: spacing.md, textAlign: 'center' },
});
