import React, { useState, useMemo } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Pressable, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { PublicKey } from "@solana/web3.js";
import { PaymentScreen } from "@/features/scan/components/PaymentScreen";
import { usePaymentModal } from "@/features/scan/store/PaymentModal";

export default function SendToAddress() {

    const [publicKeyInput, setPublicKeyInput] = useState("");

    const { isOpen, closePaymentModal, OpenPaymentModal } = usePaymentModal();

    // Validate Solana public key
    const isValidPublicKey = useMemo(() => {
        if (!publicKeyInput.trim()) return false;
        try {
            new PublicKey(publicKeyInput.trim());
            return true;
        } catch (error) {
            return false;
        }
    }, [publicKeyInput]);

    const handleBackPress = () => {
        router.push("/dashboard/home");
    };

    const handleSendPress = () => {
        if (isValidPublicKey) {
            // TODO: Implement send functionality
            console.log("Sending to:", publicKeyInput.trim());
            OpenPaymentModal();
        }
    };

    console.log("modal open", isOpen);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text style={styles.title}>Send to Public key</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Public Key</Text>
                    <TextInput
                        style={styles.input}
                        value={publicKeyInput}
                        onChangeText={setPublicKeyInput}
                        placeholder="Enter Solana public key"
                        placeholderTextColor="#999"
                        autoCapitalize="none"
                        autoCorrect={false}
                        multiline={false}
                    />
                </View>

                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        !isValidPublicKey && styles.sendButtonDisabled
                    ]}
                    onPress={handleSendPress}
                    disabled={!isValidPublicKey}
                >
                    <Text style={[
                        styles.sendButtonText,
                        !isValidPublicKey && styles.sendButtonTextDisabled
                    ]}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal visible={isOpen} onRequestClose={closePaymentModal}>
                <PaymentScreen recipient={publicKeyInput.trim()} />
            </Modal>
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
        padding: 20,
        paddingTop: 20,
    },
    inputContainer: {
        marginBottom: 32,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
        color: "#000",
    },
    sendButton: {
        backgroundColor: "#ff00c3",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    sendButtonDisabled: {
        backgroundColor: "#e0e0e0",
    },
    sendButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    sendButtonTextDisabled: {
        color: "#999",
    },
});