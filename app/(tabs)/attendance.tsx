import { useState } from 'react';
import { Building2, ExternalLink as ExternalLinkIcon, MapPin, ScanFace } from 'lucide-react-native';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { employee } from '@/data/attendance';
import { getCurrentLocation } from '@/services/location';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type CurrentLocation = Awaited<ReturnType<typeof getCurrentLocation>>;

export default function AttendanceScreen() {
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<CurrentLocation | null>(null);
  const locationStatus = location
    ? location.isWithinOffice ? 'Trong phạm vi văn phòng' : 'Ngoài phạm vi văn phòng'
    : 'Chưa xác định vị trí';

  const handleCheckIn = async () => {
    setIsLocating(true);
    try {
      setLocation(await getCurrentLocation());
    } catch (error) {
      Alert.alert(
        'Không lấy được vị trí',
        error instanceof Error ? error.message : 'Vui lòng thử lại.',
      );
    } finally {
      setIsLocating(false);
    }
  };

  const openMaps = async () => {
    if (!location) return;

    try {
      await Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`,
      );
    } catch {
      Alert.alert('Không mở được Maps', 'Vui lòng thử lại.');
    }
  };

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
          <View style={[
            styles.locationStatus,
            !location && styles.locationStatusNeutral,
            location && !location.isWithinOffice && styles.locationStatusOutside,
          ]}>
            <Text style={[
              styles.locationStatusText,
              !location && styles.locationStatusTextNeutral,
              location && !location.isWithinOffice && styles.locationStatusTextOutside,
            ]}>
              {locationStatus}
            </Text>
          </View>
        </View>

        {location ? (
          <AppCard style={styles.locationCard}>
            <View style={styles.locationHeading}>
              <View style={styles.locationIcon}>
                <MapPin color={colors.primary} size={21} />
              </View>
              <View style={styles.locationCopy}>
                <Text style={styles.locationTitle}>Vị trí hiện tại</Text>
                <Text style={styles.locationAddress}>{location.address}</Text>
              </View>
            </View>
            <View style={styles.locationFooter}>
              <Text style={styles.locationMeta}>
                Cách văn phòng {formatDistance(location.distanceMeters)} · Chính xác {formatAccuracy(location.accuracy)}
              </Text>
              <Pressable
                accessibilityLabel="Mở vị trí hiện tại trong Google Maps"
                accessibilityRole="button"
                onPress={openMaps}
                style={({ pressed }) => [styles.mapsButton, pressed && styles.pressed]}>
                <ExternalLinkIcon color={colors.primary} size={17} />
                <Text style={styles.mapsButtonText}>Mở Maps</Text>
              </Pressable>
            </View>
          </AppCard>
        ) : null}

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

        <PrimaryButton
          disabled={isLocating}
          label={isLocating ? 'Đang lấy vị trí...' : 'Check-in ngay'}
          onPress={handleCheckIn}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function formatDistance(distanceMeters: number) {
  return distanceMeters < 1_000
    ? `${Math.round(distanceMeters)} m`
    : `${(distanceMeters / 1_000).toFixed(1).replace('.', ',')} km`;
}

function formatAccuracy(accuracy: number | null) {
  return accuracy === null ? 'không rõ' : `±${Math.round(accuracy)} m`;
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing.xl, padding: spacing.xl, paddingBottom: spacing['3xl'] },
  mapCard: { backgroundColor: colors.mapSurface, borderRadius: radius.xl, height: 230, overflow: 'hidden' },
  mapLine: { backgroundColor: colors.mapRule, height: 1, left: 0, position: 'absolute', right: 0 },
  locationPulse: { alignItems: 'center', alignSelf: 'center', backgroundColor: colors.primaryRing, borderRadius: radius.full, height: 96, justifyContent: 'center', marginTop: 56, width: 96 },
  locationDot: { backgroundColor: colors.surface, borderColor: colors.primary, borderRadius: radius.full, borderWidth: 9, height: 28, width: 28 },
  locationStatus: { alignItems: 'center', alignSelf: 'center', backgroundColor: colors.successSoft, borderRadius: radius.full, bottom: spacing.sm, minWidth: '60%', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, position: 'absolute' },
  locationStatusNeutral: { backgroundColor: colors.neutralSoft },
  locationStatusOutside: { backgroundColor: colors.warningSoft },
  locationStatusText: { color: colors.success, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  locationStatusTextNeutral: { color: colors.textSecondary },
  locationStatusTextOutside: { color: colors.warning },
  locationCard: { gap: spacing.md },
  locationHeading: { alignItems: 'center', flexDirection: 'row', gap: spacing.md },
  locationIcon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 42, justifyContent: 'center', width: 42 },
  locationCopy: { flex: 1, gap: spacing.xs },
  locationTitle: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.semibold },
  locationAddress: { color: colors.textSecondary, fontSize: typography.sizes.body, lineHeight: typography.lineHeights.body },
  locationFooter: { alignItems: 'center', borderTopColor: colors.border, borderTopWidth: StyleSheet.hairlineWidth, flexDirection: 'row', gap: spacing.sm, paddingTop: spacing.md },
  locationMeta: { color: colors.textSecondary, flex: 1, fontSize: typography.sizes.caption, lineHeight: typography.lineHeights.caption },
  mapsButton: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, flexDirection: 'row', gap: spacing.xs, minHeight: 44, paddingHorizontal: spacing.md },
  mapsButtonText: { color: colors.primary, fontSize: typography.sizes.body, fontWeight: typography.weights.semibold },
  pressed: { opacity: 0.68 },
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
