export const lightColors = {
  primary: '#1E3A8A', // Deep Trust Navy (Security / Official feeling)
  primaryLight: '#3B82F6',
  primaryDark: '#0F172A',
  secondary: '#F59E0B', // Gold / Warning / Focus
  secondaryLight: '#FEF3C7',
  accent: '#10B981', // Success Emerald
  accentLight: '#D1FAE5',
  danger: '#EF4444', // Danger Red
  dangerLight: '#FEE2E2',
  background: '#F8FAFC',
  card: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  surface: '#FFFFFF',
  surfaceHighlight: '#EFF6FF',
  surfaceMuted: '#F1F5F9',
  surfaceSubtle: '#F8FAFC',
  successSurface: '#ECFDF5',
  dangerSurface: '#FEF2F2',
  warningSurface: '#FFFBEB',
  gold: '#D97706',
};

export const darkColors: ThemeColors = {
  primary: '#3B82F6',
  primaryLight: '#60A5FA',
  primaryDark: '#090E1A',
  secondary: '#F59E0B',
  secondaryLight: 'rgba(245, 158, 11, 0.18)',
  accent: '#10B981',
  accentLight: 'rgba(16, 185, 129, 0.18)',
  danger: '#F87171',
  dangerLight: 'rgba(239, 68, 68, 0.18)',
  background: '#0B1120',
  card: '#131C31',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  border: '#1E293B',
  borderLight: '#1E293B',
  surface: '#131C31',
  surfaceHighlight: '#1E293B',
  surfaceMuted: '#1E293B',
  surfaceSubtle: '#0F172A',
  successSurface: 'rgba(16, 185, 129, 0.14)',
  dangerSurface: 'rgba(239, 68, 68, 0.14)',
  warningSurface: 'rgba(245, 158, 11, 0.14)',
  gold: '#F59E0B',
};

export type ThemeColors = typeof lightColors;

export const colors = lightColors;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
