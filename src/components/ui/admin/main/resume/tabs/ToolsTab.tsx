"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface Tool { name: string; type: "tool" | "certification"; }
interface ToolsTabProps { lang: string; }

export default function ToolsTab({ lang }: ToolsTabProps) {
  const { data, mutate } = useFetch("get", { endPoint: `/api/resume/tools/${lang}` });
  const [tools, setTools] = useState<Tool[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setTools(data.tools || []); }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        await fetch(`/api/resume/tools/${lang}`, { method: "PUT", body: JSON.stringify({ tools }) });
        return { tools };
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  const addTool = () => setTools([...tools, { name: "", type: "tool" }]);
  const removeTool = (i: number) => setTools(tools.filter((_, index) => index !== i));

  return (
    <div className="space-y-4 max-w-xl">
      {tools.map((t, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input type="text" value={t.name} onChange={e => { const arr = [...tools]; arr[i].name = e.target.value; setTools(arr); }} placeholder="Tool or Certification Name" className="flex-1 p-2 border rounded"/>
          <select value={t.type} onChange={e => { const arr = [...tools]; arr[i].type = e.target.value as Tool["type"]; setTools(arr); }} className="p-2 border rounded">
            <option value="tool">Tool</option>
            <option value="certification">Certification</option>
          </select>
          <button onClick={() => removeTool(i)} className="px-2 py-1 bg-red-500 text-white rounded">X</button>
        </div>
      ))}
      <button onClick={addTool} className="px-4 py-2 bg-green-600 text-white rounded">Add Tool/Certification</button>
      <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? "Saving..." : "Save Tools & Certifications"}</button>
    </div>
  );
}
