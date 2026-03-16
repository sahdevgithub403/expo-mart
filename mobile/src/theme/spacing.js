import { Platform } from 'react-native';

// Spacing scale (4, 8, 16, 24, 32)
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
};

// Shadows — premium soft shadow system
const createShadow = (color, offsetY, opacity, radius, elevation) => {
  if (Platform.OS === 'android') {
    return { elevation };
  }
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: radius,
  };
};

export const SHADOWS = {
  none: createShadow('#000', 0, 0, 0, 0),
  xs: createShadow('#000', 1, 0.04, 2, 1),
  sm: createShadow('#000', 2, 0.06, 4, 2),
  md: createShadow('#000', 4, 0.08, 8, 4),
  lg: createShadow('#000', 8, 0.12, 16, 8),
  xl: createShadow('#000', 12, 0.16, 24, 12),
  card: createShadow('#000', 2, 0.05, 6, 3),
  button: createShadow('#FF385C', 4, 0.2, 10, 4),
};

export default { SPACING, RADIUS, SHADOWS };
