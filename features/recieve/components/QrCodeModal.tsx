import { View, Pressable, StyleSheet, Text } from "react-native";
import { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { getUserEmbeddedSolanaWallet, usePrivy } from "@privy-io/expo";
import QRCode from 'react-native-qrcode-svg';


interface QrCodeModalProps {
    ref: React.RefObject<BottomSheet | null>;
    onClose: () => void;
    url?: URL;
}

export default function QrCodeModal({ ref, onClose, url }: QrCodeModalProps) {


    const { user } = usePrivy();
    const account = getUserEmbeddedSolanaWallet(user);

    const handleSheetChanges = (index: number) => {
        console.log("handleSheetChanges", index);
    };

    const snapPoints = useMemo(() => ["50%"], []);

    return (
        <BottomSheet
            ref={ref}
            onChange={handleSheetChanges}
            snapPoints={snapPoints}
            index={-1}
        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.header}>
                    <Pressable onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#666" />
                    </Pressable>
                </View>
                <View style={styles.qrCodeContainer}>
                    {url && <QRCode
                        value={url.toString()}
                        size={150}
                    />}
                    <Text style={styles.addressText}>{account?.address}</Text>
                </View>
            </BottomSheetView>
        </BottomSheet>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    closeButton: {
        padding: 8,
    },
    qrCodeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    sendText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#222",
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
        justifyContent: "center",
    },
    addressText: {
        fontSize: 12,
        color: "#666",
    },
});