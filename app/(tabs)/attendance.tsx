import { Camera, Clock3, MapPin } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { today } from '@/data/attendance';
import { colors, radius, spacing, typography } from '@/theme/tokens';

export default function AttendanceScreen() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Chấm công" subtitle={today.label} />

        <View style={styles.clockBlock}>
          <Text style={styles.time}>{today.time}</Text>
          <Text style={styles.date}>Giờ hiện tại</Text>
          <StatusBadge label={today.status} />
        </View>

        <AppCard style={styles.locationCard}>
          <View style={styles.locationIcon}><MapPin color={colors.primary} size={22} /></View>
          <View style={styles.locationCopy}>
            <Text style={styles.locationTitle}>{today.location}</Text>
            <Text style={styles.address}>{today.address}</Text>
          </View>
          <StatusBadge label="Đúng vị trí" />
        </AppCard>

        <AppCard style={styles.workCard}>
          <Text style={styles.cardTitle}>Ca làm việc hôm nay</Text>
          <View style={styles.shiftRow}>
            <View style={styles.shiftIcon}><Clock3 color={colors.primary} size={20} /></View>
            <View style={styles.shiftCopy}>
              <Text style={styles.shiftName}>Ca hành chính</Text>
              <Text style={styles.shiftTime}>08:00 - 17:30</Text>
            </View>
            <Text style={styles.workTime}>{today.workTime}</Text>
          </View>
        </AppCard>

        <View style={styles.actionBlock}>
          <PrimaryButton icon={Camera} label="Chấm công ra" onPress={() => {}} />
          <Text style={styles.hint}>Ảnh và vị trí chỉ là dữ liệu mô phỏng trong giai đoạn này.</Text>
        </View>

        <View style={styles.summary}>
          <SummaryItem label="Giờ vào" value={today.checkIn} />
          <View style={styles.summaryDivider} />
          <SummaryItem label="Giờ ra" value={today.checkOut} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return <View style={styles.summaryItem}><Text style={styles.summaryLabel}>{label}</Text><Text style={styles.summaryValue}>{value}</Text></View>;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  clockBlock: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  time: { color: colors.text, fontSize: 52, fontWeight: typography.weights.bold, letterSpacing: -2, lineHeight: 60 },
  date: { color: colors.textSecondary, fontSize: typography.sizes.body },
  locationCard: { alignItems: 'center', flexDirection: 'row', gap: spacing.md },
  locationIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 44, justifyContent: 'center', width: 44 },
  locationCopy: { flex: 1 },
  locationTitle: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.semibold },
  address: { color: colors.textSecondary, fontSize: 11, lineHeight: 16, marginTop: spacing.xs },
  workCard: { gap: spacing.lg },
  cardTitle: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.bold },
  shiftRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.md },
  shiftIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.full, height: 40, justifyContent: 'center', width: 40 },
  shiftCopy: { flex: 1 },
  shiftName: { color: colors.text, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  shiftTime: { color: colors.textSecondary, fontSize: typography.sizes.caption, marginTop: spacing.xs },
  workTime: { color: colors.primary, fontSize: typography.sizes.caption, fontWeight: typography.weights.semibold },
  actionBlock: { gap: spacing.md, marginTop: spacing.sm },
  hint: { color: colors.textSecondary, fontSize: typography.sizes.caption, lineHeight: typography.lineHeights.caption, textAlign: 'center' },
  summary: { backgroundColor: colors.primarySoft, borderRadius: radius.lg, flexDirection: 'row', padding: spacing.lg },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryLabel: { color: colors.textSecondary, fontSize: typography.sizes.caption },
  summaryValue: { color: colors.primary, fontSize: typography.sizes.title, fontWeight: typography.weights.bold, marginTop: spacing.xs },
  summaryDivider: { backgroundColor: '#D8E0FF', width: StyleSheet.hairlineWidth },
});

