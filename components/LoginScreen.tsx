import { Button, Linking, Text, View, Pressable, StyleSheet } from "react-native";
import { LoginWithOAuthInput, useLoginWithOAuth } from "@privy-io/expo";
import { useLogin } from "@privy-io/expo/ui";
import { useLoginWithPasskey } from "@privy-io/expo/passkey";
import Constants from "expo-constants";
import { useState } from "react";
import * as Application from "expo-application";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function LoginScreen() {

  const [error, setError] = useState("");

  const { loginWithPasskey } = useLoginWithPasskey({
    onError: (err) => {
      console.log(err);
      setError(JSON.stringify(err.message));
    },
  });

  const { login } = useLogin();

  const oauth = useLoginWithOAuth({
    onError: (err) => {
      console.log(err);
      setError(JSON.stringify(err.message));
    },
  });

  const buttonBg = useThemeColor({}, "tint");
  const buttonText = useThemeColor({}, "background");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        marginHorizontal: 10,
        width: "100%",
        maxWidth: 400,
      }}
    >
      <Text style={{ fontSize: 10 }}>{Application.applicationId}</Text>
      <Text>
        Navigate to your{" "}
        <Text
          onPress={() =>
            Linking.openURL(
              `https://dashboard.privy.io/apps/${Constants.expoConfig?.extra?.privyAppId}/settings?setting=clients`
            )
          }
        >
          dashboard
        </Text>{" "}
        and ensure the following value is listed as an `Allowed app URL scheme`:
      </Text>
      <Text style={{ fontSize: 10 }}>
        {Application.applicationId === "host.exp.Exponent"
          ? "exp"
          : Constants.expoConfig?.scheme}
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: buttonBg, opacity: pressed ? 0.8 : 1 },
        ]}
        onPress={() => {
          login({ loginMethods: ["email"] })
            .then((session) => {
              console.log("User logged in", session.user);
            })
            .catch((err) => {
              setError(JSON.stringify(err.error) as string);
            });
        }}
      >
        <Text style={[styles.buttonText, { color: buttonText }]}>Login with Privy UIs</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: buttonBg, opacity: pressed ? 0.8 : 1 },
        ]}
        onPress={() =>
          loginWithPasskey({
            relyingParty: Constants.expoConfig?.extra?.passkeyAssociatedDomain,
          })
        }
      >
        <Text style={[styles.buttonText, { color: buttonText }]}>Login using Passkey</Text>
      </Pressable>
      {error && <Text style={{ color: "red" }}>Error: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
