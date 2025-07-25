import { UserScreen } from "@/components/UserScreen";
import { PrivyUser } from "@privy-io/public-api";
import { usePrivy, getUserEmbeddedSolanaWallet, useEmbeddedSolanaWallet } from "@privy-io/expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";


export default function Home() {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View style={styles.banner}>
                    <View style={{ flex: 1, padding: 8 }}>
                        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#2d2d2d', marginBottom: 6 }}>
                            BONKPAY+
                        </Text>
                        <Text style={{ fontSize: 15, color: '#555', lineHeight: 22 }}>
                            welcome to bonk pay your all in all payment solution with rewards
                        </Text>
                    </View>
                    <Image
                        source={require("@/assets/images/icon.png")}
                        style={{ width: 64, height: 64 }}
                    />
                </View>
                <View style={{ flex: 1, padding: 16 }}>
                    <View style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#2d2d2d' }}>
                            Payments
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                            {[
                                { name: 'qr-code', label: 'Scan QR', route: '/dashboard/custom' },
                                { name: 'send', label: 'To Public Key', route: '/dashboard/send' },
                                { name: 'arrow-down', label: 'Recieve', route: '/dashboard/receive' },
                                { name: 'wallet', label: 'Portfolio', route: '/dashboard/portfolio' }
                            ].map((item, idx) => (
                                <View key={item.name} style={{ alignItems: 'center', flex: 1 }}>
                                    <Pressable onPress={() => router.push(item.route as any)} style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 28,
                                        backgroundColor: '#f2f2f2',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: 6,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.08,
                                        shadowRadius: 2,
                                        elevation: 1,
                                    }}>
                                        <Ionicons name={item.name as any} size={28} color="#2d2d2d" />
                                    </Pressable>
                                    <Text style={{ fontSize: 13, color: '#555' }}>{item.label}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Row 2: 2 cards */}
                    <View style={{ flexDirection: "row", marginBottom: 16 }}>
                        <View style={[styles.card, { flex: 1, marginRight: 8 }]}>
                            <Text style={styles.cardText}>Loans</Text>
                        </View>
                        <View style={[styles.card, { flex: 1, marginLeft: 8 }]}>
                            <Text style={styles.cardText}>Staking</Text>
                        </View>
                    </View>

                    {/* Rows 3 & 4: 2x1+1 layout */}
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        {/* Left column: 2 stacked cards */}
                        <View style={{ flex: 1, marginRight: 8, justifyContent: 'space-between' }}>
                            <View style={[styles.card, { flex: 1, marginBottom: 8 }]}>
                                <Text style={styles.cardText}>Swap Tokens</Text>
                            </View>
                            <View style={[styles.card, { flex: 1, marginTop: 8 }]}>
                                <Text style={styles.cardText}>Buy SOL</Text>
                            </View>
                        </View>
                        {/* Right column: 1 tall card */}
                        <View style={{ flex: 1, marginLeft: 8 }}>
                            <View style={[styles.card, { flex: 2, height: '100%', justifyContent: 'center' }]}>
                                <Text style={styles.cardText}>Lock BONK</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f2f2f2',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 80,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#000',
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f7ff',
        paddingBottom: 24,
        padding: 16,
        marginBottom: 8,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 12,
    }
});

