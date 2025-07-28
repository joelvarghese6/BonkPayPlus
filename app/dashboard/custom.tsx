import { View, Text, Pressable, StyleSheet, SafeAreaView, Modal, Button } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { Camera, CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { QrOverview } from "@/features/scan/components/QrOverview";
import { useState } from "react";
import { PaymentScreen } from "@/features/scan/components/PaymentScreen";
import { usePaymentModal } from "@/features/scan/store/PaymentModal";


export default function Custom() {

  const { setData, OpenPaymentModal, isOpen, closePaymentModal } = usePaymentModal(); 

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
              console.log(data);
              setData(data);
              OpenPaymentModal();
            }}
          />
          <QrOverview />
        </>
      )}
      <Modal visible={isOpen} onRequestClose={closePaymentModal}>
        <PaymentScreen  />
      </Modal>
    </SafeAreaView>
  );
}   