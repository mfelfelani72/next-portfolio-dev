/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 15:00:49
 * @Description:
 */
import type { ReactNode } from "react";
import { type Lang } from "@/configs/language";

// Interfaces

import { Dictionary } from "@/Interfaces/dictionary";

export interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export interface LangWrapperProps {
  langFromUrl: Lang;
  dictionary: Dictionary;
  children: ReactNode;
}
