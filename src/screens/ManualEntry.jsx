// File: src/screens/ManualEntry.jsx
import React, { useMemo, useState } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Text,
    ScrollView,
    TextInput,
    Image,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';

// assets (same pattern as other screens)
const LOGO_IMAGE = require('../../assets/logo.png');          // brand
const BG_WATERMARK = require('../../assets/background.png'); // soft bg art

const EMIRATES = [
    'Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman',
    'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah',
];

const NATIONALITIES = [
    'United Arab Emirates', 'India', 'Pakistan', 'Bangladesh', 'Philippines',
    'Nepal', 'Sri Lanka', 'Egypt', 'Nigeria', 'United Kingdom',
];

export default function ManualEntry() {
    const navigation = useNavigation();

    // form state
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState(''); // TODO: wire native date picker
    const [nationality, setNationality] = useState('');
    const [emiratesId, setEmiratesId] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [medical, setMedical] = useState('');
    const [contact, setContact] = useState('');
    const [emirate, setEmirate] = useState('');
    const [address, setAddress] = useState('');
    const [locationPin, setLocationPin] = useState('');
    const [email, setEmail] = useState('');

    // lightweight dropdown toggles
    const [openNat, setOpenNat] = useState(false);
    const [openEmi, setOpenEmi] = useState(false);

    // simple front-end validation
    const [errors, setErrors] = useState({});

    const required = useMemo(
        () => ({
            fullName, dob, nationality, contact, emirate, address, locationPin, email,
        }),
        [fullName, dob, nationality, contact, emirate, address, locationPin, email]
    );

    const validate = () => {
        const e = {};
        if (!fullName.trim()) e.fullName = 'Full name is required';
        if (!dob.trim()) e.dob = 'Date of birth is required';
        if (!nationality.trim()) e.nationality = 'Select nationality';
        if (!contact.trim()) e.contact = 'Contact is required';
        if (!emirate.trim()) e.emirate = 'Select emirate';
        if (!address.trim()) e.address = 'Address is required';
        if (!locationPin.trim()) e.locationPin = 'Location pin is required';
        if (!email.trim()) e.email = 'Email is required';
        // tiny email check
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
        // phone numeric check
        if (contact && !/^[\d+\-\s()]{6,20}$/.test(contact)) e.contact = 'Enter a valid number';
        setErrors(e);
        return !Object.keys(e).length;
    };

    const onComplete = () => {
        if (!validate()) return;
        // TODO: replace with API call; for now navigate with payload
        navigation.navigate('RegistrationReview', {
            form: {
                fullName, dob, nationality, emiratesId, height, weight, medical,
                contact, emirate, address, locationPin, email,
            },
        });
    };

    const onCancel = () => navigation.goBack();
    const onSkip = () => navigation.navigate('Home');

    // tiny helper for border error state
    const inputBox = (key) => ([
        styles.inputContainer,
        errors[key] && { borderColor: '#d9534f' },
    ]);

    return (
        <SafeAreaView style={styles.container}>
            {/* background watermark */}
            <Image source={BG_WATERMARK} style={styles.watermark} resizeMode="contain" />



            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* header with back + logo */}
                <View style={styles.header}>
                    <Pressable onPress={navigation.goBack} hitSlop={10} style={styles.backBtn}>
                        <Text style={styles.backIcon}>‹</Text>
                    </Pressable>
                    <Image source={LOGO_IMAGE} style={styles.brandLogo} resizeMode="contain" />
                </View>
                {/* card wrapper */}
                <View style={styles.card}>
                    <Text style={styles.title}>Complete Registration</Text>
                    <Text style={styles.subtitle}>Please fill in your personal details</Text>

                    {/* Full Name */}
                    <FieldLabel text="Full Name" required />
                    <View style={inputBox('fullName')}>
                        <TextInput
                            value={fullName}
                            onChangeText={setFullName}
                            style={styles.textInput}
                            placeholder="Enter your full name"
                            placeholderTextColor={colors.textLight}
                            returnKeyType="next"
                        />
                    </View>
                    <ErrorText msg={errors.fullName} />

                    {/* Date of Birth */}
                    <FieldLabel text="Date of Birth" required />
                    <View style={inputBox('dob')}>
                        <TextInput
                            value={dob}
                            onChangeText={setDob}
                            style={[styles.textInput, { paddingRight: spacing.xl * 2 }]}
                            placeholder={Platform.select({ ios: 'yyyy / mm / dd', android: 'yyyy / mm / dd' })}
                            placeholderTextColor={colors.textLight}
                        />
                        <Pressable hitSlop={8} style={styles.trailingIcon}>
                            <Text style={styles.iconTxt}>📅</Text>
                        </Pressable>
                    </View>
                    <ErrorText msg={errors.dob} />

                    {/* Nationality (dropdown) */}
                    <FieldLabel text="Nationality" required />
                    <Pressable style={inputBox('nationality')} onPress={() => setOpenNat((v) => !v)}>
                        <Text style={[styles.selectText, !nationality && { color: colors.textLight }]}>
                            {nationality || '-- Select --'}
                        </Text>
                        <Text style={styles.chev}>v</Text>
                    </Pressable>
                    {openNat && (
                        <View style={styles.dropdown}>
                            <ScrollView style={{ maxHeight: 180 }}>
                                {NATIONALITIES.map((n) => (
                                    <Pressable key={n} onPress={() => { setNationality(n); setOpenNat(false); }}>
                                        <Text style={styles.dropdownItem}>{n}</Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                    <ErrorText msg={errors.nationality} />

                    {/* Emirates ID Number */}
                    <FieldLabel text="Emirates ID Number" />
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={emiratesId}
                            onChangeText={setEmiratesId}
                            style={[styles.textInput, { paddingRight: spacing.xl * 2 }]}
                            placeholder="784-XXX-XXXXXX-X"
                            placeholderTextColor={colors.textLight}
                            keyboardType="default"
                        />
                        <Pressable hitSlop={8} style={styles.trailingIcon}>
                            <Text style={styles.iconTxt}>🔎</Text>
                        </Pressable>
                    </View>
                    <View style={styles.infoChip}>
                        <Text style={styles.infoIcon}>i</Text>
                        <Text style={styles.infoText}>We’ll verify this with UAE database</Text>
                    </View>

                    {/* Height / Weight */}
                    <View style={styles.row2}>
                        <View style={[styles.col, { marginRight: spacing.sm }]}>
                            <FieldLabel text="Height (cm)" />
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={height}
                                    onChangeText={(t) => setHeight(t.replace(/[^\d.]/g, ''))}
                                    style={styles.textInput}
                                    placeholder="00"
                                    placeholderTextColor={colors.textLight}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                        <View style={[styles.col, { marginLeft: spacing.sm }]}>
                            <FieldLabel text="Weight (kg)" />
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={weight}
                                    onChangeText={(t) => setWeight(t.replace(/[^\d.]/g, ''))}
                                    style={styles.textInput}
                                    placeholder="00"
                                    placeholderTextColor={colors.textLight}
                                    keyboardType="numeric"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Medical Conditions */}
                    <FieldLabel text="Medical Conditions" />
                    <View style={[styles.inputContainer, styles.textAreaWrap]}>
                        <TextInput
                            value={medical}
                            onChangeText={setMedical}
                            style={[styles.textInput, styles.textArea]}
                            placeholder="List any medical conditions..."
                            placeholderTextColor={colors.textLight}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>

                    {/* Contact */}
                    <FieldLabel text="Contact" required />
                    <View style={inputBox('contact')}>
                        <TextInput
                            value={contact}
                            onChangeText={setContact}
                            style={styles.textInput}
                            placeholder="Enter your contact number"
                            placeholderTextColor={colors.textLight}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <ErrorText msg={errors.contact} />

                    {/* Emirates (dropdown) */}
                    <FieldLabel text="Emirates" required />
                    <Pressable style={inputBox('emirate')} onPress={() => setOpenEmi((v) => !v)}>
                        <Text style={[styles.selectText, !emirate && { color: colors.textLight }]}>
                            {emirate || '-- Select --'}
                        </Text>
                        <Text style={styles.chev}>⌄</Text>
                    </Pressable>
                    {openEmi && (
                        <View style={styles.dropdown}>
                            <ScrollView style={{ maxHeight: 180 }}>
                                {EMIRATES.map((e) => (
                                    <Pressable key={e} onPress={() => { setEmirate(e); setOpenEmi(false); }}>
                                        <Text style={styles.dropdownItem}>{e}</Text>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        </View>
                    )}
                    <ErrorText msg={errors.emirate} />

                    {/* Address */}
                    <FieldLabel text="Address" required />
                    <View style={inputBox('address')}>
                        <TextInput
                            value={address}
                            onChangeText={setAddress}
                            style={styles.textInput}
                            placeholder="Enter your full address"
                            placeholderTextColor={colors.textLight}
                        />
                    </View>
                    <ErrorText msg={errors.address} />

                    {/* Location Pin */}
                    <FieldLabel text="Location Pin" required />
                    <View style={inputBox('locationPin')}>
                        <TextInput
                            value={locationPin}
                            onChangeText={setLocationPin}
                            style={[styles.textInput, { paddingRight: spacing.xl * 2 }]}
                            placeholder="Add location pin"
                            placeholderTextColor={colors.textLight}
                        />
                        <Pressable hitSlop={8} style={styles.trailingIcon}>
                            <Text style={styles.iconTxt}>📍</Text>
                        </Pressable>
                    </View>
                    <ErrorText msg={errors.locationPin} />

                    {/* Map preview placeholder */}
                    <View style={styles.mapPreview}>
                        {/* TODO: replace with <MapView> or a static map snapshot */}
                        <Text style={styles.mapGhost}>Map preview</Text>
                    </View>

                    {/* Email Address */}
                    <FieldLabel text="Email Address" required />
                    <View style={inputBox('email')}>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            style={styles.textInput}
                            placeholder="Enter your email address"
                            placeholderTextColor={colors.textLight}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <ErrorText msg={errors.email} />

                    {/* Actions */}
                    <View style={styles.bottomSection}>
                        <Pressable
                            style={styles.primaryBtn}
                            onPress={onComplete}
                            android_ripple={{ color: colors.shadowGlass }}
                            accessibilityRole="button"
                            accessibilityLabel="Complete Registration"
                        >
                            <Text style={styles.primaryText}>Complete Registration</Text>
                        </Pressable>

                        <Pressable
                            style={styles.secondaryBtn}
                            onPress={onCancel}
                            android_ripple={{ color: colors.shadowGlass }}
                            accessibilityRole="button"
                            accessibilityLabel="Cancel"
                        >
                            <Text style={styles.secondaryText}>Cancel</Text>
                        </Pressable>

                        <Pressable onPress={onSkip} hitSlop={8} accessibilityRole="link">
                            <Text style={styles.skipLink}>Skip and Complete Later</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ---------- tiny presentational helpers ---------- */
function FieldLabel({ text, required }) {
    return (
        <Text style={styles.label}>
            {text} {required ? <Text style={{ color: colors.link }}>*</Text> : null}
        </Text>
    );
}
function ErrorText({ msg }) {
    if (!msg) return null;
    return <Text style={styles.errorText}>{msg}</Text>;
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    watermark: {
        position: 'absolute',
        pointerEvents: 'none',
    },

    /* header */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        // paddingTop: spacing.lg,
        // paddingBottom: spacing.md,
    },
    backBtn: { paddingRight: spacing.md, paddingVertical: spacing.xs },
    backIcon: { fontSize: 28, color: colors.text, opacity: 0.9 },
    brandLogo: { width: 150, height: 40, marginLeft: 'auto', marginRight: 'auto', marginTop: '15%', marginBottom: '15%' },

    /* scroll + card */
    scrollContent: { flexGrow: 1 },
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
        textAlign: 'left',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.styles.body,
        color: colors.textLight,
        marginBottom: spacing.lg,
    },

    /* inputs */
    label: {
        ...typography.styles.caption,
        color: colors.text,
        marginTop: spacing.sm,
        marginBottom: spacing.xs,
    },
    inputContainer: {
        position: 'relative',
        backgroundColor: colors.glassMorphism,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        borderRadius: spacing.borderRadius.md,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    textInput: {
        height: spacing.component.inputHeight,
        paddingHorizontal: spacing.md,
        fontSize: typography.fontSize.base,
        color: colors.text,
    },
    textAreaWrap: { minHeight: 120 },
    textArea: { height: 120 },

    trailingIcon: {
        position: 'absolute',
        right: spacing.sm,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xs,
    },
    iconTxt: { fontSize: 16, opacity: 0.9, color: colors.text },

    infoChip: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: spacing.borderRadius.md,
        backgroundColor: 'rgba(143, 0, 255, 0.08)',
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
        marginTop: spacing.xs,
    },
    infoIcon: {
        width: 16, height: 16, textAlign: 'center',
        borderRadius: 16, marginRight: spacing.xs,
        color: colors.text, opacity: 0.8,
    },
    infoText: {
        ...typography.styles.caption,
        color: colors.textLight,
    },

    row2: { flexDirection: 'row' },
    col: { flex: 1 },

    /* select/dropdown visuals */
    selectText: {
        height: spacing.component.inputHeight,
        lineHeight: spacing.component.inputHeight,
        paddingHorizontal: spacing.md,
        fontSize: typography.fontSize.base,
        color: colors.text,
    },
    chev: {
        position: 'absolute',
        right: spacing.sm,
        top: 13,
        bottom: 0,
        textAlignVertical: 'center',
        fontSize: 16,
        color: colors.textLight,
    },
    dropdown: {
        backgroundColor: colors.background,
        borderColor: colors.borderGradient,
        borderWidth: 1,
        borderRadius: spacing.borderRadius.md,
        marginTop: spacing.xs,
        marginBottom: spacing.xs,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 3,
    },
    dropdownItem: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        ...typography.styles.body,
        color: colors.text,
    },

    /* map preview placeholder */
    mapPreview: {
        height: 130,
        borderRadius: spacing.borderRadius.lg,
        overflow: 'hidden',
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 2,
        marginTop: spacing.sm,
        marginBottom: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapGhost: {
        ...typography.styles.caption,
        color: colors.textLight,
    },

    /* actions */
    bottomSection: {
        paddingTop: spacing['2xl'],
        paddingBottom: spacing.screen?.bottom ?? spacing.lg,
    },
    primaryBtn: {
        height: spacing.component.buttonHeight,
        borderRadius: spacing.borderRadius['3xl'],
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary, // swap to gradient if using LinearGradient
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
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
        marginTop: spacing.lg,
    },
    secondaryText: {
        ...typography.styles.button,
        color: colors.text,
    },
    skipLink: {
        ...typography.styles.body,
        color: colors.link,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: spacing.lg,
    },

    /* errors */
    errorText: {
        ...typography.styles.caption,
        color: '#d9534f',
        marginTop: spacing.xs,
    },
});
