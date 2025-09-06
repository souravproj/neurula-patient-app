export const typography = {
  // Font families (you'll need to add these fonts to your project)
  fontFamily: {
    regular: 'System', // Default system font
    medium: 'System', // System medium
    bold: 'System', // System bold
    // TODO: Replace with custom fonts if needed
    // regular: 'YourCustomFont-Regular',
    // medium: 'YourCustomFont-Medium', 
    // bold: 'YourCustomFont-Bold',
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Line heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Text styles (commonly used combinations)
  styles: {
    h1: {
      fontSize: 30,
      fontWeight: '700',
      lineHeight: 36,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 30,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 26,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
  },
};