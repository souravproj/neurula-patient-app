// File: src/screens/CreateAccount.jsx
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

// Same asset pattern as Login.js
const LOGO_IMAGE = require('../../assets/logo.png');
const BG_WATERMARK = require('../../assets/background.png');

export default function CreateAccount() {
    const navigation = useNavigation();

    // TODO: replace route names with your actual screens
    const handleEmirates = () => navigation.navigate('ScanEmiratesID');
    const handlePassport = () => navigation.navigate('ScanPassport');
    const handleManual = () => navigation.navigate('ManualEntry');
    const handleBack = () => navigation.goBack();
    const handleSkip = () => navigation.navigate('Home');

    return (
        <SafeAreaView style={styles.container}>
            {/* Background watermark */}
            <Image source={BG_WATERMARK} style={styles.watermark} resizeMode="contain" />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Brand header */}
                <View style={styles.brandRow}>
                    <Image source={LOGO_IMAGE} style={styles.brandLogo} resizeMode="contain" />
                </View>

                {/* Card wrapper */}
                <View style={styles.card}>
                    <Text style={styles.title}>Create your account</Text>
                    <Text style={styles.subtitle}>
                        Please select how you’d like to provide{'\n'}your details
                    </Text>

                    {/* Option 1 */}
                    <Pressable
                        style={styles.optionRow}
                        onPress={handleEmirates}
                        android_ripple={{ color: colors.shadowGlass }}
                        accessibilityRole="button"
                        accessibilityLabel="Scan Emirates ID (For UAE Residents)"
                        testID="opt-emirates"
                    >
                        <View style={styles.iconBubble}><Text style={styles.iconEmoji}>🪪</Text></View>
                        <View style={styles.optionTextWrap}>
                            <Text style={styles.optionTitle}>Scan Emirates ID</Text>
                            <Text style={styles.optionCaption}>For UAE Residents</Text>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </Pressable>

                    {/* Option 2 */}
                    <Pressable
                        style={styles.optionRow}
                        onPress={handlePassport}
                        android_ripple={{ color: colors.shadowGlass }}
                        accessibilityRole="button"
                        accessibilityLabel="Scan Passport (For Non-Residents)"
                        testID="opt-passport"
                    >
                        <View style={styles.iconBubble}><Text style={styles.iconEmoji}>🛂</Text></View>
                        <View style={styles.optionTextWrap}>
                            <Text style={styles.optionTitle}>Scan Passport</Text>
                            <Text style={styles.optionCaption}>For Non-Residents</Text>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </Pressable>

                    {/* Option 3 */}
                    <Pressable
                        style={styles.optionRow}
                        onPress={handleManual}
                        android_ripple={{ color: colors.shadowGlass }}
                        accessibilityRole="button"
                        accessibilityLabel="Manual Entry (Fill your details manually)"
                        testID="opt-manual"
                    >
                        <View style={styles.iconBubble}><Text style={styles.iconEmoji}>✍️</Text></View>
                        <View style={styles.optionTextWrap}>
                            <Text style={styles.optionTitle}>Manual Entry</Text>
                            <Text style={styles.optionCaption}>Fill your details manually</Text>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </Pressable>

                    {/* Back CTA */}
                    <Pressable
                        style={styles.backButton}
                        onPress={handleBack}
                        android_ripple={{ color: colors.shadowGlass }}
                        accessibilityRole="button"
                        accessibilityLabel="Back"
                        testID="btn-back"
                    >
                        <Text style={styles.backText}>Back</Text>
                    </Pressable>

                    {/* Skip link */}
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
        // Optional artwork placement tweaks:
        // right: -80, top: spacing.xl, width: 520, height: 520, opacity: 0.18,
    },
    scrollContent: { flexGrow: 1 },

    brandRow: {
        marginTop: '10%',
        marginBottom: '10%',
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
        marginBottom: spacing.xl,
    },

    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: spacing.borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 3,
        marginBottom: spacing.md,
    },
    iconBubble: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: colors.glassMorphism,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
        borderWidth: 1,
        borderColor: colors.borderGradient,
    },
    iconEmoji: { fontSize: 20, lineHeight: 22 },
    optionTextWrap: { flex: 1 },
    optionTitle: {
        ...typography.styles.bodyStrong,
        color: colors.text,
        marginBottom: spacing.xs / 2,
    },
    optionCaption: {
        ...typography.styles.caption,
        color: colors.textLight,
    },
    chevron: {
        ...typography.styles.h2,
        color: colors.textLight,
        marginLeft: spacing.sm,
    },

    backButton: {
        height: spacing.component.buttonHeight,
        borderRadius: spacing.borderRadius['3xl'],
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary, // TODO: swap to gradient (buttonGradientStart/End) if using LinearGradient
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
    backText: {
        ...typography.styles.button,
        color: colors.background,
    },
    skipLink: {
        ...typography.styles.body,
        color: colors.link,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
