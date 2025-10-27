import { create } from "zustand";

const useModal = create((set) => ({
  modalOpen: false, // default open
  toggleModal: () => set((state) => ({ modalOpen: !state.modalOpen })),
}));

export default useModal;


