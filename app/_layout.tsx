import Constants from "expo-constants";
import { Stack } from "expo-router";
import { PrivyProvider } from "@privy-io/expo";
import { PrivyElements } from "@privy-io/expo/ui";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {


  useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });


  return (
    <PrivyProvider
      appId={Constants.expoConfig?.extra?.privyAppId}
      clientId={Constants.expoConfig?.extra?.privyClientId}
    >
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false }} />
        <PrivyElements />
      </GestureHandlerRootView>
    </PrivyProvider>
  );
}
