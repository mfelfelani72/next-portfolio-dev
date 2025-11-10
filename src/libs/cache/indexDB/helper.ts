// Functions

import { indexDB } from "@/libs/cache/indexDB/IndexDB";

export const saveResumeSection = async <T>(
  table: string = "resume",
  section: string,
  data: T,
  lang?: string,
) => {
  const key = lang ? `${table}:${section}:${lang}` : `${table}:${section}`;

  const record = {
    id: key,
    section,
    language: lang || null,
    data,
    timestamp: Date.now(),
  };

  try {
    const result = await indexDB.update(table, key, record);

    if (!result.success) {
      console.error(
        `Failed to save section '${section}' in IndexedDB:`,
        result.error
      );
    } else {
      console.log(`Saved '${section}' (${lang || "default"}) to IndexedDB`);
    }

    return result;
  } catch (error) {
    console.error(`Error saving section '${section}':`, error);
    return { success: false, error };
  }
};
