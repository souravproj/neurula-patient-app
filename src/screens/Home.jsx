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
import { colors, typography, spacing } from '../theme';

// Soft background art (same pattern as other screens)
const BG_WATERMARK = require('../../assets/background.png');
const AVATAR_1 = require('../../assets/logo1.png');
const AVATAR_2 = require('../../assets/logo2.png');
const AVATAR_3 = require('../../assets/logo3.png');

export default function Home() {
    const navigation = useNavigation();

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
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.headerRow}>
                    <View>
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
                <View style={styles.card}>
                    <View style={styles.cardRowBetween}>
                        <Text style={styles.cardTitle}>Complete Your Profile</Text>
                        <Pressable hitSlop={8}><Text style={styles.cardKebab}>⋯</Text></Pressable>
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

                <View style={styles.grid}>
                    {services.map((s) => (
                        <Pressable key={s.key} style={styles.serviceTile} onPress={s.onPress}>
                            <View style={styles.serviceIcon}><Text style={styles.serviceEmoji}>{s.icon}</Text></View>
                            <Text style={styles.serviceText}>{s.label}</Text>
                        </Pressable>
                    ))}
                </View>

                {/* Floating smile button (assistant/help) */}
                <Pressable style={styles.fab} onPress={() => navigation.navigate('Assistant')}>
                    <Text style={styles.fabSmile}>😊</Text>
                </Pressable>

                {/* Upcoming Appointments */}
                <View style={styles.sectionHead}>
                    <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                    <Pressable hitSlop={8} onPress={() => navigation.navigate('Appointments')}>
                        <Text style={styles.link}>View All</Text>
                    </Pressable>
                </View>

                <View style={{ gap: spacing.sm }}>
                    {appointments.map((item) => (
                        <View style={styles.listCard} key={item.id}>
                            <Image source={item.avatar} style={styles.avatar} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.listTitle}>{item.name}</Text>
                                <Text style={styles.listSub}>{item.role}</Text>
                            </View>

                            <View style={styles.rightMeta}>
                                <Text style={styles.timeTxt}>{item.time}</Text>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeTxt}>{item.status}</Text>
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

                <View style={{ gap: spacing.sm, marginBottom: spacing['3xl'] }}>
                    {deliveries.map((d, idx) => (
                        <View style={styles.orderCard} key={`${d.id}-${idx}`}>
                            <Text style={styles.orderId}>{d.id}</Text>
                            <View style={styles.orderMetaRow}>
                                <Text style={styles.etaTxt}>{d.eta}</Text>
                                <View style={[styles.badge, styles.badgeTransit]}>
                                    <Text style={[styles.badgeTxt, styles.badgeTransitTxt]}>{d.status}</Text>
                                </View>
                            </View>
                            <View style={styles.progressBarThin}>
                                <View style={[styles.progressFillThin, { width: `${Math.round(d.progress * 100)}%` }]} />
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ---------------- styles ---------------- */
const TILE_SIZE = '48%';

const styles = StyleSheet.create({
    container: { flex: 1 },
    watermark: {
        position: 'absolute',
        pointerEvents: 'none',
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: spacing['2xl'],
    },

    /* header */
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    hello: { ...typography.styles.caption, color: colors.textLight, marginBottom: 2 },
    userName: { ...typography.styles.h1, color: colors.text },
    headerActions: { marginLeft: 'auto', flexDirection: 'row', gap: spacing.sm },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 2,
    },
    iconTxt: { fontSize: 16 },

    /* search */
    searchWrap: {
        position: 'relative',
        marginBottom: spacing.lg,
    },
    searchInput: {
        height: spacing.component.inputHeight,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        borderRadius: spacing.borderRadius['3xl'],
        paddingLeft: spacing.xl,
        paddingRight: spacing.xl * 2,
        color: colors.text,
        ...typography.styles.body,
    },
    searchIcon: {
        position: 'absolute',
        right: spacing.md,
        top: 0,
        bottom: 0,
        textAlignVertical: 'center',
        lineHeight: spacing.component.inputHeight,
        opacity: 0.75,
    },

    /* cards */
    card: {
        backgroundColor: colors.glassMorphism,
        borderColor: colors.borderGradient,
        borderWidth: 1,
        borderRadius: spacing.borderRadius['2xl'],
        padding: spacing.lg,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 16,
        elevation: 4,
        marginBottom: spacing.lg,
    },
    cardRowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    cardTitle: { ...typography.styles.bodyStrong, color: colors.text },
    cardKebab: { fontSize: 18, color: colors.textLight },

    progressBar: {
        height: 10,
        backgroundColor: 'rgba(143, 0, 255, 0.08)',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: spacing.md,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 10,
    },
    progressNote: {
        ...typography.styles.caption,
        color: colors.textLight,
        marginTop: spacing.xs,
    },

    /* section header */
    sectionHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.lg,
        marginBottom: spacing.md,
    },
    sectionTitle: { ...typography.styles.h2, color: colors.text },
    link: { ...typography.styles.body, color: colors.link, textDecorationLine: 'underline' },

    /* services grid */
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    serviceTile: {
        width: TILE_SIZE,
        height: 100,
        borderRadius: spacing.borderRadius.xl,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        padding: spacing.md,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 3,
        justifyContent: 'space-between',
    },
    serviceIcon: {
        width: 38, height: 38, borderRadius: 12,
        backgroundColor: colors.glassMorphism,
        borderWidth: 1, borderColor: colors.borderGradient,
        alignItems: 'center', justifyContent: 'center',
    },
    serviceEmoji: { fontSize: 20, lineHeight: 22 },
    serviceText: { ...typography.styles.body, color: colors.text },

    /* floating smile button placed after grid */
    fab: {
        alignSelf: 'flex-end',
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: colors.primary,
        alignItems: 'center', justifyContent: 'center',
        shadowColor: colors.shadow, shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25, shadowRadius: 12, elevation: 5,
        marginRight: spacing.sm, marginBottom: spacing.md,
    },
    fabSmile: { fontSize: 18, color: colors.background },

    /* upcoming appointments */
    listCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        borderRadius: spacing.borderRadius.xl,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 2,
    },
    avatar: { width: 44, height: 44, borderRadius: 22, marginRight: spacing.md },
    listTitle: { ...typography.styles.bodyStrong, color: colors.text },
    listSub: { ...typography.styles.caption, color: colors.textLight, marginTop: 2 },
    rightMeta: { alignItems: 'flex-end', gap: 6, marginLeft: spacing.md },
    timeTxt: { ...typography.styles.caption, color: colors.textLight },

    badge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: 'rgba(46, 204, 113, 0.15)',
        borderWidth: 1,
        borderColor: 'rgba(46, 204, 113, 0.35)',
    },
    badgeTxt: { ...typography.styles.caption, color: '#2ecc71' },

    /* deliveries */
    orderCard: {
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: colors.borderGradient,
        borderRadius: spacing.borderRadius.xl,
        padding: spacing.md,
        shadowColor: colors.shadowGlass,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 2,
    },
    orderId: { ...typography.styles.bodyStrong, color: colors.text, marginBottom: spacing.xs },
    orderMetaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.sm },
    etaTxt: { ...typography.styles.caption, color: colors.textLight },

    badgeTransit: {
        backgroundColor: 'rgba(155, 89, 182, 0.12)',
        borderColor: 'rgba(155, 89, 182, 0.35)',
    },
    badgeTransitTxt: { color: '#9b59b6' },

    progressBarThin: {
        height: 6,
        backgroundColor: 'rgba(143, 0, 255, 0.08)',
        borderRadius: 6,
        overflow: 'hidden',
    },
    progressFillThin: {
        height: '100%',
        backgroundColor: colors.primary,
    },
});
