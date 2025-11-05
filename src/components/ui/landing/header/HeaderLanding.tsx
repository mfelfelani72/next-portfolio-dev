/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 12:21:19
 * @Description:
 */
import React from "react";
import dynamic from "next/dynamic";

// Components

const HeaderDesktop = dynamic(
  () => import("@/components/ui/landing/header/desktop/HeaderServer")
);
const HeaderMobile = dynamic(
  () => import("@/components/ui/landing/header/mobile/HeaderServer")
);

const HeaderIpad = dynamic(
  () => import("@/components/ui/landing/header/ipad/HeaderServer")
);

// Functions

import detectComponentsResponsive from "@/libs/detectComponentResponsive";

// Interfaces

import { type Lang } from "@/configs/language";

const HeaderLanding = async ({ params }: { params: { lang: Lang } }) => {
  const HeaderComponent = await detectComponentsResponsive(
    HeaderMobile,
    HeaderIpad,
    HeaderDesktop
  );

  return (
    <>
      
      <HeaderComponent params={params} />
    </>
  );
};

export default HeaderLanding;
