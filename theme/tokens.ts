import { Platform } from 'react-native';

export const colors = {
  primary: '#295CF2',
  primaryDark: '#1F49C9',
  primarySoft: '#ECF1FF',
  background: '#F6F8FC',
  surface: '#FFFFFF',
  text: '#131C30',
  textSecondary: '#637087',
  textPlaceholder: '#949EB2',
  border: '#E0E5F0',
  neutralSoft: '#F1F4F9',
  success: '#1A9E61',
  successSoft: '#E5FAF0',
  warning: '#D97706',
  warningSoft: '#FFF2E0',
  danger: '#DC3545',
  dangerSoft: '#FDEBEC',
  overlay: 'rgba(19, 28, 48, 0.35)',
  white: '#FFFFFF',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
} as const;

export const typography = {
  family: Platform.select({ ios: 'System', android: 'sans-serif' }),
  sizes: { caption: 11, body: 13, label: 14, title: 24, formTitle: 22, sectionTitle: 18, display: 28, button: 14 },
  weights: { regular: '400', medium: '500', semibold: '600', bold: '700' },
  lineHeights: { caption: 17, body: 20, title: 32, formTitle: 30, sectionTitle: 27, display: 36, button: 22 },
} as const;

export const radius = { sm: 8, md: 12, lg: 16, xl: 17, full: 999 } as const;
