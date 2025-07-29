import { router } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, Pressable, TextInput, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Staking() {
    const [amount, setAmount] = useState("");
    const maxAmount = "0.124574";

    const handleBackPress = () => {
        router.back();
    };

    const handleStake = () => {
        Alert.alert("Stake", `Staking ${amount} SOL`);
    };

    const isStakeDisabled = parseFloat(amount) <= 0.01 || amount === "";
    
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text style={styles.title}>Stake SOL</Text>
                <View style={styles.placeholder} />
            </View>

            <KeyboardAvoidingView 
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                {/* Content */}
                <View style={styles.content}>
                    {/* Amount Input Section */}
                    <View style={styles.inputSection}>
                        <View style={styles.inputHeader}>
                            <Text style={styles.inputLabel}>Amount</Text>
                            <Text style={styles.maxAmount}>max: {maxAmount}</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="0"
                            value={amount}
                            onChangeText={setAmount}
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* Validator Section */}
                    <View style={styles.validatorSection}>
                        <Text style={styles.validatorHeader}>Validator</Text>
                        
                        <View style={styles.validatorItem}>
                            <View style={styles.validatorInfo}>
                                <View style={styles.validatorNameRow}>
                                    <Ionicons name="flash" size={20} color="#FF6B35" />
                                    <Text style={styles.validatorName}>Solflare</Text>
                                </View>
                                <Text style={styles.apyText}>6.52% APY</Text>
                            </View>
                        </View>

                        <View style={styles.separator} />

                        <View style={styles.stakeInfo}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Annual Return</Text>
                                <Text style={styles.infoValue}>0.0065 SOL</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Total Stake</Text>
                                <Text style={styles.infoValue}>0.124574 SOL</Text>
                            </View>
                        </View>
                    </View>

                    {/* Stake Button */}
                    <Pressable 
                        style={[styles.stakeButton, isStakeDisabled && styles.stakeButtonDisabled]}
                        onPress={handleStake}
                        disabled={isStakeDisabled}
                    >
                        <Text style={[styles.stakeButtonText, isStakeDisabled && styles.stakeButtonTextDisabled]}>
                            Stake
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    keyboardAvoidingView: {
        flex: 1,
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
        flex: 1,
        padding: 16,
    },
    inputSection: {
        marginBottom: 24,
    },
    inputHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    maxAmount: {
        fontSize: 14,
        color: "#666",
    },
    input: {
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    validatorSection: {
        marginBottom: 24,
    },
    validatorHeader: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        marginBottom: 12,
    },
    validatorItem: {
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    validatorInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    validatorNameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    validatorName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    apyText: {
        fontSize: 14,
        color: "#28a745",
        fontWeight: "600",
    },
    separator: {
        height: 1,
        backgroundColor: "#e0e0e0",
        marginVertical: 12,
    },
    stakeInfo: {
        gap: 8,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    infoLabel: {
        fontSize: 14,
        color: "#666",
    },
    infoValue: {
        fontSize: 14,
        color: "#000",
        fontWeight: "500",
    },
    stakeButton: {
        backgroundColor: "#007AFF",
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
        marginTop: "auto",
    },
    stakeButtonDisabled: {
        backgroundColor: "#e0e0e0",
    },
    stakeButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    stakeButtonTextDisabled: {
        color: "#999",
    },
});