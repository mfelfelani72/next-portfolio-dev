import React from "react";

import Header from "@/components/ui/resume/header/HeaderLanding";

import { ResumeData } from "@/Interfaces/portfolio";

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
      <div className="h-full flex flex-col bg-amber-200">
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
    
      </div>
    </>
  );
}
