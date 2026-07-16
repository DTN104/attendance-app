import { Building2, ScanFace } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { employee, today } from '@/data/attendance';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function AttendanceScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          right={<UserAvatar initials={employee.initials} />}
          subtitle="Xác nhận vị trí và ca làm việc"
          title="Chấm công"
        />

        <View style={styles.mapCard}>
          {[1, 2, 3, 4, 5].map((line) => <View key={line} style={[styles.mapLine, { top: line * 38 }]} />)}
          <View style={styles.locationPulse}>
            <View style={styles.locationDot} />
          </View>
          <View style={styles.locationStatus}>
            <Text style={styles.locationStatusText}>{today.location}</Text>
          </View>
        </View>

        <AppCard style={styles.shiftCard}>
          <View style={styles.shiftIcon}><Building2 color={colors.text} size={22} /></View>
          <View style={styles.shiftCopy}>
            <Text style={styles.shiftName}>Ca hành chính</Text>
            <Text style={styles.shiftTime}>08:30 – 17:30</Text>
          </View>
          <StatusBadge label="Đang hoạt động" />
        </AppCard>

        <View style={styles.verification}>
          <Text style={styles.sectionTitle}>Ảnh xác thực</Text>
          <View style={styles.cameraArea}>
            <View style={styles.faceIcon}><ScanFace color={colors.text} size={34} /></View>
            <Text style={styles.cameraHint}>Đưa khuôn mặt vào khung</Text>
          </View>
        </View>

        <PrimaryButton label="Check-in ngay" onPress={() => {}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  mapCard: { backgroundColor: colors.mapSurface, borderRadius: radius.xl, height: 230, overflow: 'hidden' },
  mapLine: { backgroundColor: colors.mapRule, height: 1, left: 0, position: 'absolute', right: 0 },
  locationPulse: { alignItems: 'center', alignSelf: 'center', backgroundColor: colors.primaryRing, borderRadius: radius.full, height: 96, justifyContent: 'center', marginTop: 56, width: 96 },
  locationDot: { backgroundColor: colors.surface, borderColor: colors.primary, borderRadius: radius.full, borderWidth: 9, height: 28, width: 28 },
  locationStatus: { alignItems: 'center', alignSelf: 'center', backgroundColor: colors.successSoft, borderRadius: radius.full, bottom: spacing.sm, minWidth: '60%', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, position: 'absolute' },
  locationStatusText: { color: colors.success, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  shiftCard: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, minHeight: 104, padding: spacing.md },
  shiftIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 44, justifyContent: 'center', width: 44 },
  shiftCopy: { flex: 1 },
  shiftName: { color: colors.text, fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.semibold },
  shiftTime: { color: colors.textSecondary, fontSize: typography.sizes.body, marginTop: spacing.xs },
  verification: { gap: spacing.md },
  sectionTitle: { color: colors.text, fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.bold },
  cameraArea: { alignItems: 'center', backgroundColor: colors.neutralSoft, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, justifyContent: 'center', minHeight: 112 },
  faceIcon: { alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.full, height: 64, justifyContent: 'center', width: 64 },
  cameraHint: { color: colors.textSecondary, fontSize: typography.sizes.body },
});
