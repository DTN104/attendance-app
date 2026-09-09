import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { useEmployeeData } from '@/context/EmployeeDataContext';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { getInitials } from '@/utils/person';

const roleLabels = { employee: 'Nhân viên', manager: 'Quản lý' } as const;

type Row = { label: string; value: string };

function DetailCard({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <AppCard style={styles.card}>
        {rows.map((row, index) => (
          <View key={row.label} style={[styles.row, index > 0 && styles.border]}>
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={styles.rowValue} numberOfLines={2}>{row.value}</Text>
          </View>
        ))}
      </AppCard>
    </View>
  );
}

export default function ProfileDetailScreen() {
  const { isLoading, profile } = useEmployeeData();

  const back = (
    <Pressable
      accessibilityLabel="Quay lại"
      accessibilityRole="button"
      hitSlop={10}
      onPress={() => router.back()}
      style={({ pressed }) => [styles.back, pressed && styles.pressed]}>
      <ArrowLeft color={colors.text} size={22} />
    </Pressable>
  );

  if (!profile) {
    return (
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.content}>
          <ScreenHeader left={back} title="Thông tin cá nhân" />
          <Text style={styles.empty}>
            {isLoading ? 'Đang tải thông tin...' : 'Chưa tải được thông tin. Vui lòng thử lại.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader left={back} title="Thông tin cá nhân" />

        <View style={styles.identity}>
          <UserAvatar initials={getInitials(profile.name)} size={84} />
          <Text style={styles.name}>{profile.name}</Text>
          <View style={styles.employeeCode}>
            <Text style={styles.employeeCodeText}>Mã NV: {profile.employeeCode}</Text>
          </View>
        </View>

        <DetailCard
          rows={[
            { label: 'Họ và tên', value: profile.name },
            { label: 'Chức danh', value: profile.jobTitle },
            { label: 'Phòng ban', value: profile.department },
            { label: 'Công ty', value: profile.company },
            { label: 'Vai trò', value: roleLabels[profile.role] },
          ]}
          title="Thông tin nhân sự"
        />

        <DetailCard
          rows={[
            { label: 'Email', value: profile.email },
            { label: 'Quản lý trực tiếp', value: profile.manager?.name ?? 'Chưa phân công' },
          ]}
          title="Liên hệ"
        />

        <Text style={styles.note}>
          Thông tin do bộ phận nhân sự quản lý. Liên hệ quản lý trực tiếp nếu cần điều chỉnh.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  back: { alignItems: 'center', height: 32, justifyContent: 'center', width: 32 },
  pressed: { opacity: 0.65 },
  identity: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  name: {
    color: colors.text,
    fontFamily: typography.family,
    fontSize: typography.sizes.formTitle,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.formTitle,
  },
  employeeCode: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
  },
  employeeCodeText: {
    color: colors.primary,
    fontFamily: typography.family,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
  },
  section: { gap: spacing.md },
  sectionTitle: {
    color: colors.text,
    fontFamily: typography.family,
    fontSize: typography.sizes.sectionTitle,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.sectionTitle,
  },
  card: { paddingVertical: 0 },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.lg,
    justifyContent: 'space-between',
    minHeight: 52,
    paddingVertical: spacing.sm,
  },
  border: { borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth },
  rowLabel: {
    color: colors.textSecondary,
    fontFamily: typography.family,
    fontSize: typography.sizes.body,
  },
  rowValue: {
    color: colors.text,
    flexShrink: 1,
    fontFamily: typography.family,
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    textAlign: 'right',
  },
  note: {
    color: colors.textSecondary,
    fontFamily: typography.family,
    fontSize: typography.sizes.caption,
    lineHeight: typography.lineHeights.caption,
    textAlign: 'center',
  },
  empty: {
    color: colors.textSecondary,
    fontFamily: typography.family,
    fontSize: typography.sizes.body,
    marginTop: spacing.xl,
    textAlign: 'center',
  },
});
