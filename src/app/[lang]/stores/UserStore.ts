/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 07:09:52
 * @Description:
 */

// Interfaces
import { ResumeData } from "@/Interfaces/portfolio";
import { create } from "zustand";

interface UserState {
  user: ResumeData | false;
  setUser: (value: ResumeData | false) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: false,
  setUser: (value) => set({ user: value }),
}));