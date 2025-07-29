import { getOnrampBuyUrl } from "@coinbase/onchainkit/fund";

export const createOnrampUrl = async (amount: number = 1, currency: string = 'USD') => {
    try {
        const projectId = '829c3cbc-12a2-42be-877f-b743931b08a5';
        const onrampBuyUrl = getOnrampBuyUrl({
            projectId,
            addresses: { '0x1': ['base'] },
            assets: ['USDC'],
            presetFiatAmount: 20,
            fiatCurrency: 'USD',
            redirectUrl: 'https://yourapp.com/onramp-return?param=foo',
        });

        if (!onrampBuyUrl) {
            throw new Error('Failed to generate onramp URL');
        }

        return onrampBuyUrl;
    } catch (error) {
        console.error('Error in createOnrampUrl:', error);
        throw error;
    }
};
