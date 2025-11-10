"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface Project { title: string; description: string; link: string; technologies: string[]; }
interface ProjectsTabProps { lang: string; }

export default function ProjectsTab({ lang }: ProjectsTabProps) {
  const { data, mutate } = useFetch("get", { endPoint: `/api/resume/projects/${lang}` });
  const [projects, setProjects] = useState<Project[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setProjects(data.projects || []); }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        await fetch(`/api/resume/projects/${lang}`, { method: "PUT", body: JSON.stringify({ projects }) });
        return { projects };
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  const addProject = () => setProjects([...projects, { title: "", description: "", link: "", technologies: [] }]);
  const removeProject = (i: number) => setProjects(projects.filter((_, index) => index !== i));

  return (
    <div className="space-y-4 max-w-xl">
      {projects.map((p, i) => (
        <div key={i} className="border p-3 rounded space-y-2">
          <input value={p.title} onChange={e => { const arr = [...projects]; arr[i].title = e.target.value; setProjects(arr); }} placeholder="Title" className="w-full p-2 border rounded"/>
          <textarea value={p.description} onChange={e => { const arr = [...projects]; arr[i].description = e.target.value; setProjects(arr); }} placeholder="Description" className="w-full p-2 border rounded"/>
          <input value={p.link} onChange={e => { const arr = [...projects]; arr[i].link = e.target.value; setProjects(arr); }} placeholder="Link" className="w-full p-2 border rounded"/>
          <input value={p.technologies.join(", ")} onChange={e => { const arr = [...projects]; arr[i].technologies = e.target.value.split(",").map(t => t.trim()); setProjects(arr); }} placeholder="Technologies (comma separated)" className="w-full p-2 border rounded"/>
          <button onClick={() => removeProject(i)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
        </div>
      ))}
      <button onClick={addProject} className="px-4 py-2 bg-green-600 text-white rounded">Add Project</button>
      <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? "Saving..." : "Save Projects"}</button>
    </div>
  );
}
