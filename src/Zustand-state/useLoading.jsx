// src/Zustand-state/loadingStore.js
import { create } from "zustand";

const loadingStore = create((set) => ({
  globalLoader: false, // state
  setGlobalLoader: (value) => set({ globalLoader: value }), // true/false handle
}));

export default loadingStore;
