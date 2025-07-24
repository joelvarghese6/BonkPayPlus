import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';

const user = {
  name: "Jane Doe",
  address: "0x1234567890abcdef1234567890abcdef12345678",
  avatar: null, // You can use an image here if you want
  metrics: {
    totalReceived: 12345,
    swapped: 2345,
    balance: 10000,
  },
};

const settings = [
  { label: 'Languages', icon: 'language' },
  { label: 'Currency', icon: 'cash' },
  { label: 'Permission', icon: 'lock-closed' },
  { label: 'Theme', icon: 'color-palette' },
];

export default function Fourth() {
  const handleCopy = async () => {
    await Clipboard.setStringAsync(user.address);
    Alert.alert('Copied', 'Address copied to clipboard');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      {/* Top Section */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginHorizontal: 8 }}>
        <View style={styles.avatarSmall}>
          <Ionicons name="person" size={26} color="#888" />
        </View>
        <View style={{ marginLeft: 16, flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#222' }}>{user.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <Text style={{ color: '#888', fontSize: 13 }} numberOfLines={1} ellipsizeMode="middle">
              {user.address.slice(0, 6)}...{user.address.slice(-4)}
            </Text>
            <TouchableOpacity onPress={handleCopy} style={{ marginLeft: 8 }}>
              <Ionicons name="copy" size={18} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Metrics Card */}
      <View style={styles.metricsCard}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{user.metrics.totalReceived}</Text>
          <Text style={styles.metricLabel}>Total BONK received</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{user.metrics.swapped}</Text>
          <Text style={styles.metricLabel}>BONK swapped for SOL</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{user.metrics.balance}</Text>
          <Text style={styles.metricLabel}>BONK balance now</Text>
        </View>
      </View>
      {/* Settings Heading */}
      <Text style={styles.settingsHeading}>Settings and Preferences</Text>
      {/* Settings Options */}
      <View style={{ marginTop: 8 }}>
        {settings.map((item, idx) => (
          <TouchableOpacity key={item.label} style={styles.optionRow} activeOpacity={0.7}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name={item.icon as any} size={22} color="#2d2d2d" style={{ marginRight: 14 }} />
              <Text style={styles.optionLabel}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#bbb" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarSmall: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricsCard: {
    flexDirection: 'row',
    backgroundColor: '#f5f7ff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2d2d2d',
    marginBottom: 2,
  },
  metricLabel: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  settingsHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2d2d2d',
    marginBottom: 8,
    marginLeft: 2,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fafbfc',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  optionLabel: {
    fontSize: 15,
    color: '#2d2d2d',
    fontWeight: '500',
  },
});