"use client";

import { useEffect, useState } from "react";

// Functions


// Interfaces
import { ResumeData } from "@/Interfaces/portfolio";
import { type Lang } from "@/configs/language";

interface CachedResume {
  id: string;
  language: string;
  data: ResumeData;
  timestamp: number;
}

interface UserInfoProps {
  params: { lang: Lang };
}

import { useUserStore } from "@/app/[lang]/stores/UserStore";

const UserInfo = ({ params }: UserInfoProps) => {
  const user = useUserStore((state) => state.user);

  

  

  return <>{user && <div>{user?.name}</div>}</>;
};

export default UserInfo;
