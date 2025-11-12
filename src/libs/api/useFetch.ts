/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-14 09:23:34
 * @Description:
 */

"use client";

import useSWR, { SWRConfiguration } from "swr";

// Functions

import { cns } from "@/libs/api/cns";

// Interfaces

interface FetchParams<T = any> {
  endPoint: string;
  body?: T;
  route?: string;
}

interface UseFetchConfig extends SWRConfiguration {
  manual?: boolean;
}

// Function to get base URL based on environment
const getBaseUrl = () => {
  // Check if we're in production mode
  if (process.env.NODE_ENV === 'production') {
    return "next-portfolio";
  }
  return "";
};

export const useFetch = <T = any>(
  method: "get" | "post" | "put" | "delete",
  params: FetchParams,
  swrConfig?: UseFetchConfig
) => {
  const baseUrl = getBaseUrl();
  
  const key =
    method === "get" || method === "delete"
      ? `${baseUrl}${params.endPoint}`
      : [`${baseUrl}${params.endPoint}`, JSON.stringify(params.body)];

  const fetcher = () => cns({ method, ...params });

  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher, {
    ...swrConfig,
    revalidateOnMount: !swrConfig?.manual,
    isPaused: () => !!swrConfig?.manual,
  });

  return { data, error, isLoading, mutate };
};