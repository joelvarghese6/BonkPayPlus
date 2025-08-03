import { UserScreen } from "@/components/UserScreen";
import { PrivyUser } from "@privy-io/public-api";
import { usePrivy, getUserEmbeddedSolanaWallet, useEmbeddedSolanaWallet } from "@privy-io/expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, StyleSheet, ScrollView, Pressable, Modal } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import RecieveScreen from "@/features/recieve/components/RecieveScreen";
import { useRecieveModal } from "@/features/recieve/store/RecieveModal";
import { BonkRecieved } from "@/components/BonkRecieved";
import { useBonkRewardModal } from "@/features/rewards/store/BonkRewardModal";

export default function Home() {

    const { isOpen: isRecieveOpen, OpenRecieveModal, closeRecieveModal } = useRecieveModal();
    const { isOpen: isBonkRewardOpen, closeBonkRewardModal } = useBonkRewardModal();
    // Design constants matching login screen
    const primaryColor = "#007AFF";
    const textColor = "#1A1A1A";
    const backgroundColor = "#FFFFFF";
    const cardBackground = "#F8F9FA";
    const iconBackground = "#F0F8FF";

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="wallet" size={60} color={primaryColor} />
                    </View>
                    <Text style={[styles.title, { color: textColor }]}>BONKPAY+</Text>
                    <Text style={[styles.subtitle, { color: textColor }]}>
                        Your all-in-one payment solution with rewards
                    </Text>
                </View>

                {/* Main Content */}
                <View style={styles.mainContent}>
                    {/* Quick Actions */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: textColor }]}>Quick Actions</Text>
                        <View style={styles.quickActions}>
                            <View style={styles.actionItem}>
                                <Pressable 
                                    onPress={() => router.push('/dashboard/custom')} 
                                    style={({ pressed }) => [
                                        styles.actionButton,
                                        { backgroundColor: iconBackground, opacity: pressed ? 0.8 : 1 }
                                    ]}
                                >
                                    <Ionicons name="qr-code" size={28} color={primaryColor} />
                                </Pressable>
                                <Text style={[styles.actionText, { color: textColor }]}>Scan QR</Text>
                            </View>
                            <View style={styles.actionItem}>
                                <Pressable 
                                    onPress={OpenRecieveModal} 
                                    style={({ pressed }) => [
                                        styles.actionButton,
                                        { backgroundColor: iconBackground, opacity: pressed ? 0.8 : 1 }
                                    ]}
                                >
                                    <Ionicons name="arrow-down" size={28} color={primaryColor} />
                                </Pressable>
                                <Text style={[styles.actionText, { color: textColor }]}>Receive</Text>
                            </View>
                            <View style={styles.actionItem}>
                                <Pressable 
                                    onPress={() => router.push("/send")} 
                                    style={({ pressed }) => [
                                        styles.actionButton,
                                        { backgroundColor: iconBackground, opacity: pressed ? 0.8 : 1 }
                                    ]}
                                >
                                    <Ionicons name="send" size={28} color={primaryColor} />
                                </Pressable>
                                <Text style={[styles.actionText, { color: textColor }]}>Send</Text>
                            </View>
                            <View style={styles.actionItem}>
                                <Pressable 
                                    onPress={() => router.push("/portfolio")} 
                                    style={({ pressed }) => [
                                        styles.actionButton,
                                        { backgroundColor: iconBackground, opacity: pressed ? 0.8 : 1 }
                                    ]}
                                >
                                    <Ionicons name="wallet" size={28} color={primaryColor} />
                                </Pressable>
                                <Text style={[styles.actionText, { color: textColor }]}>Portfolio</Text>
                            </View>
                        </View>
                    </View>

                    {/* Services Grid */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: textColor }]}>Services</Text>
                        <View style={styles.servicesGrid}>
                            {/* Row 1 */}
                            <View style={styles.serviceRow}>
                                <Pressable 
                                    onPress={() => router.push("/dashboard/second")} 
                                    style={({ pressed }) => [
                                        styles.serviceCard,
                                        { opacity: pressed ? 0.8 : 1 }
                                    ]}
                                >
                                    <Ionicons name="cash" size={24} color={primaryColor} />
                                    <Text style={[styles.serviceText, { color: textColor }]}>Loans</Text>
                                </Pressable>
                                <Pressable 
                                    onPress={() => router.push("/staking")} 
                                    style={({ pressed }) => [
                                        styles.serviceCard,
                                        { opacity: pressed ? 0.8 : 1 }
                                    ]}
                                >
                                    <Ionicons name="trending-up" size={24} color={primaryColor} />
                                    <Text style={[styles.serviceText, { color: textColor }]}>Staking</Text>
                                </Pressable>
                            </View>

                            {/* Row 2 */}
                            <View style={styles.serviceRow}>
                                <Pressable 
                                    onPress={() => router.push("/swap")} 
                                    style={({ pressed }) => [
                                        styles.serviceCard,
                                        { opacity: pressed ? 0.8 : 1 }
                                    ]}
                                >
                                    <Ionicons name="swap-horizontal" size={24} color={primaryColor} />
                                    <Text style={[styles.serviceText, { color: textColor }]}>Swap</Text>
                                </Pressable>
                                <Pressable 
                                    onPress={() => router.push("/onramp")} 
                                    style={({ pressed }) => [
                                        styles.serviceCard,
                                        { opacity: pressed ? 0.8 : 1 }
                                    ]}
                                >
                                    <Ionicons name="card" size={24} color={primaryColor} />
                                    <Text style={[styles.serviceText, { color: textColor }]}>Buy SOL</Text>
                                </Pressable>
                            </View>


                        </View>
                    </View>
                </View>
            </ScrollView>
            
            <Modal visible={isRecieveOpen} onRequestClose={closeRecieveModal}>
                <RecieveScreen />
            </Modal>
            <Modal visible={isBonkRewardOpen} onRequestClose={closeBonkRewardModal}>
                <BonkRecieved />
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginBottom: 24,
        padding: 20,
        borderRadius: 50,
        backgroundColor: "#F0F8FF",
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        opacity: 0.7,
        textAlign: 'center',
        lineHeight: 22,
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionItem: {
        alignItems: 'center',
        flex: 1,
    },
    actionButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    actionText: {
        fontSize: 13,
        fontWeight: '500',
    },
    servicesGrid: {
        gap: 12,
    },
    serviceRow: {
        flexDirection: 'row',
        gap: 12,
    },
    serviceCard: {
        flex: 1,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    serviceCardWide: {
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 80,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    serviceText: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 8,
    },
});

