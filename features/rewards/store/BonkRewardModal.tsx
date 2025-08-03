import { create } from 'zustand';

interface BonkRewardModalStore {
    bonkAmount: string;
    amount: string;
    isOpen: boolean;
    OpenBonkRewardModal: (amount: string, bonkAmount: string) => void;
    closeBonkRewardModal: () => void;
}

export const useBonkRewardModal = create<BonkRewardModalStore>((set) => ({
    bonkAmount: "0",
    amount: "0",
    isOpen: false,
    OpenBonkRewardModal: (amount: string, bonkAmount: string) => set({ isOpen: true, amount, bonkAmount }),
    closeBonkRewardModal: () => set({ isOpen: false }),
}));