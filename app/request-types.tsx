import { router } from 'expo-router';
import { ArrowLeft, BriefcaseBusiness, ChevronRight, Clock3, FileClock, House, Umbrella } from 'lucide-react-native';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/ui/AppCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { RequestTypeId, requestTypes } from '@/data/requests';
import { colors, radius, spacing, typography } from '@/theme/tokens';

const icons = { leave: Umbrella, remote: House, 'late-early': Clock3, business: BriefcaseBusiness, adjustment: FileClock } satisfies Record<RequestTypeId, typeof Umbrella>;

export default function RequestTypesScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Tạo đơn mới"
          subtitle="Chọn loại đơn bạn muốn tạo"
          left={<BackButton />}
        />

        <View style={styles.list}>
          {requestTypes.map((item) => {
            const Icon = icons[item.id];
            return (
              <Pressable
                accessibilityRole="button"
                key={item.id}
                onPress={() => item.id === 'leave' ? router.push('/leave-request') : Alert.alert('Chưa khả dụng', 'Loại đơn này sẽ được hoàn thiện ở giai đoạn sau.')}
                style={({ pressed }) => pressed && styles.pressed}>
                <AppCard style={styles.card}>
                  <View style={styles.icon}><Icon color={colors.primary} size={23} /></View>
                  <View style={styles.copy}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                  <ChevronRight color={colors.textSecondary} size={20} />
                </AppCard>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BackButton() {
  return (
    <Pressable accessibilityLabel="Quay lại" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
      <ArrowLeft color={colors.text} size={22} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: colors.background, flex: 1 },
  content: { gap: spacing['2xl'], padding: spacing.xl, paddingBottom: spacing['3xl'] },
  back: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.full, borderWidth: StyleSheet.hairlineWidth, height: 42, justifyContent: 'center', width: 42 },
  list: { gap: spacing.md },
  pressed: { opacity: 0.72 },
  card: { alignItems: 'center', flexDirection: 'row', gap: spacing.md },
  icon: { alignItems: 'center', backgroundColor: colors.primarySoft, borderRadius: radius.md, height: 48, justifyContent: 'center', width: 48 },
  copy: { flex: 1, gap: spacing.xs },
  title: { color: colors.text, fontSize: typography.sizes.label, fontWeight: typography.weights.bold },
  description: { color: colors.textSecondary, fontSize: typography.sizes.caption, lineHeight: typography.lineHeights.caption },
});

