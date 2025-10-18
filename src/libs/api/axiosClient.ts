/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-14 09:17:37
 * @Description:
 */

import axios from "axios";

// Constants

const isSSR = typeof window === "undefined";
const isProduction = process.env.NODE_ENV == "production";
const baseUrlSSR = process.env.NEXT_PUBLIC_API_URL + "/";
const baseUrlCSR =
  isProduction && !isSSR
    ? process.env.NEXT_PUBLIC_BASE_URL +
      "" +
      process.env.NEXT_PUBLIC_BASE_PORT +
      "" +
      process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.NEXT_PUBLIC_BASE_URL + "" + process.env.NEXT_PUBLIC_BASE_PORT;

const baseURL = isSSR ? baseUrlSSR : baseUrlCSR;

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: isSSR
    ? {
        "Accept-Version": 1,
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: process.env.NEXT_PUBLIC_AUTHORIZATION,
      }
    : {},
  withCredentials: isSSR && isProduction,
  withXSRFToken: isSSR && isProduction,
});

export default axiosClient;
