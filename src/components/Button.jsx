import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';

export default function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'large', 
  disabled = false,
  style,
  textStyle,
  ...props 
}) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    if (size === 'small') {
      baseStyle.push(styles.buttonSmall);
    } else {
      baseStyle.push(styles.buttonLarge);
    }
    
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.buttonSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonOutline);
        break;
      default:
        baseStyle.push(styles.buttonPrimary);
    }
    
    if (disabled) {
      baseStyle.push(styles.buttonDisabled);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.buttonTextSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonTextOutline);
        break;
      default:
        baseStyle.push(styles.buttonTextPrimary);
    }
    
    if (disabled) {
      baseStyle.push(styles.buttonTextDisabled);
    }
    
    return baseStyle;
  };

  return (
    <Pressable
      style={[getButtonStyle(), style]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      {...props}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.borderRadius['3xl'],
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonLarge: {
    height: spacing.component.buttonHeight,
    paddingHorizontal: spacing.xl,
  },
  buttonSmall: {
    height: spacing.component.buttonHeightSmall,
    paddingHorizontal: spacing.lg,
  },
  buttonPrimary: {
    backgroundColor: colors.accent,
  },
  buttonSecondary: {
    backgroundColor: colors.primary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    ...typography.styles.button,
  },
  buttonTextPrimary: {
    color: colors.background,
  },
  buttonTextSecondary: {
    color: colors.background,
  },
  buttonTextOutline: {
    color: colors.accent,
  },
  buttonTextDisabled: {
    color: colors.textLight,
  },
});