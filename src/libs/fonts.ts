/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 09:42:26
 * @Description:
 */

import localFont from "next/font/local";

export const yekanBakh = localFont({
  src: [
    {
      path: "../../public/fonts/Yekan_Bakh_Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Yekan_Bakh_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Yekan_Bakh_Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Yekan_Bakh_Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-yekan-bakh",
  display: "swap",
  preload: true,
});

export const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
});
