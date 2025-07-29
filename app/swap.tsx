import React, { useState } from "react";
import { 
    View, 
    StyleSheet, 
    SafeAreaView, 
    Alert, 
    ScrollView
} from "react-native";
import { router } from "expo-router";
import {
    Header,
    TokenInput,
    SwapDirection,
    SwapDetails,
    SwapButton,
    TOKENS,
    type Balances
} from "@/features/swap/components";

export default function Swap() {
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [slippage, setSlippage] = useState("0.5");
    const [isLoading, setIsLoading] = useState(false);

    // Fixed tokens - only BONKK to SOL
    const fromToken = "BONKK";
    const toToken = "SOL";

    // Mock balances
    const balances: Balances = {
        BONKK: "1000000",
        SOL: "0.5",
        USDC: "100"
    };

    // Fixed swap rate for BONKK to SOL
    const swapRate = 0.000001; // 1 BONKK = 0.000001 SOL

    // Calculate to amount based on from amount
    const calculateToAmount = (amount: string) => {
        if (!amount || parseFloat(amount) <= 0) return "";
        const fromValue = parseFloat(amount);
        const rate = swapRate;
        return (fromValue * rate).toFixed(6);
    };

    // Update to amount when from amount changes
    React.useEffect(() => {
        const calculated = calculateToAmount(fromAmount);
        setToAmount(calculated);
    }, [fromAmount, swapRate]);

    const handleBackPress = () => {
        router.back();
    };

    const handleMaxAmount = () => {
        setFromAmount(balances[fromToken]);
    };

    const handleSwap = async () => {
        if (!fromAmount || parseFloat(fromAmount) <= 0) {
            Alert.alert("Error", "Please enter a valid amount");
            return;
        }

        if (parseFloat(fromAmount) > parseFloat(balances[fromToken])) {
            Alert.alert("Error", "Insufficient balance");
            return;
        }

        setIsLoading(true);
        
        // Simulate swap process
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                "Swap Successful", 
                `Swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            setFromAmount("");
                            setToAmount("");
                        }
                    }
                ]
            );
        }, 2000);
    };

    const isSwapDisabled = !fromAmount || parseFloat(fromAmount) <= 0 || isLoading;

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Swap" onBackPress={handleBackPress} />

            <View style={styles.contentContainer}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.swapContainer}>
                        <TokenInput
                            label="From"
                            token={fromToken}
                            amount={fromAmount}
                            onAmountChange={setFromAmount}
                            onMaxPress={handleMaxAmount}
                            balances={balances}
                            isEditable={true}
                        />

                        <SwapDirection fromToken={fromToken} toToken={toToken} />

                        <TokenInput
                            label="To"
                            token={toToken}
                            amount={toAmount}
                            onAmountChange={setToAmount}
                            balances={balances}
                            isEditable={false}
                        />

                        <SwapDetails
                            fromToken={fromToken}
                            toToken={toToken}
                            swapRate={swapRate}
                            slippage={slippage}
                        />
                    </View>
                </ScrollView>

                <SwapButton
                    fromToken={fromToken}
                    toToken={toToken}
                    onPress={handleSwap}
                    disabled={isSwapDisabled}
                    isLoading={isLoading}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contentContainer: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    swapContainer: {
        padding: 16,
        paddingBottom: 20,
    },
});