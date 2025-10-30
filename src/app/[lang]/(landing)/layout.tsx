/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 08:37:33
 * @Description:
 */

import { generateWebsiteSchema } from "@/configs/metadata";

// Components

import { SchemaMarkup } from "@/app/[lang]/ShemaMarkup";

// Interfaces

import { LangLayoutProps } from "@/Interfaces/global";
import { languages, type Lang } from "@/configs/language";

// Functions

import { createMetadata } from "@/libs/metadataHelper";

// Create Metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return createMetadata(params, "home_landing");
}

// Page component

export default async function Page({ children, params }: LangLayoutProps) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";
  const websiteSchema = generateWebsiteSchema(lang);

  return (
    <>
      <SchemaMarkup schema={websiteSchema} />
      {children}
    </>
  );
}
