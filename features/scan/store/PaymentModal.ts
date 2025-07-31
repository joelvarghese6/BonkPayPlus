import { create } from 'zustand';
import { SolanaPayUrlData } from '../utils/solanaPayValidation';

interface PaymentModalStore {
    isOpen: boolean;
    OpenPaymentModal: () => void;
    closePaymentModal: () => void;
}

export const usePaymentModal = create<PaymentModalStore>((set) => ({
    isOpen: false,
    OpenPaymentModal: () => set({ isOpen: true }),
    closePaymentModal: () => set({ isOpen: false }),
}));