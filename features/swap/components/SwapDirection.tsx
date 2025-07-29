import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SwapDirectionProps {
    fromToken: string;
    toToken: string;
}

export const SwapDirection: React.FC<SwapDirectionProps> = ({ fromToken, toToken }) => {
    return (
        <View style={styles.swapDirection}>
            <Ionicons name="arrow-down" size={24} color="#007AFF" />
            <Text style={styles.swapDirectionText}>{fromToken} → {toToken}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    swapDirection: {
        alignItems: "center",
        marginVertical: 8,
        gap: 4,
    },
    swapDirectionText: {
        fontSize: 14,
        color: "#007AFF",
        fontWeight: "600",
    },
}); 