import React, { useMemo, useState } from 'react';
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
import { TextField, FieldDropdown, Button } from '../components';

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
                    <TextField
                        label="Full Name"
                        required={true}
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Enter your full name"
                        error={errors.fullName}
                        returnKeyType="next"
                    />

                    {/* Date of Birth */}
                    <TextField
                        label="Date of Birth"
                        required={true}
                        value={dob}
                        onChangeText={setDob}
                        placeholder="yyyy / mm / dd"
                        error={errors.dob}
                        // TODO: Add date picker functionality - will need custom rightIcon slot
                    />

                    {/* Nationality (dropdown) */}
                    <FieldDropdown
                        label="Nationality"
                        required={true}
                        value={nationality}
                        onValueChange={setNationality}
                        placeholder="-- Select --"
                        options={NATIONALITIES}
                        error={errors.nationality}
                    />

                    {/* Emirates ID Number */}
                    <TextField
                        label="Emirates ID Number"
                        value={emiratesId}
                        onChangeText={setEmiratesId}
                        placeholder="784-XXX-XXXXXX-X"
                        rightIcon="search"
                        onRightIconPress={() => {/* TODO: Add search functionality */}}
                        keyboardType="default"
                        helperText="We'll verify this with UAE database"
                    />

                    {/* Height / Weight */}
                    <View style={styles.row2}>
                        <View style={[styles.col, { marginRight: spacing.sm }]}>
                            <TextField
                                label="Height (cm)"
                                value={height}
                                onChangeText={(t) => setHeight(t.replace(/[^\d.]/g, ''))}
                                placeholder="00"
                                keyboardType="numeric"
                                style={{ marginBottom: 0 }}
                            />
                        </View>
                        <View style={[styles.col, { marginLeft: spacing.sm }]}>
                            <TextField
                                label="Weight (kg)"
                                value={weight}
                                onChangeText={(t) => setWeight(t.replace(/[^\d.]/g, ''))}
                                placeholder="00"
                                keyboardType="numeric"
                                style={{ marginBottom: 0 }}
                            />
                        </View>
                    </View>

                    {/* Medical Conditions */}
                    <TextField
                        label="Medical Conditions"
                        value={medical}
                        onChangeText={setMedical}
                        placeholder="List any medical conditions..."
                        multiline={true}
                        style={{ height: 120 }}
                    />

                    {/* Contact */}
                    <TextField
                        label="Contact"
                        required={true}
                        value={contact}
                        onChangeText={setContact}
                        placeholder="Enter your contact number"
                        keyboardType="phone-pad"
                        error={errors.contact}
                    />

                    {/* Emirates (dropdown) */}
                    <FieldDropdown
                        label="Emirates"
                        required={true}
                        value={emirate}
                        onValueChange={setEmirate}
                        placeholder="-- Select --"
                        options={EMIRATES}
                        error={errors.emirate}
                    />

                    {/* Address */}
                    <TextField
                        label="Address"
                        required={true}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Enter your full address"
                        error={errors.address}
                    />

                    {/* Location Pin */}
                    <TextField
                        label="Location Pin"
                        required={true}
                        value={locationPin}
                        onChangeText={setLocationPin}
                        placeholder="Add location pin"
                        rightIcon="map-pin"
                        onRightIconPress={() => {/* TODO: Add location picker functionality */}}
                        error={errors.locationPin}
                    />

                    {/* Map preview placeholder */}
                    <View style={styles.mapPreview}>
                        {/* TODO: replace with <MapView> or a static map snapshot */}
                        <Text style={styles.mapGhost}>Map preview</Text>
                    </View>

                    {/* Email Address */}
                    <TextField
                        label="Email Address"
                        required={true}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email address"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        error={errors.email}
                    />

                    {/* Actions */}
                    <View style={styles.bottomSection}>
                        <Button
                            title="Complete Registration"
                            onPress={onComplete}
                            variant="primary"
                            size="large"
                        />

                        <Button
                            title="Cancel"
                            onPress={onCancel}
                            variant="outline"
                            size="large"
                            style={{ marginTop: spacing.lg }}
                        />

                        <Pressable onPress={onSkip} hitSlop={8} accessibilityRole="link">
                            <Text style={styles.skipLink}>Skip and Complete Later</Text>
                        </Pressable>
                    </View>
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
    backIcon: { 
        fontSize: 28, 
        fontFamily: 'Poppins_400Regular',
        color: colors.text, 
        opacity: 0.9 
    },
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
        fontFamily: 'Poppins_700Bold',
        fontSize: 28,
        lineHeight: 36,
        textAlign: 'left',
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        lineHeight: 24,
        color: colors.textLight,
        marginBottom: spacing.lg,
    },



    row2: { flexDirection: 'row' },
    col: { flex: 1 },


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
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: colors.textLight,
    },

    /* actions */
    bottomSection: {
        paddingTop: spacing['2xl'],
        paddingBottom: spacing.screen?.bottom ?? spacing.lg,
    },
    skipLink: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        lineHeight: 24,
        color: '#A855F7',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: spacing.lg,
    },

});
