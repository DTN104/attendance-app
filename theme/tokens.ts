import { Platform } from 'react-native';

export const colors = {
  primary: '#3157D5',
  primaryDark: '#2445B8',
  primarySoft: '#EEF2FF',
  background: '#F6F7FB',
  surface: '#FFFFFF',
  text: '#172033',
  textSecondary: '#6B7280',
  border: '#E6E9F0',
  success: '#1E9E63',
  successSoft: '#EAF8F1',
  warning: '#E49A23',
  warningSoft: '#FFF6E7',
  danger: '#DF4B4B',
  dangerSoft: '#FDEEEE',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;

export const typography = {
  family: Platform.select({ ios: 'System', android: 'sans-serif' }),
  sizes: { caption: 12, body: 14, label: 15, title: 20, display: 28 },
  weights: { regular: '400', medium: '500', semibold: '600', bold: '700' },
  lineHeights: { caption: 16, body: 20, title: 28, display: 36 },
} as const;

export const radius = { sm: 8, md: 12, lg: 16, xl: 24, full: 999 } as const;

