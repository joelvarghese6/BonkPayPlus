import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { TOKENS, Token, Balances } from "../types";

interface TokenInputProps {
    label: string;
    token: string;
    amount: string;
    onAmountChange: (amount: string) => void;
    onMaxPress?: () => void;
    balances: Balances;
    isEditable?: boolean;
}

export const TokenInput: React.FC<TokenInputProps> = ({
    label,
    token,
    amount,
    onAmountChange,
    onMaxPress,
    balances,
    isEditable = true
}) => {
    const tokenData = TOKENS[token];

    return (
        <View style={styles.tokenSection}>
            <View style={styles.tokenHeader}>
                <Text style={styles.tokenLabel}>{label}</Text>
                <Text style={styles.balanceText}>
                    Balance: {balances[token]} {token}
                </Text>
            </View>
            
            <View style={styles.tokenInputContainer}>
                <View style={styles.tokenInfo}>
                    <Text style={styles.tokenIcon}>{tokenData.icon}</Text>
                    <Text style={styles.tokenSymbol}>{token}</Text>
                </View>
                
                <View style={styles.amountContainer}>
                    {isEditable ? (
                        <>
                            <TextInput
                                style={styles.amountInput}
                                placeholder="0"
                                value={amount}
                                onChangeText={onAmountChange}
                                keyboardType="numeric"
                                placeholderTextColor="#999"
                            />
                            {onMaxPress && (
                                <TouchableOpacity onPress={onMaxPress} style={styles.maxButton}>
                                    <Text style={styles.maxButtonText}>MAX</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <Text style={styles.amountDisplay}>{amount || "0"}</Text>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tokenSection: {
        backgroundColor: "#f8f9fa",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    tokenHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    tokenLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    balanceText: {
        fontSize: 14,
        color: "#666",
    },
    tokenInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tokenInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    tokenIcon: {
        fontSize: 24,
    },
    tokenSymbol: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    amountContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    amountInput: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
        textAlign: "right",
        minWidth: 100,
    },
    amountDisplay: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
        textAlign: "right",
        minWidth: 100,
    },
    maxButton: {
        backgroundColor: "#007AFF",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    maxButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
}); 