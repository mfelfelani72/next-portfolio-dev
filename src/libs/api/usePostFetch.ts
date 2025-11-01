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

import { cns } from "./cns";

// Interfaces

interface PostFetchParams<T = any> {
  endPoint: string;
  body?: T;
  route?: string;
}

export const usePostFetch = <T = any>(
  params: PostFetchParams,
  swrConfig?: SWRConfiguration
) => {
  const key = [params.endPoint, JSON.stringify(params.body)];
  const fetcher = () => cns({ method: "post", ...params });
  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher, swrConfig);

  return { data, error, isLoading, mutate };
};
