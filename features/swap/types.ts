export interface Token {
    symbol: string;
    name: string;
    icon: string;
    decimals: number;
    address: string;
}

export interface TokenData {
    [key: string]: Token;
}

export const TOKENS: TokenData = {
    BONKK: {
        symbol: "BONKK",
        name: "Bonk",
        icon: "🐕",
        decimals: 6,
        address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"
    },
    SOL: {
        symbol: "SOL",
        name: "Solana",
        icon: "◎",
        decimals: 9,
        address: "So11111111111111111111111111111111111111112"
    },
    USDC: {
        symbol: "USDC",
        name: "USD Coin",
        icon: "💵",
        decimals: 6,
        address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
    }
};

export interface Balances {
    [key: string]: string;
} 