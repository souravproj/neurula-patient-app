// File: src/navigation/BottomTabs.jsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../theme';
import { Icon } from '../components';

// Import your actual screens
import Home from '../screens/Home';
// Placeholder components for other screens - replace with your actual screens
const Booking = () => <View style={{ flex: 1, backgroundColor: colors.background }} />;
const Inbox = () => <View style={{ flex: 1, backgroundColor: colors.background }} />;
const Profile = () => <View style={{ flex: 1, backgroundColor: colors.background }} />;
const QuickAction = () => <View style={{ flex: 1, backgroundColor: colors.background }} />;

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CurvedTabBar {...props} />}
            initialRouteName="Home"
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Booking" component={Booking} />
            <Tab.Screen
                name="QuickAction"
                component={QuickAction}
                options={{ tabBarButton: () => null }} // Hide from normal tab flow
            />
            <Tab.Screen name="Inbox" component={Inbox} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

function CurvedTabBar({ state, descriptors, navigation }) {
    const insets = useSafeAreaInsets();
    const barHeight = spacing.component.tabBarHeight; // ≈ 80

    // Filter out QuickAction from normal tabs
    const visibleRoutes = state.routes.filter(route => route.name !== 'QuickAction');

    const handleCenterPress = () => {
        navigation.navigate('QuickAction');
    };

    const getIconName = (routeName) => {
        switch (routeName) {
            case 'Home': return 'home';
            case 'Booking': return 'calendar';
            case 'Inbox': return 'message-square';
            case 'Profile': return 'user';
            default: return 'home';
        }
    };

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
            {/* Main tab bar background */}
            <View style={[styles.tabBar, { height: barHeight - 12 }]}>
                {visibleRoutes.map((route, index) => {
                    const routeIndex = state.routes.findIndex(r => r.key === route.key);
                    const isFocused = state.index === routeIndex;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const iconName = getIconName(route.name);
                    const iconColor = isFocused ? colors.primary : styles.inactiveColor;
                    const labelColor = isFocused ? colors.primary : styles.inactiveColor;

                    return (
                        <Pressable
                            key={route.key}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
                            testID={descriptors[route.key].options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.tabItem}
                            android_ripple={{
                                color: colors.primary + '20',
                                radius: 32,
                                borderless: true
                            }}
                        >
                            <View style={styles.tabContent}>
                                <Icon
                                    name={iconName}
                                    size="medium"
                                    color={iconColor}
                                />
                                <Text style={[styles.tabLabel, { color: labelColor }]}>
                                    {route.name}
                                </Text>
                            </View>
                        </Pressable>
                    );
                })}
            </View>

            {/* Floating center action button */}
            <Pressable
                onPress={handleCenterPress}
                accessibilityRole="button"
                accessibilityLabel="Quick Action"
                style={styles.centerButtonContainer}
                android_ripple={{
                    color: 'rgba(255, 255, 255, 0.3)',
                    radius: 36,
                    borderless: true
                }}
            >
                <View style={styles.centerButtonRing}>
                    <View style={styles.centerButton}>
                        <Icon name="sparkles" size="medium" color="#FFFFFF" />
                    </View>
                </View>
            </Pressable>
        </View>
    );
}

const CENTER_BUTTON_SIZE = 64;
const CENTER_RING_SIZE = CENTER_BUTTON_SIZE + 12; // 6px ring on each side

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        pointerEvents: 'box-none', // Allow touches to pass through transparent areas
    },

    tabBar: {
        width: '92%',
        backgroundColor: '#FFFFFF', // Pure white background
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
        paddingBottom: spacing.lg,

        // Soft shadow matching iOS design
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 16,

        // Ensure proper border rendering
        borderWidth: 0,
    },

    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.xs,
        minHeight: 44, // Minimum touch target
        minWidth: 44,
    },

    tabContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    tabLabel: {
        ...typography.styles.caption,
        fontSize: 12,
        fontWeight: '500',
        marginTop: 4,
        textAlign: 'center',
        lineHeight: 14,
    },

    centerButtonContainer: {
        position: 'absolute',
        top: -(CENTER_RING_SIZE / 2), // Overlap the bar by ~50%
        alignItems: 'center',
        justifyContent: 'center',
        width: CENTER_RING_SIZE + 16, // Extra touch area
        height: CENTER_RING_SIZE + 16,
    },

    centerButtonRing: {
        width: CENTER_RING_SIZE,
        height: CENTER_RING_SIZE,
        borderRadius: CENTER_RING_SIZE / 2,
        backgroundColor: '#2A1F3D', // Dark purple ring
        alignItems: 'center',
        justifyContent: 'center',

        // Enhanced shadow for floating effect
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: Platform.select({ ios: 0.3, android: 0.4 }),
        shadowRadius: 16,
        elevation: 20,
    },

    centerButton: {
        width: CENTER_BUTTON_SIZE,
        height: CENTER_BUTTON_SIZE,
        borderRadius: CENTER_BUTTON_SIZE / 2,
        backgroundColor: colors.primary, // Brand purple
        alignItems: 'center',
        justifyContent: 'center',

        // Inner shadow for depth
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },

    // Define inactive color as a constant
    inactiveColor: '#8593A0', // Muted gray for inactive states
});