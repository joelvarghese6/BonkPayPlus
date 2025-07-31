import { View, Text, Pressable, StyleSheet, SafeAreaView, Modal, Button, Alert } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { Camera, CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { QrOverview } from "@/features/scan/components/QrOverview";
import { useState } from "react";
import { PaymentScreen } from "@/features/scan/components/PaymentScreen";
import { usePaymentModal } from "@/features/scan/store/PaymentModal";
import { isValidSolanaPayUrl, parseSolanaPayUrl, SolanaPayUrlData } from "@/features/scan/utils/solanaPayValidation";


export default function Custom() {

  const [parsedData, setParsedData] = useState<SolanaPayUrlData | undefined>(undefined);

  const { OpenPaymentModal, isOpen, closePaymentModal } = usePaymentModal(); 

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission || !permission.granted) {
    requestPermission();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Scan QR", headerShown: false }} />
      {!isOpen && (
        <>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            onBarcodeScanned={({ data }) => {
              console.log("Scanned data:", data);
              
              // Check if the scanned data is a valid Solana Pay URL
              if (isValidSolanaPayUrl(data)) {
                const parsedData = parseSolanaPayUrl(data);
                if (parsedData) {
                  console.log("Valid Solana Pay URL detected:", parsedData);
                  setParsedData(parsedData);
                  OpenPaymentModal();
                }
              }
            }}
          />
          <QrOverview />
        </>
      )}
      <Modal visible={isOpen} onRequestClose={closePaymentModal}>
        <PaymentScreen data={parsedData}/>
      </Modal>
    </SafeAreaView>
  );
}   