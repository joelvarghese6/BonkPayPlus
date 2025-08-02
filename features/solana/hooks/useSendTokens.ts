import { useCallback, useState } from 'react';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { useEmbeddedSolanaWallet } from '@privy-io/expo';

export const useSendTokens = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { wallets } = useEmbeddedSolanaWallet();
  const wallet = wallets?.[0];

  const sendSol = useCallback(async (amount: string, to: string) => {
    if (!wallet) {
      const errorMsg = 'No wallet found';
      console.error(errorMsg);
      setError(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const connection = new Connection('https://devnet.helius-rpc.com/?api-key=0f31c860-68c3-4d89-bc63-a2f8957a0603');

      const senderPublicKey = new PublicKey(wallet.address);
      const recipientPublicKey = new PublicKey(to);

      const lamports = parseFloat(amount) * 1e9;

      const instruction = SystemProgram.transfer({
        fromPubkey: senderPublicKey,
        toPubkey: recipientPublicKey,
        lamports,
      });

      const transaction = new Transaction().add(instruction);
      transaction.feePayer = senderPublicKey;

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      const provider = await wallet.getProvider();

      const { signature } = await provider.request({
        method: 'signAndSendTransaction',
        params: {
          transaction,
          connection,
        },
      });

      console.log('✅ Sending SOL:', amount, 'to', to, 'Signature:', signature);
      return signature;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to send SOL';
      console.error('❌ Failed to send SOL:', error);
      setError(errorMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [wallet]);

  return { sendSol, isLoading, error };
};
