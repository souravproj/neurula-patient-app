// File: src/screens/Home.jsx
import React from 'react';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../theme';

// Soft background art (same pattern as other screens)
const BG_WATERMARK = require('../../assets/background.png');
const AVATAR_1 = require('../../assets/logo1.png');
const AVATAR_2 = require('../../assets/logo2.png');
const AVATAR_3 = require('../../assets/logo3.png');

export default function Home() {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const services = [
        { key: 'consult', label: 'Doctor Consultation', icon: '🩺', onPress: () => navigation.navigate('DoctorConsultation') },
        { key: 'lab', label: 'Lab Test', icon: '🧪', onPress: () => navigation.navigate('LabTest') },
        { key: 'delivery', label: 'Medication Delivery', icon: '🚚', onPress: () => navigation.navigate('MedicationDelivery') },
        { key: 'otc', label: 'Buy OTC', icon: '🛒', onPress: () => navigation.navigate('BuyOTC') },
    ];

    const appointments = [
        { id: 'a1', name: 'Dr Michael Chen', role: 'General Physician', time: 'Today, 7:00 PM', status: 'Confirmed', avatar: AVATAR_1 },
        { id: 'a2', name: 'Dr John Doe', role: 'Cardiologist', time: 'Today, 10:30 AM', status: 'Confirmed', avatar: AVATAR_2 },
        { id: 'a3', name: 'Dr John Doe', role: 'Cardiologist', time: 'Today, 10:30 AM', status: 'Confirmed', avatar: AVATAR_3 },
    ];

    const deliveries = [
        { id: 'ORD-2024-001', eta: 'Arriving today, 2:00 PM', status: 'In Transit', progress: 0.65 },
        { id: 'ORD-2024-002', eta: 'Arriving today, 4:00 PM', status: 'In Transit', progress: 0.35 },
    ];

    // Handler functions for "View All" buttons
    const handleViewAllServices = () => {
        navigation.navigate('Services');
    };

    const handleViewAllAppointments = () => {
        navigation.navigate('Appointments');
    };

    const handleViewAllDeliveries = () => {
        navigation.navigate('Deliveries');
    };

    const handleAIAgents = () => {
        navigation.navigate('AIAgents');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* background watermark */}
            <Image source={BG_WATERMARK} style={styles.watermark} resizeMode="contain" />

            <ScrollView
                contentContainerStyle={[
                    styles.scroll,
                    {
                        // Add bottom padding to account for tab bar
                        paddingBottom: spacing.component.tabBarHeight + Math.max(insets.bottom, 8) + spacing.xl
                    }
                ]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.headerRow}>
                    <View style={styles.headerLeft}>
                        <Text style={styles.hello}>Good Morning,</Text>
                        <Text style={styles.userName}>Ahmed Al-Rashid</Text>
                    </View>

                    <View style={styles.headerActions}>
                        <Pressable style={styles.iconCircle} onPress={() => navigation.navigate('Notifications')}>
                            <Text style={styles.iconTxt}>🔔</Text>
                        </Pressable>
                        <Pressable style={styles.iconCircle} onPress={() => navigation.toggleDrawer?.()}>
                            <Text style={styles.iconTxt}>☰</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Search */}
                <View style={styles.searchWrap}>
                    <TextInput
                        placeholder="Search here..."
                        placeholderTextColor={colors.textLight}
                        style={styles.searchInput}
                    />
                    <View style={styles.searchIconContainer}>
                        <Text style={styles.searchIcon}>🔍</Text>
                    </View>
                </View>

                {/* Complete Profile */}
                <View style={styles.profileCard}>
                    <View style={styles.cardRowBetween}>
                        <Text style={styles.cardTitle}>Complete Your Profile</Text>
                        <Pressable hitSlop={8}>
                            <Text style={styles.cardArrow}>›</Text>
                        </Pressable>
                    </View>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: '65%' }]} />
                    </View>
                    <Text style={styles.progressNote}>65% Completed</Text>
                </View>

                {/* Book a Service */}
                <View style={styles.sectionHead}>
                    <Text style={styles.sectionTitle}>Book a Service</Text>
                    <Pressable hitSlop={8} onPress={handleViewAllServices}>
                        <Text style={styles.link}>View All</Text>
                    </Pressable>
                </View>

                <View style={styles.servicesGrid}>
                    {services.map((s) => (
                        <Pressable key={s.key} style={styles.serviceTile} onPress={s.onPress}>
                            <View style={styles.serviceIconContainer}>
                                <Text style={styles.serviceEmoji}>{s.icon}</Text>
                            </View>
                            <Text style={styles.serviceLabel}>{s.label}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Upcoming Appointments */}
                <View style={styles.sectionHead}>
                    <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                    <Pressable hitSlop={8} onPress={handleViewAllAppointments}>
                        <Text style={styles.link}>View All</Text>
                    </Pressable>
                </View>

                <View style={styles.appointmentsList}>
                    {appointments.map((item) => (
                        <Pressable
                            key={item.id}
                            style={styles.appointmentCard}
                            onPress={() => navigation.navigate('AppointmentDetails', { appointmentId: item.id })}
                        >
                            <Image source={item.avatar} style={styles.doctorAvatar} />
                            <View style={styles.appointmentInfo}>
                                <Text style={styles.doctorName}>{item.name}</Text>
                                <Text style={styles.doctorRole}>{item.role}</Text>
                                <Text style={styles.appointmentTime}>{item.time}</Text>
                            </View>

                            <View style={styles.appointmentMeta}>
                                <View style={styles.statusBadge}>
                                    <Text style={styles.statusText}>{item.status}</Text>
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </View>

                {/* Track My Deliveries */}
                <View style={styles.sectionHead}>
                    <Text style={styles.sectionTitle}>Track My Deliveries</Text>
                    <Pressable hitSlop={8} onPress={handleViewAllDeliveries}>
                        <Text style={styles.link}>View All</Text>
                    </Pressable>
                </View>

                <View style={styles.deliveriesList}>
                    {deliveries.map((d, idx) => (
                        <Pressable
                            key={`${d.id}-${idx}`}
                            style={styles.deliveryCard}
                            onPress={() => navigation.navigate('DeliveryTracking', { orderId: d.id })}
                        >
                            <View style={styles.deliveryHeader}>
                                <Text style={styles.orderId}>{d.id}</Text>
                                <View style={styles.deliveryStatusBadge}>
                                    <Text style={styles.deliveryStatusText}>{d.status}</Text>
                                </View>
                            </View>
                            <Text style={styles.etaText}>{d.eta}</Text>
                            <View style={styles.deliveryProgressBar}>
                                <View style={[styles.deliveryProgressFill, { width: `${Math.round(d.progress * 100)}%` }]} />
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            {/* Floating AI Agent bubble */}
            <Pressable
                onPress={handleAIAgents}
                accessibilityRole="button"
                accessibilityLabel="Open AI Assistant"
                android_ripple={{ color: 'rgba(255,255,255,0.2)', borderless: true }}
                style={[
                    styles.floatingAIButton,
                    {
                        bottom: spacing.component.tabBarHeight + Math.max(insets.bottom, 8) + spacing.lg,
                        right: spacing.lg
                    }
                ]}
            >
                <View style={styles.aiButtonInner}>
                    <Text style={styles.aiButtonIcon}>😊</Text>
                </View>
            </Pressable>
        </SafeAreaView>
    );
}

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f8f9fa'
    },
    watermark: {
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: [{ translateX: -100 }, { translateY: -100 }],
        pointerEvents: 'none',
        opacity: 0.03,
        width: 200,
        height: 200,
    },

    scroll: {
        flexGrow: 1,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        // paddingBottom will be set dynamically in the component
    },

    /* header */
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
        paddingTop: spacing.sm,
    },
    headerLeft: {
        flex: 1,
    },
    hello: {
        fontFamily: 'Poppins-Regular',
        color: colors.textLight,
        marginBottom: 4,
        fontSize: 16,
        lineHeight: 24,
    },
    userName: {
        fontFamily: 'Poppins-Bold',
        color: colors.text,
        fontSize: 24,
        lineHeight: 32,
        fontWeight: '700',
    },
    headerActions: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: 4,
        alignItems: 'center',
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    aiAgentsButton: {
        backgroundColor: 'rgba(143, 0, 255, 0.1)',
        borderColor: colors.primary,
    },
    iconTxt: {
        fontSize: 20,
        lineHeight: 20,
    },

    /* search */
    searchWrap: {
        position: 'relative',
        marginBottom: spacing.xl,
    },
    searchInput: {
        height: 56,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        borderRadius: 28,
        paddingLeft: spacing.xl,
        paddingRight: spacing.xl * 2.5,
        color: colors.text,
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        lineHeight: 24,
    },
    searchIconContainer: {
        position: 'absolute',
        right: spacing.lg,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 56,
    },
    searchIcon: {
        fontSize: 20,
        opacity: 0.6,
    },

    /* profile completion card */
    profileCard: {
        backgroundColor: colors.background,
        borderColor: colors.borderGradient,
        borderWidth: 1,
        borderRadius: spacing.borderRadius['2xl'],
        padding: spacing.lg,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        marginBottom: spacing.xl,
    },
    cardRowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    cardTitle: {
        fontFamily: 'Poppins-SemiBold',
        color: colors.text,
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '600',
    },
    cardArrow: {
        fontSize: 28,
        color: colors.textLight,
        fontWeight: '300',
        lineHeight: 28,
    },

    progressBar: {
        height: 8,
        backgroundColor: 'rgba(143, 0, 255, 0.1)',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: spacing.sm,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 8,
    },
    progressNote: {
        fontFamily: 'Poppins-Regular',
        color: colors.textLight,
        fontSize: 14,
        lineHeight: 20,
    },

    /* section header */
    sectionHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
        paddingHorizontal: 2,
    },
    sectionTitle: {
        fontFamily: 'Poppins-Bold',
        color: colors.text,
        fontSize: 20,
        lineHeight: 28,
        fontWeight: '700',
    },
    link: {
        fontFamily: 'Poppins-Medium',
        color: colors.primary,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },

    /* services grid */
    servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    serviceTile: {
        width: '47%',
        height: 130,
        borderRadius: spacing.borderRadius.xl,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        padding: spacing.lg,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    serviceIconContainer: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: 'rgba(143, 0, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    serviceEmoji: {
        fontSize: 26,
        lineHeight: 26
    },
    serviceLabel: {
        fontFamily: 'Poppins-Medium',
        color: colors.text,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
    },

    /* appointments */
    appointmentsList: {
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    appointmentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        borderRadius: spacing.borderRadius.xl,
        padding: spacing.lg,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    doctorAvatar: {
        width: 52,
        height: 52,
        borderRadius: 26,
        marginRight: spacing.md
    },
    appointmentInfo: {
        flex: 1
    },
    doctorName: {
        fontFamily: 'Poppins-SemiBold',
        color: colors.text,
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600',
        marginBottom: 2,
    },
    doctorRole: {
        fontFamily: 'Poppins-Regular',
        color: colors.textLight,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 4,
    },
    appointmentMeta: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    appointmentTime: {
        fontFamily: 'Poppins-Regular',
        color: colors.textLight,
        fontSize: 12,
        lineHeight: 16,
        marginBottom: spacing.xs,
    },

    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: 'rgba(46, 204, 113, 0.15)',
    },
    statusText: {
        fontFamily: 'Poppins-Medium',
        color: '#2ecc71',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
    },

    /* deliveries */
    deliveriesList: {
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    deliveryCard: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        borderRadius: spacing.borderRadius.xl,
        padding: spacing.lg,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    deliveryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    orderId: {
        fontFamily: 'Poppins-SemiBold',
        color: colors.text,
        fontSize: 16,
        lineHeight: 22,
        fontWeight: '600',
    },
    deliveryStatusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: 'rgba(155, 89, 182, 0.15)',
    },
    deliveryStatusText: {
        fontFamily: 'Poppins-Medium',
        color: '#9b59b6',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '500',
    },
    etaText: {
        fontFamily: 'Poppins-Regular',
        color: colors.textLight,
        fontSize: 14,
        lineHeight: 20,
        marginBottom: spacing.md,
    },

    deliveryProgressBar: {
        height: 6,
        backgroundColor: 'rgba(143, 0, 255, 0.1)',
        borderRadius: 6,
        overflow: 'hidden',
    },
    deliveryProgressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 6,
    },

    /* Floating AI Agents Button */
    floatingAIButton: {
        position: 'absolute',
        bottom: 80, // Position above tab bar but lower
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#8B5CF6',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
        zIndex: 1000,
    },
    aiButtonInner: {
        width: '100%',
        height: '100%',
        borderRadius: 28,
        backgroundColor: '#A855F7',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    aiButtonIcon: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});