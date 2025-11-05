/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 07:09:52
 * @Description:
 */

import { create } from "zustand";

// Interfaces

import { ResumeData } from "@/Interfaces/portfolio";

interface UserState {
  user: ResumeData | false;
  setUser: (value: ResumeData | false) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: false,
  setUser: (value) => set({ user: value }),
}));