import { SafeAreaView, Text, View } from "react-native";
import Constants from "expo-constants";
import LoginScreen from "@/components/LoginScreen";
import { getUserEmbeddedSolanaWallet, useEmbeddedSolanaWallet, usePrivy } from "@privy-io/expo";
import { UserScreen } from "@/components/UserScreen";
import { Redirect } from "expo-router";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Index() {
  const { user, isReady } = usePrivy();
  const { create } = useEmbeddedSolanaWallet()

  if (!isReady) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  const account = getUserEmbeddedSolanaWallet(user);
  console.log(account?.address);

  if (!account?.address) {
    create?.()
  }

  return <Redirect href="/dashboard/home" />;
}
