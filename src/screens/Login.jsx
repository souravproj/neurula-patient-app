// File: src/screens/Login.js
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';

// Replace with your actual assets
const LOGO_IMAGE = require('../../assets/logo.png');
const BG_WATERMARK = require('../../assets/background.png');

export default function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleContinue = () => {
    // why: demo navigation; wire to your auth flow
    navigation.navigate('FirstScreen');
  };

  const handleForgot = () => navigation.navigate?.('ForgotPassword');
  const handleCreate = () => navigation.navigate?.('CreateAccount');

  return (
    <SafeAreaView style={styles.container}>
      {/* Background watermark (behind everything) */}
      <Image source={BG_WATERMARK} style={styles.watermark} resizeMode="contain" />

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top brand area */}
        <View style={styles.brandRow}>
          <Image source={LOGO_IMAGE} style={styles.brandLogo} resizeMode="contain" />
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Log in</Text>
          <Text style={styles.subtitle}>
            Please enter your user name and{""}password to explore
          </Text>

          {/* Username */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>User name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={username}
                onChangeText={setUsername}
                style={styles.textInput}
                placeholder="Enter your user name"
                placeholderTextColor={colors.textLight}
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.textInput}
                placeholder="Enter your password"
                placeholderTextColor={colors.textLight}
                secureTextEntry={isPasswordHidden}
                returnKeyType="done"
              />
              <Pressable
                onPress={() => setIsPasswordHidden((v) => !v)}
                hitSlop={10}
                style={styles.trailingIcon}
              >
                <Text style={styles.eye}>{isPasswordHidden ? '🙈' : '👁️'}</Text>
              </Pressable>
            </View>
          </View>

          {/* Options row */}
          <View style={styles.optionsRow}>
            <Pressable
              onPress={() => setRememberMe((v) => !v)}
              style={styles.rememberRow}
              hitSlop={8}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe ? <Text style={styles.checkboxTick}>✓</Text> : null}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </Pressable>

            <Pressable onPress={handleForgot} hitSlop={8}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>
          </View>
          {/* Bottom sticky Login + Create account */}
          <View style={styles.bottomSection}>
            <Pressable style={styles.loginButton} onPress={handleContinue} android_ripple={{ color: colors.shadowGlass }}>
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>
            <View style={styles.createRow}>
              <Text style={styles.newText}>New to Neurula </Text>
              <Pressable onPress={handleCreate} hitSlop={8}>
                <Text style={styles.createLink}>Create account</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  watermark: {
    position: 'absolute',
    // right: -120,
    // top: spacing.xl,
    // width: 520, // large, soft background logo
    // height: 520,
    // opacity: 0.18,
    pointerEvents: 'none',
  },
  scrollContent: {
    flexGrow: 1,
  },
  brandRow: {
    marginTop: '15%',
    marginBottom: '15%',
    alignItems: 'center',
  },
  brandLogo: {
    width: 170,
    height: 48,
  },
  card: {
    backgroundColor: colors.glassMorphism,
    borderColor: colors.borderGradient,
    borderWidth: 1,
    borderTopLeftRadius: spacing.borderRadius['2xl'],
    borderTopEndRadius: spacing.borderRadius['2xl'],
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    shadowColor: colors.shadowGlass,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
    // height: '100%'
  },
  title: {
    ...typography.styles.h1,
    textAlign: 'center',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.styles.body,
    color: colors.textLight,
    marginBottom: spacing.xl,
    lineHeight: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.styles.caption,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  inputContainer: {
    position: 'relative',
  },
  textInput: {
    height: spacing.component.inputHeight,
    backgroundColor: colors.glassMorphism,
    borderWidth: 1,
    borderColor: colors.borderGradient,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.text,
    shadowColor: colors.shadowGlass,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  trailingIcon: {
    position: 'absolute',
    right: spacing.sm,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  eye: {
    fontSize: 18,
    opacity: 0.8,
  },
  optionsRow: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderGradient,
    backgroundColor: 'transparent',
    marginRight: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.buttonGradientStart,
  },
  checkboxTick: {
    fontSize: 12,
    color: colors.background,
    lineHeight: 12,
  },
  rememberText: {
    ...typography.styles.body,
    color: colors.text,
  },
  forgotText: {
    ...typography.styles.body,
    color: colors.link,
    textDecorationLine: 'underline',
  },
  bottomSection: {
    paddingHorizontal: spacing.screen.horizontal,
    paddingBottom: spacing.screen.bottom,
    paddingTop: spacing['3xl'],
    backgroundColor: 'transparent',
  },
  loginButton: {
    height: spacing.component.buttonHeight,
    borderRadius: spacing.borderRadius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: colors.primary,
  },
  buttonText: {
    ...typography.styles.button,
    color: colors.background,
  },
  createRow: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newText: {
    ...typography.styles.body,
    color: colors.textLight,
  },
  createLink: {
    ...typography.styles.body,
    color: colors.link,
    // textDecorationLine: 'underline',
  },
});
