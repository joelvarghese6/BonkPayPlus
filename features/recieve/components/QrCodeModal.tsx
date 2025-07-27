import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { useMemo, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function QrCodeModal({ amount, ref, onClose, onOpen }: { amount: string, ref: React.RefObject<BottomSheet | null>, onClose: () => void, onOpen: () => void }) {

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
                    <Ionicons name="qr-code" size={120} color="#333" />
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
});