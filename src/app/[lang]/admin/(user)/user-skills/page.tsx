"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface Skill { name: string; level: number; }
interface SkillsTabProps { lang: string; }

export default function page({ lang }: SkillsTabProps) {
  const { data, mutate } = useFetch("get", { endPoint: `/api/resume/skills/` });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setSkills(data.skills || []); }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        await fetch(`/api/resume/skills/`, { method: "PUT", body: JSON.stringify({ skills }) });
        return { skills };
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  const addSkill = () => setSkills([...skills, { name: "", level: 50 }]);
  const removeSkill = (i: number) => setSkills(skills.filter((_, index) => index !== i));

  return (
    <div className="space-y-4 max-w-xl">
      {skills.map((skill, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input type="text" value={skill.name} onChange={e => { const arr = [...skills]; arr[i].name = e.target.value; setSkills(arr); }} placeholder="Skill Name" className="flex-1 p-2 border rounded"/>
          <input type="range" min={0} max={100} value={skill.level} onChange={e => { const arr = [...skills]; arr[i].level = parseInt(e.target.value); setSkills(arr); }} className="w-32"/>
          <span>{skill.level}%</span>
          <button onClick={() => removeSkill(i)} className="px-2 py-1 bg-red-500 text-white rounded">X</button>
        </div>
      ))}
      <button onClick={addSkill} className="px-4 py-2 bg-green-600 text-white rounded">Add Skill</button>
      <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? "Saving..." : "Save Skills"}</button>
    </div>
  );
}
