import { Clock3, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useAuth } from '@/context/AuthContext';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { LoginErrors, validateLogin } from '@/utils/login';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    const nextErrors = validateLogin(email, password);
    setErrors(nextErrors);
    if (!nextErrors.email && !nextErrors.password) signIn();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.brand}>
              <View style={styles.brandMark}>
                <Clock3 color={colors.white} size={32} strokeWidth={2.4} />
              </View>
              <Text style={styles.brandName}>Chấm công</Text>
            </View>

            <View>
              <Text style={styles.title}>Chào mừng trở lại</Text>
              <Text style={styles.subtitle}>Đăng nhập bằng tài khoản công ty để tiếp tục.</Text>
            </View>

            <View style={styles.form}>
              <LoginField
                autoCapitalize="none"
                autoComplete="email"
                error={errors.email}
                icon={Mail}
                keyboardType="email-address"
                label="Email"
                onChangeText={(value) => {
                  setEmail(value);
                  if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
                }}
                placeholder="tenban@company.vn"
                returnKeyType="next"
                textContentType="emailAddress"
                value={email}
              />

              <LoginField
                autoCapitalize="none"
                autoComplete="password"
                error={errors.password}
                icon={LockKeyhole}
                label="Mật khẩu"
                onChangeText={(value) => {
                  setPassword(value);
                  if (errors.password) setErrors((current) => ({ ...current, password: undefined }));
                }}
                onSubmitEditing={handleSubmit}
                placeholder="Nhập mật khẩu"
                returnKeyType="done"
                secureTextEntry={!showPassword}
                textContentType="password"
                value={password}
                trailing={
                  <Pressable
                    accessibilityLabel={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    accessibilityRole="button"
                    hitSlop={10}
                    onPress={() => setShowPassword((visible) => !visible)}>
                    {showPassword ? (
                      <EyeOff color={colors.textSecondary} size={20} />
                    ) : (
                      <Eye color={colors.textSecondary} size={20} />
                    )}
                  </Pressable>
                }
              />

              <PrimaryButton label="ĐĂNG NHẬP" onPress={handleSubmit} />
            </View>

            <View style={styles.securityNote}>
              <ShieldCheck color={colors.success} size={18} />
              <Text style={styles.securityText}>Thông tin đăng nhập được bảo vệ an toàn.</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type LoginFieldProps = TextInputProps & {
  error?: string;
  icon: typeof Mail;
  label: string;
  trailing?: React.ReactNode;
};

function LoginField({ error, icon: Icon, label, trailing, ...inputProps }: LoginFieldProps) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputShell, error && styles.inputError]}>
        <Icon color={error ? colors.danger : colors.textSecondary} size={20} />
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={colors.textPlaceholder}
          style={styles.input}
          {...inputProps}
        />
        {trailing}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { backgroundColor: colors.background, flex: 1 },
  scrollContent: { alignItems: 'center', flexGrow: 1, justifyContent: 'center', paddingHorizontal: spacing.xl, paddingVertical: spacing.xl },
  content: { alignSelf: 'stretch', gap: spacing['2xl'], maxWidth: 440 },
  brand: { alignItems: 'center', gap: spacing.md },
  brandMark: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  brandName: { color: colors.primary, fontSize: typography.sizes.label, fontWeight: typography.weights.bold },
  title: {
    color: colors.text,
    fontFamily: typography.family,
    fontSize: typography.sizes.display,
    fontWeight: typography.weights.bold,
    lineHeight: typography.lineHeights.display,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontFamily: typography.family,
    fontSize: typography.sizes.body,
    lineHeight: typography.lineHeights.body,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  form: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.lg,
    padding: spacing.xl,
  },
  fieldGroup: { gap: spacing.sm },
  label: {
    color: colors.text,
    fontFamily: typography.family,
    fontSize: typography.sizes.label,
    fontWeight: typography.weights.semibold,
  },
  inputShell: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    minHeight: 58,
    paddingHorizontal: spacing.lg,
  },
  inputError: { borderColor: colors.danger },
  input: {
    color: colors.text,
    flex: 1,
    fontFamily: typography.family,
    fontSize: typography.sizes.label,
    minHeight: 56,
    minWidth: 0,
    paddingVertical: 0,
  },
  errorText: { color: colors.danger, fontSize: typography.sizes.caption },
  securityNote: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, justifyContent: 'center' },
  securityText: { color: colors.textSecondary, fontSize: typography.sizes.caption },
});
