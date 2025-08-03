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
  // Design constants matching home.tsx
  const primaryColor = "#007AFF";
  const textColor = "#1A1A1A";
  const backgroundColor = "#FFFFFF";
  const cardBackground = "#F8F9FA";
  const iconBackground = "#F0F8FF";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Lending Markets</Text>
          {tokens.map((token) => (
            <View key={token.name} style={[styles.card, { backgroundColor: cardBackground }]}>
              <View style={styles.tokenHeader}>
                <View style={[styles.iconCircle, { backgroundColor: iconBackground }]}>
                  <Ionicons name={token.icon as any} size={24} color={primaryColor} />
                </View>
                <Text style={[styles.tokenName, { color: textColor }]}>{token.name}</Text>
              </View>
              
              <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                  <Text style={styles.label}>LTV</Text>
                  <Text style={[styles.value, { color: textColor }]}>{token.ltv}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.label}>Supply</Text>
                  <Text style={[styles.value, { color: textColor }]}>{token.supply}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.label}>Supply APR</Text>
                  <Text style={[styles.value, { color: textColor }]}>{token.supplyApr}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.label}>Borrow</Text>
                  <Text style={[styles.value, { color: textColor }]}>{token.borrow}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.label}>Borrow APR</Text>
                  <Text style={[styles.value, { color: textColor }]}>{token.borrowApr}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tokenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  tokenName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'flex-start',
  },
  label: {
    color: '#888',
    fontSize: 13,
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});