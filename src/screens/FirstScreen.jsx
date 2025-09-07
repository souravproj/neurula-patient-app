// File: src/screens/firstScreen.jsx
import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';

// assets (same pattern as Login.js)
const LOGO_IMAGE = require('../../assets/logo.png');
const BG_WATERMARK = require('../../assets/background.png');

export default function FirstScreen() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleSignUp = () => {
    navigation.navigate('CreateAccount');
  };
  const handleSkip = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* background watermark */}
      <Image source={BG_WATERMARK} style={styles.watermark} resizeMode="contain" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* brand header */}
        <View style={styles.brandRow}>
          <Image source={LOGO_IMAGE} style={styles.brandLogo} resizeMode="contain" />
        </View>

        {/* content card */}
        <View style={styles.card}>
          <Text style={styles.title}>Welcome to Neurula</Text>
          <Text style={styles.subtitle}>
            Your comprehensive healthcare{'\n'}services platform
          </Text>

          {/* primary action */}
          <Pressable
            style={styles.primaryBtn}
            onPress={handleLogin}
            android_ripple={{ color: colors.shadowGlass }}
            accessibilityRole="button"
            accessibilityLabel="Login"
            testID="btn-login"
          >
            <Text style={styles.primaryText}>Login</Text>
          </Pressable>

          {/* secondary action */}
          <Pressable
            style={styles.secondaryBtn}
            onPress={handleSignUp}
            android_ripple={{ color: colors.shadowGlass }}
            accessibilityRole="button"
            accessibilityLabel="Sign Up"
            testID="btn-signup"
          >
            <Text style={styles.secondaryText}>Sign Up</Text>
          </Pressable>

          {/* tertiary link */}
          <Pressable
            onPress={handleSkip}
            hitSlop={8}
            accessibilityRole="link"
            accessibilityLabel="Skip and Complete Later"
            testID="link-skip"
          >
            <Text style={styles.skipLink}>Skip and Complete Later</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  watermark: {
    position: 'absolute',
    pointerEvents: 'none',
    // Optional: tweak for your artwork placement
    // right: -80,
    // top: spacing.xl,
    // width: 520,
    // height: 520,
    // opacity: 0.18,
  },
  scrollContent: { flexGrow: 1 },
  brandRow: {
    marginTop: '15%',
    marginBottom: '15%',
    alignItems: 'center',
  },
  brandLogo: { width: 170, height: 48 },

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
    height: '80%'
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
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing['2xl'],
  },

  primaryBtn: {
    height: spacing.component.buttonHeight,
    borderRadius: spacing.borderRadius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: spacing.md,
  },
  primaryText: {
    ...typography.styles.button,
    color: colors.background,
  },

  secondaryBtn: {
    height: spacing.component.buttonHeight,
    borderRadius: spacing.borderRadius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderGradient,
    shadowColor: colors.shadowGlass,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: spacing.lg,
  },
  secondaryText: {
    ...typography.styles.button,
    color: colors.text, // or colors.primary if you prefer purple text
  },

  skipLink: {
    ...typography.styles.body,
    color: colors.link,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
