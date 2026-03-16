import { Platform } from 'react-native';

// Typography system for Lumina - clean, modern sizing
export const FONT_FAMILY = Platform.select({
  ios: 'System',
  android: 'Roboto',
  default: 'System',
});

export const FONT_SIZES = {
  h1: 28,
  h2: 22,
  h3: 18,
  body: 16,
  bodySmall: 14,
  caption: 12,
  overline: 10,
};

export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const LINE_HEIGHTS = {
  h1: 34,
  h2: 28,
  h3: 24,
  body: 22,
  bodySmall: 20,
  caption: 16,
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: FONT_SIZES.h1,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.h1,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: FONT_SIZES.h2,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.h2,
  },
  h3: {
    fontSize: FONT_SIZES.h3,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: LINE_HEIGHTS.h3,
  },
  body: {
    fontSize: FONT_SIZES.body,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.body,
  },
  bodyMedium: {
    fontSize: FONT_SIZES.body,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.body,
  },
  bodySmall: {
    fontSize: FONT_SIZES.bodySmall,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.bodySmall,
  },
  caption: {
    fontSize: FONT_SIZES.caption,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.caption,
  },
  overline: {
    fontSize: FONT_SIZES.overline,
    fontWeight: FONT_WEIGHTS.semiBold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: FONT_SIZES.body,
    fontWeight: FONT_WEIGHTS.semiBold,
    letterSpacing: 0.2,
  },
};

export default TYPOGRAPHY;
