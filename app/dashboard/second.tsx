import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const tokens = [
  {
    name: 'USDC',
    icon: 'logo-usd',
    ltv: '80%',
    supply: '1,200,000',
    supplyApr: '3.2%',
    borrow: '800,000',
    borrowApr: '6.1%',
  },
  {
    name: 'SOL',
    icon: 'logo-bitcoin', // No SOL icon, using bitcoin as placeholder
    ltv: '75%',
    supply: '900,000',
    supplyApr: '4.0%',
    borrow: '600,000',
    borrowApr: '7.0%',
  },
  {
    name: 'USDT',
    icon: 'logo-usd',
    ltv: '78%',
    supply: '1,000,000',
    supplyApr: '3.5%',
    borrow: '700,000',
    borrowApr: '6.5%',
  },
  {
    name: 'BONK',
    icon: 'paw', // Placeholder for BONK
    ltv: '60%',
    supply: '2,000,000',
    supplyApr: '8.0%',
    borrow: '1,200,000',
    borrowApr: '12.0%',
  },
];

export default function Second() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text style={styles.header}>Lend & Borrow</Text>
      <Text style={styles.subtext}>
        Lend your tokens to earn interest, or borrow tokens against your collateral. View live rates and manage your assets securely.
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {tokens.map((token) => (
          <View key={token.name} style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <View style={styles.iconCircle}>
                <Ionicons name={token.icon as any} size={24} color="#2d2d2d" />
              </View>
              <Text style={styles.tokenName}>{token.name}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.col}><Text style={styles.label}>LTV</Text><Text style={styles.value}>{token.ltv}</Text></View>
              <View style={styles.col}><Text style={styles.label}>Supply</Text><Text style={styles.value}>{token.supply}</Text></View>
              <View style={styles.col}><Text style={styles.label}>Supply APR</Text><Text style={styles.value}>{token.supplyApr}</Text></View>
            </View>
            <View style={styles.row}>
              <View style={styles.col}><Text style={styles.label}>Borrow</Text><Text style={styles.value}>{token.borrow}</Text></View>
              <View style={styles.col}><Text style={styles.label}>Borrow APR</Text><Text style={styles.value}>{token.borrowApr}</Text></View>
             
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d2d2d',
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#f5f7ff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tokenName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2d2d2d',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  col: {
    flex: 1,
    alignItems: 'flex-start',
  },
  label: {
    color: '#888',
    fontSize: 13,
    marginBottom: 2,
  },
  value: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#2d2d2d',
  },
  actionBtn: {
    backgroundColor: '#3b3bff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  subtext: {
    color: '#555',
    fontSize: 15,
    marginBottom: 18,
    marginTop: -10,
    lineHeight: 21,
  },
});