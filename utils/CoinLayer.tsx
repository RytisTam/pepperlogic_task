'use server'

export const fetchCryptoPriceHistory = async (ids: string) => {
    try {
      const url = `${process.env.COINGECKO_API}/coins/markets?ids=${encodeURIComponent(ids)}&vs_currency=usd&sparkline=true`;
      const response = await fetch(url);
      if (!response.ok) {
        console.error('Failed to fetch data', response.statusText);
        return [];
      }
      const result = await response.json();
      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };