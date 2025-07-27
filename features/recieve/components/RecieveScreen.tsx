import { useRecieveModal } from "@/features/recieve/store/RecieveModal";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function formatFiat(amount: string) {
    const num = parseFloat(amount);
    if (!amount || isNaN(num)) return "$0.00";
    // Example conversion, replace with real rate if needed
    return `$${(num * 1).toFixed(2)}`;
}

export default function RecieveScreen() {

    const { closeRecieveModal } = useRecieveModal();

    const [amount, setAmount] = useState("0");

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "#fff" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.topBar}>
                <Pressable style={styles.backButton} onPress={closeRecieveModal}>
                    <Ionicons name="arrow-back" size={28} color="#222" />
                </Pressable>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} pointerEvents="none">
                    <Text style={styles.recipientLabel} numberOfLines={1} ellipsizeMode="middle">
                        Recieve
                    </Text>
                </View>
            </View>

            <View style={styles.amountContainer}>
                <Text style={styles.amountInput} numberOfLines={1}>
                    {amount ? amount : <Text style={styles.amountZero}>0</Text>}
                    <Text style={styles.amountCurrency}>SOL</Text>
                </Text>
                <Text style={styles.fiatEquivalent}>{formatFiat(amount)}</Text>
            </View>

            <Pressable
                style={{ backgroundColor: '#ccc' }}
                disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
            >
                <Text style={styles.continueText}>Continue</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
        marginBottom: 16,
        minHeight: 48,
    },
    backButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#f5f7ff',
        marginRight: 8,
    },
    recipientLabel: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        marginHorizontal: 0,
        maxWidth: '80%',
    },
    amountContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    amountInput: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#222',
        textAlign: 'center',
    },
    amountZero: {
        fontSize: 64,
        color: '#bbb',
        fontWeight: 'bold',
    },
    amountCurrency: {
        fontSize: 24,
        color: '#888',
        fontWeight: '600',
        marginLeft: 4,
    },
    continueText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    fiatEquivalent: {
        fontSize: 18,
        color: '#aaa',
        fontWeight: '400',
        marginTop: 2,
        marginBottom: 12,
    },
})