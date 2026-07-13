import { router } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors, radius, spacing, typography } from '@/theme/tokens';

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
  onDraft: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
};

export function RequestFormLayout({ title, subtitle, children, onDraft, onSubmit, submitDisabled }: Props) {
  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <View style={styles.header}>
          <ScreenHeader title={title} subtitle={subtitle} left={<BackButton />} />
        </View>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" onPress={onDraft} style={({ pressed }) => [styles.draftButton, pressed && styles.pressed]}>
            <Text style={styles.draftText}>LƯU NHÁP</Text>
          </Pressable>
          <Pressable accessibilityRole="button" disabled={submitDisabled} onPress={onSubmit} style={({ pressed }) => [styles.submitButton, pressed && styles.submitPressed, submitDisabled && styles.disabled]}>
            <Send color={colors.white} size={21} />
            <Text style={styles.submitText}>GỬI ĐƠN</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function FormSection({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
      {children}
    </View>
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
  flex: { flex: 1 },
  header: { paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  content: { gap: spacing.xl, padding: spacing.xl, paddingTop: spacing.md },
  section: { gap: spacing.sm },
  sectionHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  sectionLabel: { color: colors.text, fontSize: typography.sizes.sectionTitle, fontWeight: typography.weights.semibold, lineHeight: typography.lineHeights.sectionTitle },
  hint: { color: colors.textSecondary, fontSize: typography.sizes.body },
  backButton: { alignItems: 'center', backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  actions: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, flexDirection: 'row', gap: spacing.md, padding: spacing.xl, paddingVertical: spacing.lg },
  draftButton: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, justifyContent: 'center', minHeight: 54, paddingHorizontal: spacing.lg },
  draftText: { color: colors.text, fontSize: typography.sizes.button, fontWeight: typography.weights.semibold, lineHeight: typography.lineHeights.button },
  submitButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.lg, flex: 1, flexDirection: 'row', gap: spacing.sm, justifyContent: 'center', minHeight: 54 },
  submitPressed: { backgroundColor: colors.primaryDark },
  submitText: { color: colors.white, fontSize: typography.sizes.button, fontWeight: typography.weights.semibold, lineHeight: typography.lineHeights.button },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.5 },
});
