import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { EmployeeDataProvider } from '@/context/EmployeeDataContext';
import { RequestsProvider } from '@/context/RequestsContext';
import { colors } from '@/theme/tokens';

export const unstable_settings = {
  anchor: 'login',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <EmployeeDataProvider>
        <RequestsProvider>
          <ThemeProvider value={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.background } }}>
            <AppNavigator />
            <StatusBar style="dark" />
          </ThemeProvider>
        </RequestsProvider>
      </EmployeeDataProvider>
    </AuthProvider>
  );
}

function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="login" />
      </Stack.Protected>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="adjustment-request" />
        <Stack.Screen name="business-trip-request" />
        <Stack.Screen name="leave-request" />
        <Stack.Screen name="modal" />
        <Stack.Screen name="overtime-request" />
        <Stack.Screen name="profile-detail" />
        <Stack.Screen name="request-detail" />
        <Stack.Screen
          name="request-types"
          options={{ animation: 'fade', contentStyle: { backgroundColor: 'transparent' }, presentation: 'transparentModal' }}
        />
      </Stack.Protected>
    </Stack>
  );
}
