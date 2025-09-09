import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
    Text,
    Alert,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { CameraView, Camera } from 'expo-camera';
import { colors, typography, spacing } from '../theme';
import { Button, Icon } from '../components';

export default function ScanEmiratesID() {
    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [capturing, setCapturing] = useState(false);
    const [cameraReady, setCameraReady] = useState(false);
    const cameraRef = useRef(null);

    // Request camera permissions
    useEffect(() => {
        (async () => {
            try {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setHasPermission(status === 'granted');
            } catch (error) {
                console.error('Error requesting camera permissions:', error);
                Alert.alert('Error', 'Failed to request camera permissions');
                setHasPermission(false);
            }
        })();
    }, []);

    // Handle camera ready
    const onCameraReady = () => {
        setCameraReady(true);
    };

    // Handle camera capture
    const handleCapture = async () => {
        if (!cameraReady || capturing || !cameraRef.current) {
            return;
        }

        try {
            setCapturing(true);
            
            // Take picture
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                base64: false,
                skipProcessing: false,
            });

            if (photo && photo.uri) {
                // Navigate to OCR Review with the captured image
                navigation.navigate('OCRReview', {
                    source: 'emirates-id',
                    // For now, using stubbed data - replace with actual OCR processing
                    extracted: {
                        full_name: 'Sourav Test',
                        emirates_id: '784-1987-1234567-1',
                        nationality: 'India',
                        date_of_birth: '1998-03-14',
                        sex: 'M',
                        expiry: '2028-05-31',
                    },
                    imageUri: photo.uri,
                });
            }
        } catch (error) {
            console.error('Error capturing photo:', error);
            Alert.alert('Error', 'Failed to capture photo. Please try again.');
        } finally {
            setCapturing(false);
        }
    };

    // Handle manual entry
    const handleManual = () => navigation.navigate('ManualEntry');

    // Handle close
    const handleClose = () => navigation.goBack();

    // Handle permission denied
    const handlePermissionRequest = async () => {
        try {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        } catch (error) {
            console.error('Error requesting permissions:', error);
            Alert.alert('Error', 'Failed to request camera permissions');
        }
    };

    // Permission denied view
    if (hasPermission === false) {
        return (
            <SafeAreaView style={styles.container}>
                <Pressable
                    onPress={handleClose}
                    hitSlop={10}
                    style={styles.closeBtn}
                    accessibilityRole="button"
                    accessibilityLabel="Close"
                >
                    <Icon name="x" size="medium" color="#FFFFFF" />
                </Pressable>

                <View style={styles.permissionContainer}>
                    <Icon name="camera-off" size="large" color="#FFFFFF" />
                    <Text style={styles.permissionTitle}>Camera Access Required</Text>
                    <Text style={styles.permissionText}>
                        We need access to your camera to scan your Emirates ID. 
                        Please grant camera permissions to continue.
                    </Text>
                    
                    <Button
                        title="Grant Permission"
                        onPress={handlePermissionRequest}
                        variant="primary"
                        style={styles.permissionButton}
                    />

                    <Button
                        title="Enter Manually Instead"
                        onPress={handleManual}
                        variant="outline"
                        style={styles.manualButton}
                    />
                </View>
            </SafeAreaView>
        );
    }

    // Loading view while checking permissions
    if (hasPermission === null) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={styles.loadingText}>Initializing camera...</Text>
                </View>
            </SafeAreaView>
        );
    }

    // Main camera view
    return (
        <SafeAreaView style={styles.container}>
            {/* Close button */}
            <Pressable
                onPress={handleClose}
                hitSlop={10}
                style={styles.closeBtn}
                accessibilityRole="button"
                accessibilityLabel="Close"
            >
                <Icon name="x" size="medium" color="#FFFFFF" />
            </Pressable>

            {/* Camera view */}
            <View style={styles.cameraContainer}>
                <CameraView
                    style={styles.camera}
                    facing="back"
                    onCameraReady={onCameraReady}
                    ref={cameraRef}
                >
                    {/* Camera overlay */}
                    <View style={styles.overlay}>
                        {/* Top section with instructions */}
                        <View style={styles.topSection}>
                            <Text style={styles.title}>Scan Emirates ID</Text>
                            <Text style={styles.subtitle}>
                                Position your Emirates ID within the frame
                            </Text>
                        </View>

                        {/* Middle section with frame */}
                        <View style={styles.middleSection}>
                            <View style={styles.scanFrame}>
                                <View style={styles.frameCorner} style={[styles.frameCorner, styles.topLeft]} />
                                <View style={styles.frameCorner} style={[styles.frameCorner, styles.topRight]} />
                                <View style={styles.frameCorner} style={[styles.frameCorner, styles.bottomLeft]} />
                                <View style={styles.frameCorner} style={[styles.frameCorner, styles.bottomRight]} />
                                
                                <View style={styles.frameCenter}>
                                    <Icon name="credit-card" size="large" color="rgba(255,255,255,0.5)" />
                                </View>
                            </View>
                        </View>

                        {/* Bottom section with controls */}
                        <View style={styles.bottomSection}>
                            <Text style={styles.helperText}>
                                Make sure your Emirates ID is clearly visible and well-lit
                            </Text>

                            <View style={styles.controls}>
                                <Button
                                    title={capturing ? "" : "Capture"}
                                    onPress={handleCapture}
                                    disabled={capturing || !cameraReady}
                                    variant="primary"
                                    style={[styles.captureBtn, (capturing || !cameraReady) && { opacity: 0.7 }]}
                                    accessibilityLabel="Capture Emirates ID"
                                >
                                    {capturing && (
                                        <ActivityIndicator size="small" color={colors.background} />
                                    )}
                                </Button>

                                <Button
                                    title="Enter Manually"
                                    onPress={handleManual}
                                    variant="outline"
                                    style={styles.manualButton}
                                    accessibilityLabel="Enter details manually instead"
                                />
                            </View>
                        </View>
                    </View>
                </CameraView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    closeBtn: {
        position: 'absolute',
        right: spacing.lg,
        top: spacing.lg,
        zIndex: 20,
    },

    // Permission views
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        gap: spacing.lg,
    },
    permissionTitle: {
        ...typography.styles.h2,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: spacing.lg,
    },
    permissionText: {
        ...typography.styles.body,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 24,
    },
    permissionButton: {
        marginTop: spacing.xl,
        minWidth: 200,
    },

    // Loading view
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.lg,
    },
    loadingText: {
        ...typography.styles.body,
        color: '#FFFFFF',
    },

    // Camera view
    cameraContainer: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },

    // Camera overlay
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing['6xl'],
        paddingBottom: spacing.xl,
    },

    // Top section
    topSection: {
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    title: {
        ...typography.styles.h1,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.styles.body,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
    },

    // Middle section with scan frame
    middleSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrame: {
        width: '85%',
        aspectRatio: 1.6, // Credit card aspect ratio
        position: 'relative',
    },
    frameCorner: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderColor: '#FFFFFF',
        borderWidth: 3,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderBottomWidth: 0,
        borderRightWidth: 0,
    },
    topRight: {
        top: 0,
        right: 0,
        borderBottomWidth: 0,
        borderLeftWidth: 0,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
    },
    frameCenter: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -15 }, { translateY: -15 }],
    },

    // Bottom section
    bottomSection: {
        alignItems: 'center',
        paddingTop: spacing.lg,
    },
    helperText: {
        ...typography.styles.caption,
        color: 'rgba(255,255,255,0.7)',
        textAlign: 'center',
        marginBottom: spacing.xl,
        lineHeight: 18,
    },
    controls: {
        width: '100%',
        gap: spacing.lg,
    },
    captureBtn: {
        height: 56,
        borderRadius: spacing.borderRadius['3xl'],
    },
    manualButton: {
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        height: 48,
    },
});