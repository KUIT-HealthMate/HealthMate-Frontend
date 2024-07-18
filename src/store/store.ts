import { create } from "zustand";

interface GlobalState {
  showBottomBar: boolean;
  setShowBottomBar: () => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  showBottomBar: true,
  setShowBottomBar: () => set({ showBottomBar: !get().showBottomBar }),
}));
