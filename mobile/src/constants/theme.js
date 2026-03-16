// Legacy theme compatibility layer — re-exports from the new theme system
import { Platform } from 'react-native';
import COLORS_NEW from '../theme/colors';
import { SPACING as SPACING_NEW, SHADOWS as SHADOWS_NEW } from '../theme/spacing';

// Export colors with backward compatibility
export const COLORS = {
  ...COLORS_NEW,
  // Legacy name mappings for backward compatibility
  primary: COLORS_NEW.primary,
  secondary: COLORS_NEW.primaryLight,
  accent: '#FFCE32',
  success: COLORS_NEW.success,
  warning: COLORS_NEW.warning,
  error: COLORS_NEW.error,
  background: COLORS_NEW.background,
  text: COLORS_NEW.textPrimary,
  textSecondary: COLORS_NEW.textSecondary,
  border: COLORS_NEW.border,
  white: COLORS_NEW.white,
  black: COLORS_NEW.black,
};

export const SIZES = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const getShadow = (color, offset, opacity, radius, elevation) => {
  if (Platform.OS === 'web') {
    const r = parseInt(color.slice(1, 3) || '0', 16);
    const g = parseInt(color.slice(3, 5) || '0', 16);
    const b = parseInt(color.slice(5, 7) || '0', 16);
    const opacityHex = Math.floor(opacity * 255).toString(16).padStart(2, '0');
    const finalColor = color.length === 4
      ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}${opacityHex}`
      : `${color}${opacityHex}`;
    return { boxShadow: `${offset.width}px ${offset.height}px ${radius}px ${finalColor}` };
  }
  if (Platform.OS === 'ios') {
    return { shadowColor: color, shadowOffset: offset, shadowOpacity: opacity, shadowRadius: radius };
  }
  return { elevation: elevation };
};

export const SHADOWS = {
  small: getShadow('#000', { width: 0, height: 2 }, 0.05, 4, 2),
  medium: getShadow('#000', { width: 0, height: 4 }, 0.1, 8, 4),
  large: getShadow('#000', { width: 0, height: 8 }, 0.15, 16, 8),
};
