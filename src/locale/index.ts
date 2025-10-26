import { cache } from "react";
import en from "./en";
import fa from "./fa";
import de from "./de";

const dictionaries = { en, fa, de };

export type Lang = keyof typeof dictionaries;

export const getDictionary = cache((lang: Lang = "en") => {
  return dictionaries[lang];
});
