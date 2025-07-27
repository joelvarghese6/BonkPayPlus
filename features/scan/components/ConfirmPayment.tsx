import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, Animated, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { usePaymentModal } from '@/features/scan/store/PaymentModal';

const ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const AMOUNT = '0.1421';
const FIAT = '$8.05';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_WIDTH = SCREEN_WIDTH * 0.7;

const THUMB_SIZE = 64;
const TRACK_HEIGHT = 64;

type ConfirmPaymentProps = {
  visible?: boolean;
  onClose?: () => void;
  data: {
    amount: string;
    to: string;
  };
};

const ConfirmPayment = ({ visible = true, onClose, data }: ConfirmPaymentProps) => {

    const { closePaymentModal } = usePaymentModal();
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%'], []);
    const [swiped, setSwiped] = useState(false);
    const translateX = useRef(new Animated.Value(0)).current;

    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
        if (index === 0 && onClose) onClose();
    }, [onClose]);

    // Thumb movement limited to track width minus thumb size
    const TRACK_WIDTH = SWIPE_WIDTH;
    const MAX_TRANSLATE = TRACK_WIDTH - THUMB_SIZE;

    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX } }],
        { useNativeDriver: false }
    );

    const onHandlerStateChange = (event: any) => {
        if (event.nativeEvent.state === State.END) {
            let finalX = event.nativeEvent.translationX;
            if (finalX > MAX_TRANSLATE * 0.85) { 
                setSwiped(true);
                Animated.timing(translateX, {
                    toValue: MAX_TRANSLATE,
                    duration: 150,
                    useNativeDriver: false,
                }).start(() => {
                    Alert.alert('Approved', 'Payment approved!');
                    router.replace('/dashboard/home');
                    bottomSheetRef.current?.close();
                    closePaymentModal();
                    setTimeout(() => {
                        setSwiped(false);
                        translateX.setValue(0);
                    }, 1000);
                });
            } else {
                Animated.spring(translateX, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start();
            }
        }
    };

    // Clamp thumb position
    const thumbTranslate = translateX.interpolate({
        inputRange: [0, MAX_TRANSLATE],
        outputRange: [0, MAX_TRANSLATE],
        extrapolate: 'clamp',
    });

    return (
        <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}
            index={1}
        >
            <BottomSheetView style={styles.contentContainer}>
                <Text style={styles.sendText}>Send</Text>
                <View style={styles.iconCircle}>
                    <Ionicons name="logo-usd" size={36} color="#222" />
                </View>
                <Text style={styles.amountText}>{data.amount}</Text>
                <Text style={styles.fiatText}>{FIAT}</Text>
                <Text style={styles.toLabel}>To</Text>
                <Text style={styles.addressText} numberOfLines={1} ellipsizeMode="middle">
                    {data.to.slice(0, 6)}...{data.to.slice(-4)}
                </Text>
                <View style={styles.swipeContainer}>
                    <View style={styles.swipeTrack}>
                        <Text style={styles.swipeTextTrack}>Swipe to Approve</Text>
                        <PanGestureHandler
                            onGestureEvent={onGestureEvent}
                            onHandlerStateChange={onHandlerStateChange}
                            enabled={!swiped}
                        >
                            <Animated.View
                                style={[
                                    styles.swipeThumb,
                                    {
                                        transform: [{ translateX: thumbTranslate }],
                                        opacity: swiped ? 0.5 : 1,
                                    },
                                ]}
                            >
                                <Ionicons name="arrow-forward" size={28} color="#fff" />
                            </Animated.View>
                        </PanGestureHandler>
                    </View>
                </View>
            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 36,
        justifyContent: 'center',
    },
    sendText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#222',
        marginBottom: 18,
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#f5f7ff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
    },
    amountText: {
        fontSize: 32,
        fontWeight: '600',
        color: '#111',
        marginBottom: 4,
    },
    fiatText: {
        fontSize: 18,
        color: '#888',
        fontWeight: '400',
        marginBottom: 18,
    },
    toLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 2,
    },
    addressText: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
        marginBottom: 28,
    },
    swipeContainer: {
        width: SWIPE_WIDTH,
        alignItems: 'center',
        marginTop: 12,
    },
    swipeTrack: {
        width: SWIPE_WIDTH,
        height: TRACK_HEIGHT,
        backgroundColor: '#222',
        borderRadius: TRACK_HEIGHT / 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    swipeTextTrack: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        zIndex: 1,
    },
    swipeThumb: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: THUMB_SIZE,
        height: THUMB_SIZE,
        borderRadius: THUMB_SIZE / 2,
        backgroundColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 3,
    },
});

export default ConfirmPayment;