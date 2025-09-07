// File: src/screens/ScanEmiratesID.jsx
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Text,
    ScrollView,
    Image,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';

// Use a light/white logo for dark background
// TODO: replace with your actual white logo asset
const LOGO_DARK = require('../../assets/white-logo.png');

export default function ScanEmiratesID() {
    const navigation = useNavigation();
    const [capturing, setCapturing] = useState(false);

    // Frontend-only "capture": simulate scan, then navigate with stubbed OCR data
    const handleCapture = async () => {
        if (capturing) return;
        setCapturing(true);

        // Simulate a short capture/processing delay
        setTimeout(() => {
            setCapturing(false);
            navigation.navigate('OCRReview', {
                source: 'emirates-id',
                // Stubbed fields you can map in the next screen
                extracted: {
                    full_name: 'Sourav Test',
                    emirates_id: '784-1987-1234567-1',
                    nationality: 'India',
                    date_of_birth: '1998-03-14',
                    sex: 'M',
                    expiry: '2028-05-31',
                },
                imageUri: null, // replace with real photo uri when wiring camera
            });
        }, 1200);
    };

    const handleManual = () => navigation.navigate('ManualEntry');
    const handleClose = () => navigation.goBack();

    return (
        <SafeAreaView style={styles.container}>
            {/* Close (X) */}
            <Pressable
                onPress={handleClose}
                hitSlop={10}
                style={styles.closeBtn}
                accessibilityRole="button"
                accessibilityLabel="Close"
            >
                <Text style={styles.closeText}>✕</Text>
            </Pressable>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Brand header */}
                <View style={styles.brandRow}>
                    <Image source={LOGO_DARK} style={styles.brandLogo} resizeMode="contain" />
                </View>

                {/* Scan frame */}
                <View style={styles.frame}>
                    <View style={styles.focusSquare} />
                    <Text style={styles.frameLabel}>Position Emirates ID here</Text>
                </View>

                <Text style={styles.helperText}>
                    Place your Emirates ID within the frame to{'\n'}automatically capture your details
                </Text>

                {/* Bottom sticky actions */}
                <View style={styles.bottomSection}>
                    <Pressable
                        style={[styles.captureBtn, capturing && { opacity: 0.7 }]}
                        onPress={handleCapture}
                        disabled={capturing}
                        android_ripple={{ color: colors.shadowGlass }}
                        accessibilityRole="button"
                        accessibilityLabel="Capture"
                    >
                        {capturing ? (
                            <ActivityIndicator size="small" color={colors.background} />
                        ) : (
                            <Text style={styles.captureText}>Capture</Text>
                        )}
                    </Pressable>

                    <Pressable onPress={handleManual} hitSlop={8} accessibilityRole="link">
                        <Text style={styles.manualLink}>Enter Manually Instead</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // Dark background for scan page
        backgroundColor: '#0F1115', // keep hardcoded for fidelity; swap to theme token if desired
    },
    closeBtn: {
        position: 'absolute',
        right: spacing.lg,
        top: spacing.lg,
        zIndex: 10,
    },
    closeText: {
        fontSize: 20,
        color: '#FFFFFF',
        opacity: 0.9,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing['6xl'],
        paddingBottom: spacing['xl'],
    },

    brandRow: {
        alignItems: 'center',
        marginBottom: '15%',
        marginTop: '15%',
    },
    brandLogo: { width: 160, height: 44 },

    frame: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'rgba(255,255,255,0.7)',
        borderRadius: spacing.borderRadius.xl,
        paddingVertical: spacing['4xl'],
        paddingHorizontal: spacing['2xl'],
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.03)', // subtle contrast inside the frame
    },
    focusSquare: {
        width: 48,
        height: 48,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: spacing.borderRadius.md,
        opacity: 0.9,
        marginBottom: spacing.md,
    },
    frameLabel: {
        ...typography.styles.caption,
        color: '#FFFFFF',
        opacity: 0.9,
    },
    helperText: {
        ...typography.styles.body,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 20,
        marginTop: spacing.xl,
    },

    // Anchored bottom section to match PNG (button above link)
    bottomSection: {
        marginTop: 'auto',
        paddingTop: spacing['3xl'],
        paddingHorizontal: spacing.screen?.horizontal ?? spacing.lg,
        paddingBottom: spacing.screen?.bottom ?? spacing.lg,
    },
    captureBtn: {
        height: spacing.component.buttonHeight,
        borderRadius: spacing.borderRadius['3xl'],
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary, // swap to gradient if you use LinearGradient
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
        marginBottom: spacing.lg,
    },
    captureText: {
        ...typography.styles.button,
        color: colors.background,
    },
    manualLink: {
        ...typography.styles.body,
        color: colors.link,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});
