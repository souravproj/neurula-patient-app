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
        { id: 'ORD-2024-001', eta: 'Arriving today, 2:00 PM', status: 'In Transit', progress: 0.35 },
    ];

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
                    <Text style={styles.searchIcon}>🔍</Text>
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
                    <Pressable hitSlop={8} onPress={() => navigation.navigate('Services')}>
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
                    <Pressable hitSlop={8} onPress={() => navigation.navigate('Appointments')}>
                        <Text style={styles.link}>View All</Text>
                    </Pressable>
                </View>

                <View style={styles.appointmentsList}>
                    {appointments.map((item) => (
                        <View style={styles.appointmentCard} key={item.id}>
                            <Image source={item.avatar} style={styles.doctorAvatar} />
                            <View style={styles.appointmentInfo}>
                                <Text style={styles.doctorName}>{item.name}</Text>
                                <Text style={styles.doctorRole}>{item.role}</Text>
                            </View>

                            <View style={styles.appointmentMeta}>
                                <Text style={styles.appointmentTime}>{item.time}</Text>
                                <View style={styles.statusBadge}>
                                    <Text style={styles.statusText}>{item.status}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Track My Deliveries */}
                <View style={styles.sectionHead}>
                    <Text style={styles.sectionTitle}>Track My Deliveries</Text>
                    <Pressable hitSlop={8} onPress={() => navigation.navigate('Deliveries')}>
                        <Text style={styles.link}>View All</Text>
                    </Pressable>
                </View>

                <View style={styles.deliveriesList}>
                    {deliveries.map((d, idx) => (
                        <View style={styles.deliveryCard} key={`${d.id}-${idx}`}>
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
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ---------------- styles ---------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    },
    watermark: {
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0.05,
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
        ...typography.styles.body,
        color: colors.textLight,
        marginBottom: 4,
        fontSize: 16,
    },
    userName: {
        ...typography.styles.h1,
        color: colors.text,
        fontSize: 24,
        fontWeight: '700',
    },
    headerActions: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginTop: 4,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
    iconTxt: { fontSize: 18 },

    /* search */
    searchWrap: {
        position: 'relative',
        marginBottom: spacing.xl,
    },
    searchInput: {
        height: 52,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        borderRadius: 26,
        paddingLeft: spacing.xl,
        paddingRight: spacing.xl * 2.5,
        color: colors.text,
        ...typography.styles.body,
        fontSize: 16,
    },
    searchIcon: {
        position: 'absolute',
        right: spacing.lg,
        top: 0,
        bottom: 0,
        textAlignVertical: 'center',
        lineHeight: 52,
        fontSize: 18,
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
        ...typography.styles.bodyStrong,
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    cardArrow: {
        fontSize: 24,
        color: colors.textLight,
        fontWeight: '300',
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
        ...typography.styles.caption,
        color: colors.textLight,
        fontSize: 14,
    },

    /* section header */
    sectionHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.styles.h2,
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
    },
    link: {
        ...typography.styles.body,
        color: colors.primary,
        fontSize: 14,
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
        height: 120,
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
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(143, 0, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    serviceEmoji: {
        fontSize: 24,
        lineHeight: 24
    },
    serviceLabel: {
        ...typography.styles.body,
        color: colors.text,
        textAlign: 'center',
        fontSize: 14,
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
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: spacing.md
    },
    appointmentInfo: {
        flex: 1
    },
    doctorName: {
        ...typography.styles.bodyStrong,
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    doctorRole: {
        ...typography.styles.caption,
        color: colors.textLight,
        fontSize: 14,
    },
    appointmentMeta: {
        alignItems: 'flex-end',
        gap: spacing.sm
    },
    appointmentTime: {
        ...typography.styles.caption,
        color: colors.textLight,
        fontSize: 12,
    },

    statusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: 'rgba(46, 204, 113, 0.15)',
    },
    statusText: {
        ...typography.styles.caption,
        color: '#2ecc71',
        fontSize: 12,
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
        ...typography.styles.bodyStrong,
        color: colors.text,
        fontSize: 16,
        fontWeight: '600',
    },
    deliveryStatusBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: 'rgba(155, 89, 182, 0.15)',
    },
    deliveryStatusText: {
        color: '#9b59b6',
        fontSize: 12,
        fontWeight: '500',
    },
    etaText: {
        ...typography.styles.caption,
        color: colors.textLight,
        fontSize: 14,
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
});