import { Platform } from 'react-native';

export const COLORS = {
  primary: '#002f34',     // OLX Deep Teal
  secondary: '#00d1c1',   // Light Teal
  accent: '#FFCE32',      // OLX Yellow
  success: '#10b981',
  warning: '#F59E0B',
  error: '#EF4444',
  background: '#F2F4F5',  // Greayer background typical for OLX
  text: '#002f34',
  textSecondary: '#406367',
  border: '#CFD8DC',
  white: '#FFFFFF',
  black: '#000000',
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
    // For web, use boxShadow. We'll simplify the color to rgba for max compatibility
    // if it's a hex like #000 or #0066FF
    const r = parseInt(color.slice(1, 3) || '0', 16);
    const g = parseInt(color.slice(3, 5) || '0', 16);
    const b = parseInt(color.slice(5, 7) || '0', 16);
    
    // If it's short hex like #000, color.slice(1,3) is '00'.
    // If it's a 3-char hex #abc, we need to handle that, but our colors are mostly 6-char or named.
    // For now, let's use a more robust rgba if possible, or just use the hex if browser supports it.
    // Most modern browsers support #RRGGBBAA.
    const opacityHex = Math.floor(opacity * 255).toString(16).padStart(2, '0');
    const finalColor = color.length === 4 ? `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}${opacityHex}` : `${color}${opacityHex}`;

    return {
      boxShadow: `${offset.width}px ${offset.height}px ${radius}px ${finalColor}`,
    };
  }
  
  if (Platform.OS === 'ios') {
    return {
      shadowColor: color,
      shadowOffset: offset,
      shadowOpacity: opacity,
      shadowRadius: radius,
    };
  }

  return {
    elevation: elevation,
  };
};

export const SHADOWS = {
  small: getShadow('#000', { width: 0, height: 2 }, 0.05, 4, 2),
  medium: getShadow('#000', { width: 0, height: 4 }, 0.1, 8, 4),
  large: getShadow('#000', { width: 0, height: 8 }, 0.15, 16, 8),
};

