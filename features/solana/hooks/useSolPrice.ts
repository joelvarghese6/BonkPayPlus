import { useEffect, useState } from 'react';

export const useSolPrice = () => {
  const [solPrice, setSolPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd');
        const data = await res.json();
        setSolPrice(data.solana.usd);
      } catch (err) {
        console.error('Failed to fetch SOL price:', err);
        setSolPrice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  return { solPrice, loading };
};
