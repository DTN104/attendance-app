import { Bell, ChevronRight, CircleHelp, LogOut, ShieldCheck, UserRound } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { employee } from '@/data/attendance';
import { ProfileMenuId, profileDetails, profileMenu, profileStats } from '@/data/profile';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const menuIcons = { info: UserRound, notifications: Bell, security: ShieldCheck, help: CircleHelp, logout: LogOut } satisfies Record<ProfileMenuId, typeof UserRound>;

export default function ProfileScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Cá nhân" />

        <View style={styles.identity}>
          <View style={styles.avatar}><Text style={styles.initials}>{employee.initials}</Text></View>
          <Text style={styles.name}>{employee.name}</Text>
          <Text style={styles.role}>{employee.role}</Text>
        </View>

        <View style={styles.stats}>
          {profileStats.map((item) => (
            <AppCard key={item.label} style={styles.statCard}>
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </AppCard>
          ))}
        </View>

        <AppCard style={styles.detailsCard}>
          {profileDetails.map((item, index) => (
            <View key={item.label} style={[styles.detail, index > 0 && styles.border]}>
              <Text style={styles.detailLabel}>{item.label}</Text>
              <Text style={styles.detailValue}>{item.value}</Text>
            </View>
          ))}
        </AppCard>

        <AppCard style={styles.menuCard}>
          {profileMenu.map((item, index) => {
            const Icon = menuIcons[item.id];
            const isLogout = item.id === 'logout';
            return (
              <View key={item.id} style={[styles.menuItem, index > 0 && styles.border]}>
                <View style={[styles.menuIcon, isLogout && styles.logoutIcon]}>
                  <Icon color={isLogout ? colors.danger : colors.primary} size={20} />
                </View>
                <View style={styles.menuCopy}>
                  <Text style={[styles.menuLabel, isLogout && styles.logoutText]}>{item.label}</Text>
                  {item.description ? <Text style={styles.menuDescription}>{item.description}</Text> : null}
                </View>
                {!isLogout ? <ChevronRight color={colors.textSecondary} size={19} /> : null}
              </View>
            );
          })}
        </AppCard>

        <Text style={styles.version}>Phiên bản 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  identity: { alignItems: 'center', paddingVertical: spacing.md },
  avatar: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.full, height: 84, justifyContent: 'center', marginBottom: spacing.md, width: 84 },
  initials: { color: colors.white, fontSize: typography.sizes.display, fontWeight: typography.weights.bold },
  name: { color: colors.text, fontSize: typography.sizes.title, fontWeight: typography.weights.bold },
  role: { color: colors.textSecondary, fontSize: typography.sizes.body, marginTop: spacing.xs },
  stats: { flexDirection: 'row', gap: spacing.md },
  statCard: { alignItems: 'center', flex: 1 },
  statValue: { color: colors.primary, fontSize: typography.sizes.display, fontWeight: typography.weights.bold },
  statLabel: { color: colors.textSecondary, fontSize: typography.sizes.caption, marginTop: spacing.xs, textAlign: 'center' },
  detailsCard: { paddingVertical: 0 },
  detail: { flexDirection: 'row', justifyContent: 'space-between', minHeight: 52, alignItems: 'center' },
  border: { borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth },
  detailLabel: { color: colors.textSecondary, fontSize: typography.sizes.body },
  detailValue: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  menuCard: { paddingVertical: 0 },
  menuItem: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, minHeight: 68 },
  menuIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 40, justifyContent: 'center', width: 40 },
  logoutIcon: { backgroundColor: colors.dangerSoft },
  menuCopy: { flex: 1 },
  menuLabel: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  logoutText: { color: colors.danger },
  menuDescription: { color: colors.textSecondary, fontSize: typography.sizes.caption, marginTop: spacing.xs },
  version: { color: colors.textSecondary, fontSize: typography.sizes.caption, textAlign: 'center' },
});
