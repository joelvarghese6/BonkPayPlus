import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface SwapDetailsProps {
    fromToken: string;
    toToken: string;
    swapRate: number;
    slippage: string;
}

export const SwapDetails: React.FC<SwapDetailsProps> = ({
    fromToken,
    toToken,
    swapRate,
    slippage
}) => {
    return (
        <View style={styles.swapDetails}>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Rate</Text>
                <Text style={styles.detailValue}>
                    1 {fromToken} = {swapRate} {toToken}
                </Text>
            </View>
            
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Slippage</Text>
                <Text style={styles.detailValue}>{slippage}%</Text>
            </View>
            
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Network Fee</Text>
                <Text style={styles.detailValue}>~0.000005 SOL</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    swapDetails: {
        backgroundColor: "#f8f9fa",
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    detailLabel: {
        fontSize: 14,
        color: "#666",
    },
    detailValue: {
        fontSize: 14,
        color: "#000",
        fontWeight: "500",
    },
}); 