import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Pressable, Alert } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { router } from "expo-router";

export default function Onramp() {
    const [amount, setAmount] = useState("");

    const handleBackPress = () => {
        router.back();
    };

    const handleBuySol = async () => {
        try {
            // Use a direct Coinbase onramp URL that works in React Native
            const projectId = '829c3cbc-12a2-42be-877f-b743931b08a5';
            const onrampUrl = `https://pay.coinbase.com/buy/select-asset?appId=${projectId}&destinationWallets[SOLANA]=&presetFiatAmount=${amount || 20}&presetFiatCurrency=USD&presetCryptoAmount=&presetCryptoCurrency=SOL`;
            
            const canOpen = await Linking.canOpenURL(onrampUrl);
            if (canOpen) {
                await Linking.openURL(onrampUrl);
            } else {
                Alert.alert("Error", "Cannot open Coinbase onramp URL");
            }
        } catch (error) {
            console.error('Error opening onramp URL:', error);
            Alert.alert("Error", "Failed to open onramp service");
        }
    };

    const isButtonDisabled = !amount || parseFloat(amount) <= 0.01;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text style={styles.title}>BUY SOL</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.inputLabel}>Amount</Text>
                <TextInput
                    style={styles.amountInput}
                    placeholder="Enter amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity
                    style={[styles.buyButton, isButtonDisabled && styles.buyButtonDisabled]}
                    onPress={handleBuySol}
                    disabled={isButtonDisabled}
                >
                    <Text style={[styles.buyButtonText, isButtonDisabled && styles.buyButtonTextDisabled]}>
                        Buy SOL
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    placeholder: {
        width: 40, // Same width as back button for centering
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 32,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 8,
        marginLeft: 4,
    },
    amountInput: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        marginBottom: 30,
        backgroundColor: "#f9f9f9",
    },
    buyButton: {
        backgroundColor: "#007AFF",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
    },
    buyButtonDisabled: {
        backgroundColor: "#ccc",
    },
    buyButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    buyButtonTextDisabled: {
        color: "#999",
    },
});