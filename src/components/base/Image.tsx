/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-08 10:10:51
 * @Description:
 */
import NextImage, { ImageProps } from "next/image";
import { nextImageLoader } from "@/utils/nextImageLoader";

const Image = (props: ImageProps) => {
  return <NextImage {...props} loader={nextImageLoader} />;
};

export default Image;
