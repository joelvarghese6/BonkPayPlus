import { create } from 'zustand';

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