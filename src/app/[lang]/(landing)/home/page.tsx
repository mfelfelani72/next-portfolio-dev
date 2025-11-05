import React from "react";

// Components

import Bio from "@/components/ui/landing/home/Bio";

// Interfaces

import { languages, type Lang } from "@/configs/language";

export default async function PageLanding({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <Bio params={{ lang }}  />
      </div>
    </>
  );
}
