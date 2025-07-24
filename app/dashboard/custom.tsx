import { View, Text, Pressable, StyleSheet, SafeAreaView, Modal, Button } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { Camera, CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router";
import { QrOverview } from "@/components/QrOverview";
import { useState } from "react";
import { PaymentScreen } from "@/components/PaymentScreen";

export default function Custom() {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  if (!permission || !permission.granted) {
    requestPermission();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Scan QR", headerShown: false }} />
      {!isModalVisible && (
        <>
          <CameraView
            style={StyleSheet.absoluteFill}
            facing="back"
            onBarcodeScanned={({ data }) => {
              console.log(data);
              //router.replace('/payment');
              setIsModalVisible(true);
            }}
          />
          <QrOverview />
        </>
      )}
      <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
        <PaymentScreen onBack={() => setIsModalVisible(false)} onSubmit={(amount) => {
          console.log(amount);
        }} />
      </Modal>
    </SafeAreaView>
  );
}   