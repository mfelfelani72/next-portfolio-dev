"use client";

import { useState, useEffect } from "react";
import { useFetch } from "@/libs/api/useFetch";

interface Project { 
  title: string; 
  description: string; 
  link: string; 
  technologies: string[]; 
  image: string; // اضافه کردن فیلد عکس
}

export default function Projects() {
  const { data, mutate } = useFetch("get", { endPoint: `/api/resume/projects/` });
  const [projects, setProjects] = useState<Project[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (data) setProjects(data.projects || []); }, [data]);

  const handleSave = async () => {
    setSaving(true);
    await mutate(
      async () => {
        await fetch(`/api/resume/projects/`, { 
          method: "PUT", 
          body: JSON.stringify({ projects }),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        return { projects };
      },
      { revalidate: true }
    );
    setSaving(false);
  };

  const addProject = () => setProjects([...projects, { 
    title: "", 
    description: "", 
    link: "", 
    technologies: [], 
    image: "" 
  }]);

  const removeProject = (i: number) => setProjects(projects.filter((_, index) => index !== i));

  // تابع برای تبدیل فایل به base64
  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const arr = [...projects];
      arr[index].image = base64String;
      setProjects(arr);
    };
    reader.readAsDataURL(file);
  };

  // تابع برای حذف عکس
  const removeImage = (index: number) => {
    const arr = [...projects];
    arr[index].image = "";
    setProjects(arr);
  };

  return (
    <div className="space-y-4 max-w-xl">
      {projects.map((p, i) => (
        <div key={i} className="border p-3 rounded space-y-2">
          {/* نمایش عکس اگر وجود دارد */}
          {p.image && (
            <div className="relative">
              <img 
                src={p.image} 
                alt="Project cover" 
                className="w-full h-32 object-cover rounded border"
              />
              <button 
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          )}
          
          <input 
            value={p.title} 
            onChange={e => { 
              const arr = [...projects]; 
              arr[i].title = e.target.value; 
              setProjects(arr); 
            }} 
            placeholder="Title" 
            className="w-full p-2 border rounded"
          />
          
          <textarea 
            value={p.description} 
            onChange={e => { 
              const arr = [...projects]; 
              arr[i].description = e.target.value; 
              setProjects(arr); 
            }} 
            placeholder="Description" 
            className="w-full p-2 border rounded"
          />
          
          <input 
            value={p.link} 
            onChange={e => { 
              const arr = [...projects]; 
              arr[i].link = e.target.value; 
              setProjects(arr); 
            }} 
            placeholder="Link" 
            className="w-full p-2 border rounded"
          />
          
          <input 
            value={p.technologies.join(", ")} 
            onChange={e => { 
              const arr = [...projects]; 
              arr[i].technologies = e.target.value.split(",").map(t => t.trim()); 
              setProjects(arr); 
            }} 
            placeholder="Technologies (comma separated)" 
            className="w-full p-2 border rounded"
          />
          
          {/* فیلد آپلود عکس */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Project Image
            </label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // بررسی سایز فایل (مثلاً حداکثر 2MB)
                  if (file.size > 2 * 1024 * 1024) {
                    alert("File size should be less than 2MB");
                    return;
                  }
                  handleImageUpload(i, file);
                }
              }}
              className="w-full p-2 border rounded"
            />
            <p className="text-xs text-gray-500">
              Supported formats: JPG, PNG, GIF (Max: 2MB)
            </p>
          </div>
          
          <button 
            onClick={() => removeProject(i)} 
            className="px-2 py-1 bg-red-500 text-white rounded"
          >
            Remove Project
          </button>
        </div>
      ))}
      
      <button 
        onClick={addProject} 
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Project
      </button>
      
      <button 
        onClick={handleSave} 
        disabled={saving} 
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Projects"}
      </button>
    </div>
  );
}