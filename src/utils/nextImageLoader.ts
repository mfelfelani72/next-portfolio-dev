/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-08 10:05:47
 * @Description:
 */

import { ImageLoaderProps } from "next/image";

export const nextImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  const isExternal = src.startsWith("http://") || src.startsWith("https://");

  const basePath =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_PATH || ""
      : "";

  const finalSrc = isExternal ? src : `${basePath}${src}`;

  return `${finalSrc}?w=${width}&q=${quality || 75}`;
};