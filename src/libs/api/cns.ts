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
  method?: "get" | "post" | "put" | "delete" | "patch";
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
}: ConnectParams<T>): Promise<T | false> => {
  try {
    const config = { headers };

    switch (method) {
      case "get":
        const getRes = await axiosClient.get<T>(endPoint, config);
        return getRes.data;
      
      case "post":
        const postRes = await axiosClient.post<T>(endPoint, body, config);
        return postRes.data;
      
      case "put":
        const putRes = await axiosClient.put<T>(endPoint, body, config);
        return putRes.data;
      
      case "delete":
        const deleteRes = await axiosClient.delete<T>(endPoint, config);
        return deleteRes.data;
      
      case "patch":
        const patchRes = await axiosClient.patch<T>(endPoint, body, config);
        return patchRes.data;
      
      default:
        throw new Error("Unsupported method: " + method);
    }
  } catch (error: any) {
    console.error({
      message: `Connection to server failed, route: ${route || endPoint}`,
      error,
    });
    return false;
  }
};