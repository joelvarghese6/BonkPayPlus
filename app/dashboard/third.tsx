import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { Connection, PublicKey, ParsedTransactionWithMeta } from '@solana/web3.js';
import { useEffect, useState } from "react";
import { useEmbeddedSolanaWallet } from "@privy-io/expo";

const data = [
  {
    id: 1,
    type: "receive",
    amount: 100,
    date: "20 July 2025",
    address: "0x1234567890123456789012345678901234567890",
  },
  {
    id: 2,
    type: "send",
    amount: 700,
    date: "17 July 2025",
    address: "0x1234567890123456789012345678901234567890",
  },
  {
    id: 3,
    type: "receive",
    amount: 150,
    date: "13 July 2025",
    address: "0x1234567890123456789012345678901234567890",
  },
  {
    id: 4,
    type: "send",
    amount: 100,
    date: "10 July 2025",
    address: "0x1234567890123456789012345678901234567890",
  },
  {
    id: 5,
    type: "receive",
    amount: 100,
    date: "07 July 2025",
    address: "0x1234567890123456789012345678901234567890",
  },
  {
    id: 6,
    type: "send",
    amount: 100,
    date: "05 July 2025",
    address: "0x1234567890123456789012345678901234567890",
  },
]

const connection = new Connection('https://devnet.helius-rpc.com/?api-key=0f31c860-68c3-4d89-bc63-a2f8957a0603');

const fetchTransactions = async (publicKey: PublicKey) => {
  const signatures = await connection.getSignaturesForAddress(publicKey, {
    limit: 20, // adjust as needed
  });

  const txs: (ParsedTransactionWithMeta | null)[] = await Promise.all(
    signatures.map(sig => connection.getParsedTransaction(sig.signature, 'confirmed'))
  );

  const solTransfers = txs
    .filter(tx => !!tx)
    .flatMap(tx => {
      return tx.transaction.message.instructions
        .filter(
          (instr: any) =>
            instr.programId?.toBase58() === '11111111111111111111111111111111' &&
            instr.parsed?.type === 'transfer' &&
            (instr.parsed.info.source === publicKey.toBase58() ||
              instr.parsed.info.destination === publicKey.toBase58())
        )
        .map((instr: any) => ({
          type: instr.parsed.info.source === publicKey.toBase58() ? 'Sent' : 'Received',
          from: instr.parsed.info.source,
          to: instr.parsed.info.destination,
          amount: instr.parsed.info.lamports / 1_000_000_000, // in SOL
          signature: tx.transaction.signatures[0],
          slot: tx.slot,
          timestamp: tx.blockTime ? new Date(tx.blockTime * 1000).toLocaleString() : 'Unknown',
        }));
    });

  return solTransfers;
}

export default function Third() {
  const [transactions, setTransactions] = useState<any>();

  const { wallets } = useEmbeddedSolanaWallet();
  const wallet = wallets?.[0];

  useEffect(() => {
    if (wallet) {
      fetchTransactions(new PublicKey(wallet.address)).then(setTransactions);
    }
  }, [wallet]);

  console.log(transactions);
  
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      {/* Header */}
      <Text style={styles.header}>History</Text>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search transactions"
          placeholderTextColor="#888"
          style={{ flex: 1, fontSize: 16 }}
        />
      </View>
      {/* List */}
      <FlashList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View style={[styles.iconCircle, { backgroundColor: item.type === 'receive' ? '#e0f7e9' : '#ffeaea' }]}>
                <Ionicons
                  name={item.type === 'receive' ? 'arrow-down' : 'arrow-up'}
                  size={20}
                  color={item.type === 'receive' ? '#2ecc71' : '#e74c3c'}
                />
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={{ fontWeight: 'bold', color: '#222', fontSize: 15 }}>
                  {item.type === 'receive' ? 'Received from' : 'Paid to'}
                </Text>
                <Text style={{ color: '#888', fontSize: 13 }}>{item.address.slice(0, 6)}...{item.address.slice(-4)}</Text>
                <Text style={{ color: '#888', fontSize: 13 }}>{item.date}</Text>
              </View>
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#222' }}>
              {item.type === 'receive' ? '+' : '-'}${item.amount}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100}
      />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafbfc',
    borderRadius: 14,
    padding: 14,
    justifyContent: 'space-between',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});