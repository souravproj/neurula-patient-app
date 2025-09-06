import React from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';

export default function Login() {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('FirstScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeSubtitle}>Please enter your credentials</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Email"
              placeholderTextColor={colors.textLight}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Password"
              placeholderTextColor={colors.textLight}
              secureTextEntry
            />
          </View>
        </View>

        {/* Additional Content */}
        <View style={styles.contentSection}>
          <Text style={styles.contentText}>
            Enter your login information below to access your account
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomSection}>
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.screen.horizontal,
  },
  headerSection: {
    marginTop: spacing['3xl'],
    marginBottom: spacing['2xl'],
    alignItems: 'center',
  },
  welcomeTitle: {
    ...typography.styles.h1,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  welcomeSubtitle: {
    ...typography.styles.body,
    color: colors.textLight,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  textInput: {
    height: spacing.component.inputHeight,
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.text,
  },
  contentSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  contentText: {
    ...typography.styles.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  bottomSection: {
    paddingHorizontal: spacing.screen.horizontal,
    paddingBottom: spacing.screen.bottom,
    paddingTop: spacing.md,
  },
  continueButton: {
    backgroundColor: colors.accent,
    height: spacing.component.buttonHeight,
    borderRadius: spacing.borderRadius['3xl'],
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    ...typography.styles.button,
    color: colors.background,
  },
});