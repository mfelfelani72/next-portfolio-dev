/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-14 09:23:34
 * @Description:
 */

import axiosClient from "./axiosClient";

// Interfaces

interface ConnectParams<T = any> {
  method?: "get" | "post";
  endPoint: string;
  body?: T;
  headers?: Record<string, string>;
  route?: string;
}

export const cns = async <T = any>({
  method = "post",
  endPoint,
  body,
  headers,
  route,
}: ConnectParams<T>) => {
  try {
    const config = { headers };

    if (method === "post") {
      const res = await axiosClient.post<T>(endPoint, body, config);
      return res.data;
    } else if (method === "get") {
      const res = await axiosClient.get<T>(endPoint, config);
      return res.data;
    }
    throw new Error("Unsupported method: " + method);
  } catch (error: any) {
    console.error({
      message: `Connection to server failed, route: ${route || endPoint}`,
      error,
    });
    return false;
  }
};
