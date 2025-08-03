import { useEffect, useState } from 'react';

export const useBonkPrice = () => {
  const [bonkPrice, setBonkPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bonk&vs_currencies=usd');
        const data = await res.json();
        setBonkPrice(data.bonk.usd);
      } catch (err) {
        console.error('Failed to fetch BONK price:', err);
        setBonkPrice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, []);

  return { bonkPrice, loading };
};
