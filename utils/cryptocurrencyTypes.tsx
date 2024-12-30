
export type CryptoItem = {
  market_cap: any
  max_supply: any
  price_change_percentage_24h: any
  image: string | undefined
  low_24h: any
  high_24h: any
  current_price: any
  sparkline: { Date: string, Price: string }[]
  sparkline_in_7d: any
  id: string
  name: string
  symbol: string
}
