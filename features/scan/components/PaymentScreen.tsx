import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import ConfirmPayment from "@/features/scan/components/ConfirmPayment";
import { usePaymentModal } from "../store/PaymentModal";
import BottomSheet from "@gorhom/bottom-sheet";
import { SolanaPayUrlData } from "../utils/solanaPayValidation";
import { LoadingScreen } from "@/components/LoadingScreen";

type PaymentScreenProps = {
    data?: SolanaPayUrlData;
    recipient?: string;
};

const KEYS = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    [".", "0", "del"]
];

function formatFiat(amount: string) {
    const num = parseFloat(amount);
    if (!amount || isNaN(num)) return "$0.00";
    // Example conversion, replace with real rate if needed
    return `$${(num * 1).toFixed(2)}`;
}

export const PaymentScreen = ({ data, recipient }: PaymentScreenProps) => {

    const dataAmount = data ? data?.amount : "0";

    const [amount, setAmount] = useState(data?.amount || "0");

    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleOpen = () => {
        bottomSheetRef.current?.expand();
    };

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };

    const { closePaymentModal } = usePaymentModal();

    const handleKeyPress = (key: string) => {
        if (key === "del") {
            setAmount(a => a.slice(0, -1));
        } else if (key === ".") {
            if (!amount.includes(".")) setAmount(a => a ? a + "." : "0.");
        } else {
            // Only allow up to 2 decimals
            if (amount.includes(".")) {
                const [int, dec] = amount.split(".");
                if (dec.length >= 2) return;
            }
            setAmount(a => (a === "0" ? key : a + key));
        }
    };

    if (!data && !recipient) {
        return <LoadingScreen />
    }
    
    // Use parsed data recipient if available, otherwise fall back to prop
    const actualRecipient = recipient || data?.recipient || "";

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Pressable style={styles.backButton} onPress={closePaymentModal}>
                    <Ionicons name="arrow-back" size={28} color="#222" />
                </Pressable>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} pointerEvents="none">
                    <Text style={styles.recipientLabel} numberOfLines={1} ellipsizeMode="middle">
                        Send to {actualRecipient}
                    </Text>
                </View>
            </View>

            {/* Amount Input */}
            <View style={styles.amountContainer}>
                <Text style={styles.amountInput} numberOfLines={1}>
                    {amount ? amount : <Text style={styles.amountZero}>0</Text>}
                    <Text style={styles.amountCurrency}>SOL</Text>
                </Text>
                <Text style={styles.fiatEquivalent}>{formatFiat(amount)}</Text>
            </View>

            {/* Keyboard and Continue Button */}
            <View style={styles.bottomSection}>
                <View style={styles.keyboardContainer}>
                    {KEYS.map((row, i) => (
                        <View key={i} style={styles.keyboardRow}>
                            {row.map((key) => (
                                <Pressable
                                    key={key}
                                    style={styles.keyButton}
                                    onPress={() => handleKeyPress(key)}
                                    disabled={key === "." && amount.includes(".")}
                                >
                                    {key === "del" ? (
                                        <Ionicons name="backspace-outline" size={28} color="black" />
                                    ) : (
                                        <Text style={styles.keyText}>{key}</Text>
                                    )}
                                </Pressable>
                            ))}
                        </View>
                    ))}
                </View>
                <View style={styles.keyboardRow}>
                    <Pressable
                        style={[styles.continueButton, (!amount || isNaN(Number(amount)) || Number(amount) <= 0) && { backgroundColor: '#ccc' }]}
                        onPress={handleOpen}
                        disabled={!amount || isNaN(Number(amount)) || Number(amount) <= 0}
                    >
                        <Text style={styles.continueText}>Continue</Text>
                    </Pressable>
                </View>
            </View>
            <ConfirmPayment data={{ amount, to: actualRecipient }} ref={bottomSheetRef} onClose={handleClose} />
        </SafeAreaView>
    );
};

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
    fiatEquivalent: {
        fontSize: 18,
        color: '#aaa',
        fontWeight: '400',
        marginTop: 2,
        marginBottom: 12,
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    keyboardContainer: {
        marginTop: 0,
        marginBottom: 0,
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        width: '100%',
    },
    keyboardRow: {
        flexDirection: 'row',
        marginBottom: 10,
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    keyButton: {
        flex: 1,
        height: 44,
        marginHorizontal: 6,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 1,
    },
    keyText: {
        fontSize: 28,
        color: 'black',
        fontWeight: '600',
    },
    continueButton: {
        flex: 1,
        marginTop: 16,
        marginBottom: 32,
        backgroundColor: 'black',
        borderRadius: 12,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    continueText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

