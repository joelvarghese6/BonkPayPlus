import { create } from 'zustand';

interface PaymentModalStore {
    data: string | null;
    isOpen: boolean;
    OpenPaymentModal: () => void;
    closePaymentModal: () => void;
    setData: (data: string) => void;
}

export const usePaymentModal = create<PaymentModalStore>((set) => ({
    isOpen: false,
    data: null,
    OpenPaymentModal: () => set({ isOpen: true }),
    closePaymentModal: () => set({ isOpen: false }),
    setData: (data) => set({ data }),
}));