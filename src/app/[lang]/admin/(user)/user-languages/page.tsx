"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface Language { name: string; level: string; percent: number; }
interface LanguagesTabProps { lang: string; }

export default function page({ lang }: LanguagesTabProps) {
  const { data, mutate } = useFetch("get", { endPoint: `/api/resume/languages/` });
  const [languagesList, setLanguagesList] = useState<Language[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setLanguagesList(data.languages || []); }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        await fetch(`/api/resume/languages/`, { method: "PUT", body: JSON.stringify({ languages: languagesList }) });
        return { languages: languagesList };
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  const addLanguage = () => setLanguagesList([...languagesList, { name: "", level: "", percent: 50 }]);
  const removeLanguage = (i: number) => setLanguagesList(languagesList.filter((_, index) => index !== i));

  return (
    <div className="space-y-4 max-w-xl">
      {languagesList.map((l, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input type="text" value={l.name} onChange={e => { const arr = [...languagesList]; arr[i].name = e.target.value; setLanguagesList(arr); }} placeholder="Language Name" className="flex-1 p-2 border rounded"/>
          <input type="text" value={l.level} onChange={e => { const arr = [...languagesList]; arr[i].level = e.target.value; setLanguagesList(arr); }} placeholder="Level e.g. Native/Fluent" className="p-2 border rounded w-32"/>
          <input type="number" value={l.percent} onChange={e => { const arr = [...languagesList]; arr[i].percent = parseInt(e.target.value); setLanguagesList(arr); }} placeholder="%" className="p-2 border rounded w-20"/>
          <button onClick={() => removeLanguage(i)} className="px-2 py-1 bg-red-500 text-white rounded">X</button>
        </div>
      ))}
      <button onClick={addLanguage} className="px-4 py-2 bg-green-600 text-white rounded">Add Language</button>
      <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? "Saving..." : "Save Languages"}</button>
    </div>
  );
}
