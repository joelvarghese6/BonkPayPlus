import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="wallet" size={80} color="#007AFF" style={styles.icon} />
        <Text style={styles.title}>BONKAY</Text>
        <Text style={styles.subtitle}>Made in India</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "500",
  },
});