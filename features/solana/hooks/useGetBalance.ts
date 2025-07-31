import { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { PrivyEmbeddedSolanaWalletProvider, useEmbeddedSolanaWallet } from '@privy-io/expo';

const RPC_URL = 'https://devnet.helius-rpc.com/?api-key=0f31c860-68c3-4d89-bc63-a2f8957a0603';


export const useGetWalletBalance = () => {

    const { wallets } = useEmbeddedSolanaWallet();
    const wallet = wallets?.[0];

    const [solBalance, setSolBalance] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (!wallet || !wallet.address) {
                setSolBalance(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const connection = new Connection(RPC_URL);
                const publicKey = new PublicKey(wallet.address);
                const balanceLamports = await connection.getBalance(publicKey);
                setSolBalance(balanceLamports / 1_000_000_000); // Convert lamports → SOL
            } catch (err) {
                console.error('Error fetching balance:', err);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchBalance();
    }, [wallet]);

    return { solBalance, loading, error };
};
