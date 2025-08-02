import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { usePaymentModal } from '@/features/scan/store/PaymentModal';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useEmbeddedSolanaWallet } from '@privy-io/expo';
import { useSendTokens } from '@/features/solana/hooks/useSendTokens';


const ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';
const AMOUNT = '0.1421';
const FIAT = '$8.05';

type ConfirmPaymentProps = {
    ref: React.RefObject<BottomSheet | null>;
    onClose?: () => void;
    data: {
        amount: string;
        to: string;
    };
};



const ConfirmPayment = ({ ref, onClose, data }: ConfirmPaymentProps) => {

    const { sendSol, isLoading, error } = useSendTokens();

    const { closePaymentModal } = usePaymentModal();

    const snapPoints = useMemo(() => ['50%'], []);

    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
        if (index === 0 && onClose) onClose();
    }, [onClose]);

    const handleConfirm = async () => {
        const signature = await sendSol(data.amount, data.to);
        console.log('signature', signature);
        if (error) {
            Alert.alert('Error', error);
            return;
        }
        router.replace('/dashboard/home');
        ref.current?.close();
        closePaymentModal();
        Alert.alert('Approved', 'Payment approved!');
    };

    const handleCancel = () => {
        ref.current?.close();
        closePaymentModal();
    };

    return (
        <BottomSheet
            ref={ref}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}
            index={-1}
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
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
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 12,
    },
    cancelButton: {
        flex: 1,
        height: 56,
        backgroundColor: '#f5f5f5',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    confirmButton: {
        flex: 1,
        height: 56,
        backgroundColor: '#222',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
});

export default ConfirmPayment;