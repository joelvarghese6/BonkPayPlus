import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Pressable, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// Dummy data for tokens
const tokenData = [
    {
        id: '1',
        name: 'SOL',
        symbol: 'SOL',
        icon: 'logo-bitcoin',
        balance: '12.5',
        marketPrice: '$98.45',
        dollarValue: '$1,230.63'
    },
    {
        id: '2',
        name: 'USD Coin',
        symbol: 'USDC',
        icon: 'wallet',
        balance: '1,250.00',
        marketPrice: '$1.00',
        dollarValue: '$1,250.00'
    },
    {
        id: '3',
        name: 'Tether',
        symbol: 'USDT',
        icon: 'wallet',
        balance: '500.00',
        marketPrice: '$1.00',
        dollarValue: '$500.00'
    },
    {
        id: '4',
        name: 'Bonk',
        symbol: 'BONK',
        icon: 'paw',
        balance: '1,000,000',
        marketPrice: '$0.000023',
        dollarValue: '$23.00'
    }
];

const TokenItem = ({ item }: { item: typeof tokenData[0] }) => (
    <View style={styles.tokenItem}>
        <View style={styles.tokenLeft}>
            <View style={styles.tokenIcon}>
                <Ionicons name={item.icon as any} size={24} color="#ff00c3" />
            </View>
            <View style={styles.tokenInfo}>
                <Text style={styles.tokenName}>{item.name}</Text>
                <Text style={styles.tokenPrice}>{item.marketPrice}</Text>
            </View>
        </View>
        <View style={styles.tokenRight}>
            <Text style={styles.tokenBalance}>{item.balance}</Text>
            <Text style={styles.dollarValue}>
                {item.dollarValue}
            </Text>
        </View>
    </View>
);

export default function Portfolio() {
    const handleBackPress = () => {
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </Pressable>
                <Text style={styles.title}>Portfolio</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <View style={styles.content}>
                <FlatList
                    data={tokenData}
                    renderItem={({ item }) => <TokenItem item={item} />}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
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
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    tokenItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 12,
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        marginBottom: 8,
    },
    tokenLeft: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    tokenIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tokenInfo: {
        flex: 1,
    },
    tokenName: {
        fontSize: 16,
        fontWeight: "700",
        color: "#000",
        marginBottom: 4,
    },
    tokenPrice: {
        fontSize: 14,
        color: "#666",
    },
    tokenRight: {
        alignItems: "flex-end",
    },
    tokenBalance: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        marginBottom: 4,
    },
    dollarValue: {
        fontSize: 14,
        fontWeight: "500",
        color: "#666",
    },
    separator: {
        height: 8,
    },
});
