/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-08 15:28:13
 * @Description: Shared metadata generator for all pages
 */

import { Lang, languages } from "@/configs/language";
import { generatePageMetadata } from "@/configs/metadata";

type Params = Promise<{ lang: string }>;

/**
 * Generate metadata dynamically based on language and source key
 * @param params - Next.js dynamic route params
 * @param source - Metadata source key in dictionary
 */
export async function createMetadata(params: Params, source: string) {
  const resolvedParams = await params;
  const { lang = "en" } = resolvedParams ?? {};

  const selected: Lang = lang in languages ? (lang as Lang) : "en";

  return generatePageMetadata(selected, source);
}
