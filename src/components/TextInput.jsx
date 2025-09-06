import React, { useState } from 'react';
import { View, TextInput as RNTextInput, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';

export default function TextInput({
  label,
  error,
  leftIcon,
  rightIcon,
  style,
  inputStyle,
  containerStyle,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const getContainerStyle = () => {
    const baseStyle = [styles.container];
    
    if (isFocused) {
      baseStyle.push(styles.containerFocused);
    }
    
    if (error) {
      baseStyle.push(styles.containerError);
    }
    
    return baseStyle;
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[getContainerStyle(), style]}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        
        <RNTextInput
          style={[styles.input, inputStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={colors.textLight}
          {...props}
        />
        
        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.styles.bodySmall,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: typography.fontWeight.medium,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: spacing.component.inputHeight,
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.md,
  },
  containerFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.background,
  },
  containerError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text,
    padding: 0,
  },
  leftIconContainer: {
    marginRight: spacing.sm,
  },
  rightIconContainer: {
    marginLeft: spacing.sm,
  },
  errorText: {
    ...typography.styles.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
});