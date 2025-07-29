import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

interface SwapButtonProps {
    fromToken: string;
    toToken: string;
    onPress: () => void;
    disabled: boolean;
    isLoading: boolean;
}

export const SwapButton: React.FC<SwapButtonProps> = ({
    fromToken,
    toToken,
    onPress,
    disabled,
    isLoading
}) => {
    return (
        <View style={styles.bottomButtonContainer}>
            <TouchableOpacity 
                style={[styles.swapActionButton, disabled && styles.swapActionButtonDisabled]}
                onPress={onPress}
                disabled={disabled}
            >
                {isLoading ? (
                    <View style={styles.loadingContainer}>
                        <Text style={styles.loadingText}>Swapping...</Text>
                    </View>
                ) : (
                    <Text style={[styles.swapActionButtonText, disabled && styles.swapActionButtonTextDisabled]}>
                        Swap {fromToken} for {toToken}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomButtonContainer: {
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
    },
    swapActionButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    swapActionButtonDisabled: {
        backgroundColor: "#e0e0e0",
    },
    swapActionButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    swapActionButtonTextDisabled: {
        color: "#999",
    },
    loadingContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    loadingText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
}); 