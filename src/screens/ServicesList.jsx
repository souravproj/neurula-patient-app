// File: src/screens/ServicesList.jsx
import React from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, typography, spacing } from '../theme';

// placeholders — replace with your real assets
const BG_WATERMARK = require('../../assets/background.png');
const ICON_PLACEHOLDER = require('../../assets/icons/service-icon.png');
const CHEVRON = require('../../assets/icons/chevron-right.png');

const SERVICES = [
    { key: 'consult', title: 'Dr Consultation', subtitle: 'Book an appointment with specialist', icon: ICON_PLACEHOLDER, route: 'DoctorConsultation' },
    { key: 'lab', title: 'Lab Test', subtitle: 'Schedule medical tests and screenings', icon: ICON_PLACEHOLDER, route: 'LabTest' },
    { key: 'med-delivery', title: 'Medication Delivery', subtitle: 'Get prescriptions delivered to you', icon: ICON_PLACEHOLDER, route: 'MedicationDelivery' },
    { key: 'otc', title: 'Buy OTC Medications', subtitle: 'Purchase over-the-counter medicines', icon: ICON_PLACEHOLDER, route: 'BuyOTC' },
    { key: 'emergency', title: 'Emergency Service', subtitle: 'Ambulance & urgent care, anytime', icon: ICON_PLACEHOLDER, route: 'EmergencyService' },
    { key: 'wellness', title: 'Wellness & Nutrition', subtitle: 'Get personalized diet and lifestyle plans', icon: ICON_PLACEHOLDER, route: 'Wellness' },
    { key: 'maternity', title: 'Maternity & Childcare', subtitle: 'Support for moms and newborns', icon: ICON_PLACEHOLDER, route: 'Maternity' },
];

export default function ServicesList() {
    const navigation = useNavigation();

    const handleBack = () => navigation.goBack();
    const handleOpen = (route) => navigation.navigate(route);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={BG_WATERMARK} style={styles.watermark} resizeMode="cover" />

            <View style={styles.header}>
                <Pressable onPress={handleBack} hitSlop={10} style={styles.headerLeft}>
                    <Text style={styles.backIcon}>‹</Text>
                </Pressable>

                <Text style={styles.headerTitle}>Book a Service</Text>

                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconCircle}>
                        <Text style={styles.iconText}>🔔</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconCircle, { marginLeft: spacing.sm }]}>
                        <Text style={styles.iconText}>≡</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.listWrap}>
                    {SERVICES.map((s) => (
                        <Pressable
                            key={s.key}
                            style={styles.serviceCard}
                            onPress={() => handleOpen(s.route)}
                            android_ripple={{ color: colors.shadowGlass }}
                        >
                            <View style={styles.left}>
                                <View style={styles.iconBubble}>
                                    <Image source={s.icon} style={styles.iconImg} resizeMode="contain" />
                                </View>
                            </View>

                            <View style={styles.center}>
                                <Text style={styles.serviceTitle}>{s.title}</Text>
                                <Text style={styles.serviceSubtitle}>{s.subtitle}</Text>
                            </View>

                            <View style={styles.right}>
                                <Image source={CHEVRON} style={styles.chev} resizeMode="contain" />
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ---------- styles ---------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F6FF', // Light purple background
    },
    watermark: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.3, // Reduced opacity to match the subtle background
        pointerEvents: 'none',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
        backgroundColor: 'transparent',
    },
    headerLeft: {
        width: 32,
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 32,
    },
    backIcon: {
        fontSize: 24,
        color: '#2D2D2D',
        fontWeight: '400',
    },

    headerTitle: {
        flex: 1,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '600',
        color: '#2D2D2D',
        marginLeft: 12,
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 1,
    },
    iconText: {
        fontSize: 14,
        color: '#666',
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },

    listWrap: {
        marginTop: 8,
        gap: 12, // Reduced gap between cards
        marginBottom: 40
    },

    serviceCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white
        borderWidth: 0,
        borderRadius: 16, // Slightly more rounded
        paddingVertical: 18,
        paddingHorizontal: 20,
        shadowColor: '#8B5CF6', // Purple shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        // Add subtle border
        borderWidth: 0.5,
        borderColor: 'rgba(139, 92, 246, 0.1)',
    },

    left: {
        width: 52,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    iconBubble: {
        // width: 44,
        // height: 44,
        borderRadius: 12,
        // backgroundColor: 'rgba(139, 92, 246, 0.1)', // Light purple background
        borderWidth: 0.5,
        borderColor: 'rgba(139, 92, 246, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconImg: {
        width: 50,
        height: 50,
        // tintColor: '#8B5CF6', // Purple tint for icons
    },

    center: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    serviceTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D2D2D',
        lineHeight: 20,
    },
    serviceSubtitle: {
        fontSize: 13,
        fontWeight: '400',
        color: '#8E8E93',
        marginTop: 4,
        lineHeight: 18,
    },

    right: {
        marginLeft: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
    },
    chev: {
        width: 16,
        height: 16,
        tintColor: '#C7C7CC',
        opacity: 0.8,
    },
});