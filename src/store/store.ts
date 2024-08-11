import { create } from "zustand";

interface GlobalState {
  showBottomBar: boolean;
  setShowBottomBar: (showOrNot: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({
  showBottomBar: true,
  setShowBottomBar: (showOrNot: boolean) => set({ showBottomBar: showOrNot }),
}));
