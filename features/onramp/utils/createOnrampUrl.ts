export const createOnrampUrl = async (amount: number = 10, currency: string = 'USDC') => {
    try {
        const projectId = '58a3fa2e-617f-4198-81e7-096f5e498c00';
        const addresses = JSON.stringify([{
            address: "0x750EF1D7a0b4Ab1c97B7A623D7917CcEb5ea779C",
            blockchains: ["ethereum"]
        }]);
        
        const onrampUrl = `https://pay.coinbase.com/buy/select-asset?appId=${projectId}&addresses=${encodeURIComponent(addresses)}&defaultAsset=${currency}&defaultPaymentMethod=CRYPTO_ACCOUNT&presetCryptoAmount=${amount}`;
        
        return onrampUrl;
    } catch (error) {
        console.error('Error in createOnrampUrl:', error);
        throw error;
    }
};
