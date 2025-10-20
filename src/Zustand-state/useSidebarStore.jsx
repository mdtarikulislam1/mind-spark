import { create } from "zustand";

const useSidebarStore = create((set) => ({
  desktopOpen: true, // default open
  toggleDesktop: () => set((state) => ({ desktopOpen: !state.desktopOpen })),
}));

export default useSidebarStore;
