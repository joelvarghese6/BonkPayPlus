import { View, Text, Pressable, StyleSheet, SafeAreaView, Modal, Button } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { Camera, CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { QrOverview } from "@/components/QrOverview";
import { useState } from "react";
import { PaymentScreen } from "@/components/PaymentScreen";
import { usePaymentModal } from "@/store/PaymentModal";

export default function Custom() {

  const { setData, OpenPaymentModal, isOpen, closePaymentModal } = usePaymentModal(); 

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

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
        <PaymentScreen onBack={() => closePaymentModal()} onSubmit={(amount) => {
          console.log(amount);
        }} />
      </Modal>
    </SafeAreaView>
  );
}   