import { PublicKey } from "@solana/web3.js";
import BigNumber from 'bignumber.js';
import { encodeURL, findReference, validateTransfer } from '@solana/pay';


export const generateURL = (amountS: number, address?: string) => {

    const recipient = new PublicKey(address ?? '11111111111111111111111111111111');
    const amount = new BigNumber(amountS)
    const label = 'BONKAY';
    const memo = 'BONKAY';
    const quicknodeEndpoint = 'https://example.solana-devnet.quiknode.pro/123456/';

    const url: URL = encodeURL({
        recipient,
        amount,
        reference: recipient,
        label,
        message: memo,
        memo,
    });

    return { url };
}