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

import { type Lang } from "@/configs/language";

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

export default async function Page({
  params,
  children,
}: {
  params: { lang: string };
  children: React.ReactNode;
}) {
  const resolvedParams = await params;
  const websiteSchema = generateWebsiteSchema(resolvedParams.lang as Lang);

  return (
    <>
      <SchemaMarkup schema={websiteSchema} />
      {children}
    </>
  );
}
