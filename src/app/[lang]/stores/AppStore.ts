/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 07:09:52
 * @Description:
 */

// Interfaces

interface LoadingState {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

interface DeviceState {
  device: string;
  setDevice: (value: string) => void;
}

type AppState = LoadingState & DeviceState;

import { create } from "zustand";

export const useAppStore = create<AppState>((set) => ({
  // Loading state
  loading: false,
  setLoading: (value) => set({ loading: value }),

  // Device state
  device: "",
  setDevice: (value) => set({ device: value }),
}));
