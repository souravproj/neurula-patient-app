import React from 'react';
import { View, StyleSheet, Pressable, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';

export default function FirstScreen() {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Content Section */}
        <View style={styles.contentSection}>
          <View style={styles.heroSection}>
            <Text style={styles.heroTitle}>Welcome to Neurula</Text>
            <Text style={styles.heroSubtitle}>Your comprehensive health companion</Text>
          </View>

          <View style={styles.featuresSection}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🏥</Text>
              </View>
              <Text style={styles.featureTitle}>Complete Neurological Care</Text>
              <Text style={styles.featureDescription}>
                Access comprehensive neurological health monitoring and care tools
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📊</Text>
              </View>
              <Text style={styles.featureTitle}>Health Metrics</Text>
              <Text style={styles.featureDescription}>
                Track your progress with detailed analytics and insights
              </Text>
            </View>

            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>👥</Text>
              </View>
              <Text style={styles.featureTitle}>Expert Support</Text>
              <Text style={styles.featureDescription}>
                Connect with healthcare professionals when you need guidance
              </Text>
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
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.screen.horizontal,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.xl,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    ...typography.styles.button,
    color: colors.background,
    fontSize: typography.fontSize.sm,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.screen.horizontal,
  },
  contentSection: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  heroTitle: {
    ...typography.styles.h1,
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...typography.styles.body,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
  featuresSection: {
    gap: spacing.lg,
  },
  featureCard: {
    backgroundColor: colors.backgroundLight,
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: spacing.borderRadius.lg,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureIconText: {
    fontSize: 24,
  },
  featureTitle: {
    ...typography.styles.h3,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  featureDescription: {
    ...typography.styles.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.sm,
  },
});