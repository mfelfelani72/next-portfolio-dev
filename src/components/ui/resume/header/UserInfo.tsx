"use client";

import { useEffect, useState } from "react";

// Functions
import { indexDB } from "@/libs/cache/indexDB/IndexDB";

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

const UserInfo = ({ params }: UserInfoProps) => {
  const [data, setData] = useState<CachedResume | {}>({});

  const checkCacheFirst = async () => {
      try {
        await indexDB.connect();

        const cached = await indexDB.read<CachedResume>("user", params.lang);

        if (cached.success && cached.data) {
          setData(cached.data.data);
        } else {
          console.log(
            "No cached data for language:",
            params.lang,
            "fetching from API"
          );
        }
      } catch (error) {
        console.error("Error checking cache:", error);
      }
    };


  useEffect(() => {
    
    checkCacheFirst();
  }, []);

  return (
    <>
    
      <div>{data?.name}</div>
    </>
  );
};

export default UserInfo;
