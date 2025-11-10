"use client";
import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface Certification {
  title: string;
  year: string;
}

interface ToolsData {
  tools: string[];
  certifications: Certification[];
}

export default function ToolsTab({ lang }: { lang: string }) {
  const { data, mutate } = useFetch("get", { endPoint: `/api/resume/${lang}/tools/` });
  const [toolsData, setToolsData] = useState<ToolsData>({ tools: [], certifications: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setToolsData(data);
  }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        await fetch(`/api/resume/${lang}/tools/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toolsData),
        });
        return toolsData;
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  // 🔧 Tools
  const addTool = () =>
    setToolsData((prev) => ({ ...prev, tools: [...prev.tools, ""] }));
  const removeTool = (index: number) =>
    setToolsData((prev) => ({
      ...prev,
      tools: prev.tools.filter((_, i) => i !== index),
    }));
  const updateTool = (index: number, value: string) =>
    setToolsData((prev) => ({
      ...prev,
      tools: prev.tools.map((t, i) => (i === index ? value : t)),
    }));

  // 🎓 Certifications
  const addCertification = () =>
    setToolsData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, { title: "", year: "" }],
    }));
  const removeCertification = (index: number) =>
    setToolsData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  const updateCertification = (
    index: number,
    field: "title" | "year",
    value: string
  ) =>
    setToolsData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="font-semibold text-lg">🧰 Tools</h3>
        <button
          onClick={addTool}
          className="px-3 py-1 bg-green-600 text-white rounded mt-2"
        >
          Add Tool
        </button>
        {toolsData.tools.map((tool, index) => (
          <div key={index} className="flex gap-2 items-center mt-2">
            <input
              type="text"
              value={tool}
              onChange={(e) => updateTool(index, e.target.value)}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={() => removeTool(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold text-lg">🎓 Certifications</h3>
        <button
          onClick={addCertification}
          className="px-3 py-1 bg-green-600 text-white rounded mt-2"
        >
          Add Certification
        </button>
        {toolsData.certifications.map((cert, index) => (
          <div key={index} className="flex gap-2 items-center mt-2">
            <input
              type="text"
              placeholder="Title"
              value={cert.title}
              onChange={(e) =>
                updateCertification(index, "title", e.target.value)
              }
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Year"
              value={cert.year}
              onChange={(e) =>
                updateCertification(index, "year", e.target.value)
              }
              className="w-24 p-2 border rounded"
            />
            <button
              onClick={() => removeCertification(index)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {saving ? "Saving..." : "Save Tools & Certifications"}
      </button>
    </div>
  );
}
