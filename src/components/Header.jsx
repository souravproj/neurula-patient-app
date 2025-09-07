import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../theme';
import Icon from './Icon';

export default function Header({ 
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  style,
  titleStyle,
  subtitleStyle,
  ...props 
}) {
  return (
    <View style={[styles.container, style]} {...props}>
      {leftIcon && (
        <Pressable 
          style={styles.iconButton} 
          onPress={onLeftPress}
          hitSlop={8}
        >
          <Icon name={leftIcon} size="medium" color={colors.text} />
        </Pressable>
      )}
      
      <View style={styles.textContainer}>
        {title && (
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        )}
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
        )}
      </View>
      
      {rightIcon && (
        <Pressable 
          style={styles.iconButton} 
          onPress={onRightPress}
          hitSlop={8}
        >
          <Icon name={rightIcon} size="medium" color={colors.text} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: spacing.component.headerHeight,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...typography.styles.h2,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.xs / 2,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});