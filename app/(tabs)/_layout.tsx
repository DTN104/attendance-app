import { Tabs } from 'expo-router';
import { CalendarDays, ClipboardList, Clock3, House, UserRound } from 'lucide-react-native';
import React from 'react';

import { BottomTabIcon } from '@/components/ui/BottomTabIcon';
import { colors, typography } from '@/theme/tokens';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: typography.family,
          fontSize: 11,
          fontWeight: typography.weights.medium,
          lineHeight: 17,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 74,
          paddingBottom: 8,
          paddingTop: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tổng quan',
          tabBarIcon: (props) => <BottomTabIcon icon={House} {...props} />,
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: 'Chấm công',
          tabBarIcon: (props) => <BottomTabIcon icon={Clock3} {...props} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Lịch sử',
          tabBarIcon: (props) => <BottomTabIcon icon={CalendarDays} {...props} />,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'Đơn từ',
          tabBarIcon: (props) => <BottomTabIcon icon={ClipboardList} {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Cá nhân',
          tabBarIcon: (props) => <BottomTabIcon icon={UserRound} {...props} />,
        }}
      />
    </Tabs>
  );
}
