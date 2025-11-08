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

interface SidebarState {
  isSidebarCollapsed: boolean;
  isMobileSidebarOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
}

type AppState = LoadingState & DeviceState & SidebarState;

import { create } from "zustand";

export const useAppStore = create<AppState>((set) => ({
  // Loading state
  loading: false,
  setLoading: (value) => set({ loading: value }),

  // Device state
  device: "",
  setDevice: (value) => set({ device: value }),

  // Sidebar state
  isSidebarCollapsed: false,
  isMobileSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  toggleMobileSidebar: () => set((state) => ({ isMobileSidebarOpen: !state.isMobileSidebarOpen })),
  setMobileSidebarOpen: (open) => set({ isMobileSidebarOpen: open }),
}));