/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:37:37
 * @Description:
 */

"use client";
import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "@/libs/api/useFetch";
import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string; // تغییر از images به image
}

interface ProjectsResponse {
  projects: Project[];
}

export default function Projects() {
  const [manualFetch, setManualFetch] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const hasFetchedFromAPI = useRef(false);

  const { mutate } = useFetch<ProjectsResponse>(
    "get",
    { endPoint: `/api/resume/projects` },
    {
      manual: manualFetch,
      onSuccess: async (res) => {
        if (!res) return;

        if (!hasFetchedFromAPI.current) {
          await saveResumeSection("resume", "projects", res, "global");
          hasFetchedFromAPI.current = true;
          console.log("Projects saved to IndexedDB (global)");
        }

        setProjects(res.projects || []);
        setManualFetch(true);
        document.cookie = `resume_refresh_projects=; path=/; max-age=0`;
      },
    }
  );

  useEffect(() => {
    let mounted = true;

    const loadProjects = async () => {
      try {
        await indexDB.connect();
        const projectsKey = `resume:projects:global`;
        const cachedProjects = await indexDB.read<{ data: ProjectsResponse }>(
          "resume",
          projectsKey
        );

        if (cachedProjects.success && cachedProjects.data?.data?.projects) {
          console.log("Using cached global Projects");
          if (mounted) setProjects(cachedProjects.data.data.projects);
        } else {
          console.log("No cached Projects → fetching from API...");
          setManualFetch(false);
          mutate();
        }

        const projectsCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_projects=`))
          ?.split("=")[1];

        if (projectsCookie === "1") {
          console.log("Projects cookie changed → refetching...");
          setManualFetch(false);
          mutate();
        }
      } catch (error) {
        console.error("IndexedDB error:", error);
        setManualFetch(false);
        mutate();
      }
    };

    loadProjects();
    return () => {
      mounted = false;
    };
  }, [mutate, manualFetch]);

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="mt-8">
      <h2 className="text-sm font-semibold text-indigo-700">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {projects.map((p, index) => (
          <article key={index} className="bg-white rounded-xl p-3 shadow-sm">
            {/* بخش تصویر پروژه - استفاده از image به جای images */}
            {p.image && (
              <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  // برای Base64 images نیاز به config خاصی در next.config.js نیست
                />
              </div>
            )}
            
            <div className="mt-2">
              <div className="text-sm font-semibold">{p.title}</div>
              <div className="text-xs text-gray-600 mt-1">{p.description}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                {p.technologies.map((t, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2 py-1 bg-slate-100 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <a 
                  href={p.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-xs px-2 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  Link
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}