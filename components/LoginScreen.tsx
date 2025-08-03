import { Linking, Text, View, Pressable, StyleSheet } from "react-native";
import { useLogin } from "@privy-io/expo/ui";
import Constants from "expo-constants";
import { useState } from "react";
import * as Application from "expo-application";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {

  const [error, setError] = useState("");

  const { login } = useLogin();

  const buttonBg = "#007AFF";
  const buttonText = "#FFFFFF";
  const textColor = "#1A1A1A";
  const iconColor = "#007AFF";

  return (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="wallet" size={80} color={iconColor} />
        </View>
        
        {/* Title */}
        <Text style={[styles.title, { color: textColor }]}>BONKPAY+</Text>
        
        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: textColor }]}>
          Secure payments made simple
        </Text>
      </View>

      {/* Bottom section with login button */}
      <View style={styles.bottomSection}>
        <Pressable
          style={({ pressed }) => [
            styles.loginButton,
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
          <Ionicons name="mail" size={20} color={buttonText} style={styles.buttonIcon} />
          <Text style={[styles.buttonText, { color: buttonText }]}>Login with Email</Text>
        </Pressable>

        {error && <Text style={styles.errorText}>Error: {error}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 40,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "#ff4444",
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },
});
