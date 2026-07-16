import { Bell, ChevronRight, CircleHelp, LogOut, ShieldCheck, UserRound } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { useAuth } from '@/context/AuthContext';
import { employee } from '@/data/attendance';
import { ProfileMenuId, profileDetails, profileMenu } from '@/data/profile';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const menuIcons = { info: UserRound, notifications: Bell, security: ShieldCheck, help: CircleHelp, logout: LogOut } satisfies Record<ProfileMenuId, typeof UserRound>;

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const settings = profileMenu.filter((item) => item.id !== 'logout');

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Cá nhân" />

        <View style={styles.identity}>
          <UserAvatar initials={employee.initials} size={100} />
          <Text style={styles.name}>{employee.name}</Text>
          <Text style={styles.role}>{employee.role}</Text>
          <View style={styles.employeeCode}><Text style={styles.employeeCodeText}>Mã NV: ACBS-0248</Text></View>
        </View>

        <AppCard style={styles.detailsCard}>
          {profileDetails.map((item, index) => (
            <View key={item.label} style={[styles.detail, index > 0 && styles.border]}>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </AppCard>

        <Text style={styles.sectionTitle}>Cài đặt</Text>
        <AppCard style={styles.menuCard}>
          {settings.map((item, index) => {
            const Icon = menuIcons[item.id];
            return (
              <View key={item.id} style={[styles.menuItem, index > 0 && styles.border]}>
                <Icon color={colors.text} size={22} />
                <View style={styles.menuCopy}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.description ? <Text style={styles.menuDescription}>{item.description}</Text> : null}
                </View>
                <ChevronRight color={colors.textSecondary} size={19} />
              </View>
            );
          })}
        </AppCard>

        <Pressable accessibilityRole="button" onPress={signOut} style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}>
          <LogOut color={colors.danger} size={20} />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  identity: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.md },
  name: { color: colors.text, fontSize: typography.sizes.title, fontWeight: typography.weights.bold },
  role: { color: colors.textSecondary, fontSize: typography.sizes.body },
  employeeCode: { backgroundColor: colors.primarySoft, borderRadius: radius.full, marginTop: spacing.sm, paddingHorizontal: spacing.xl, paddingVertical: spacing.sm },
  employeeCodeText: { color: colors.primary, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  detailsCard: { paddingVertical: 0 },
  detail: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', minHeight: 52 },
  border: { borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth },
  detailLabel: { color: colors.textSecondary, fontSize: typography.sizes.body },
  detailValue: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  sectionTitle: { color: colors.text, fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.bold },
  menuCard: { paddingVertical: 0 },
  menuItem: { alignItems: 'center', flexDirection: 'row', gap: spacing.lg, minHeight: 58 },
  menuCopy: { flex: 1 },
  menuLabel: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.medium },
  logoutText: { color: colors.danger },
  menuDescription: { color: colors.textSecondary, fontSize: typography.sizes.caption, marginTop: spacing.xs },
  pressed: { opacity: 0.65 },
  logoutButton: { alignItems: 'center', alignSelf: 'center', flexDirection: 'row', gap: spacing.sm, marginTop: spacing['3xl'], minHeight: 44, paddingHorizontal: spacing.lg },
});
