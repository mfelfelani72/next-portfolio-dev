import { cache } from "react";
import en from "./en";
import fa from "./fa";

const dictionaries = { en, fa };

export type Lang = keyof typeof dictionaries;

export const getDictionary = cache((lang: Lang = "en") => {
  return dictionaries[lang];
});
