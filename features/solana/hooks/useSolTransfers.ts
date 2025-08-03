import { useEffect, useState } from 'react';
import {
  Connection,
  PublicKey,
  ParsedTransactionWithMeta,
} from '@solana/web3.js';
import { useEmbeddedSolanaWallet } from '@privy-io/expo';

export type SolTransfer = {
  type: 'Sent' | 'Received';
  from: string;
  to: string;
  amount: number;
  signature: string;
  slot: number;
  timestamp: string;
};

export const useSolTransfers = (limit = 20) => {
  
  const [transfers, setTransfers] = useState<SolTransfer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { wallets } = useEmbeddedSolanaWallet();
  const wallet = wallets?.[0];

  useEffect(() => {
    const fetchTransfers = async () => {
      if (!wallet) return;

      setLoading(true);
      setError(null);

      try {
        const connection = new Connection(
          'https://devnet.helius-rpc.com/?api-key=0f31c860-68c3-4d89-bc63-a2f8957a0603'
        );
        const publicKey = new PublicKey(wallet.address);

        const signatures = await connection.getSignaturesForAddress(publicKey, {
          limit,
        });

        const txs: (ParsedTransactionWithMeta | null)[] = await Promise.all(
          signatures.map((sig) =>
            connection.getParsedTransaction(sig.signature, 'confirmed')
          )
        );

        const solTransfers = txs
          .filter((tx): tx is ParsedTransactionWithMeta => !!tx)
          .flatMap((tx) => {
            return tx.transaction.message.instructions
              .filter(
                (instr: any) =>
                  instr.programId?.toBase58() ===
                    '11111111111111111111111111111111' &&
                  instr.parsed?.type === 'transfer' &&
                  (instr.parsed.info.source === wallet.address ||
                    instr.parsed.info.destination === wallet.address)
              )
              .map((instr: any) => ({
                type:
                  instr.parsed.info.source === wallet.address
                    ? 'Sent'
                    : 'Received',
                from: instr.parsed.info.source,
                to: instr.parsed.info.destination,
                amount: instr.parsed.info.lamports / 1_000_000_000,
                signature: tx.transaction.signatures[0],
                slot: tx.slot,
                timestamp: tx.blockTime
                  ? new Date(tx.blockTime * 1000).toLocaleString()
                  : 'Unknown',
              }));
          });

        setTransfers(solTransfers as SolTransfer[]);
      } catch (err) {
        console.error(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, [wallet, limit]);

  return { transfers, loading, error };
};
