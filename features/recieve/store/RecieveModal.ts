import { create } from 'zustand';

interface RecieveModalStore {
    isOpen: boolean;
    OpenRecieveModal: () => void;
    closeRecieveModal: () => void;
}

export const useRecieveModal = create<RecieveModalStore>((set) => ({
    isOpen: false,
    OpenRecieveModal: () => set({ isOpen: true }),
    closeRecieveModal: () => set({ isOpen: false }),
}));