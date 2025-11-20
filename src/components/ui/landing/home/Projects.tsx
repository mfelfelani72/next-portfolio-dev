/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:37:37
 * @Description:
 */

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Components

import Image from "next/image";

// Hooks

import { useFetch } from "@/libs/api/useFetch";

// Functions

import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";

// Interfaces

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

interface ProjectsResponse {
  projects: Project[];
}

export default function Projects() {
  // States and Refs
  const [manualFetch, setManualFetch] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  const hasFetchedFromAPI = useRef(false);

  // Hooks

  const { t } = useTranslation();

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

  // Functions

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
          if (mounted) setProjects(cachedProjects.data.data.projects);
        } else {
          setManualFetch(false);
          mutate();
        }

        const projectsCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_projects=`))
          ?.split("=")[1];

        if (projectsCookie === "1") {
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("projects")}
        </h2>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
          {projects.length} {t("count_projects")}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <div
            key={project.id || index}
            className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-400"
          >
            {/* Project Image */}
            {project.image && (
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies - Compact Design */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md truncate max-w-[120px]"
                      title={tech}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span
                      className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md"
                      title={project.technologies.slice(4).join(", ")}
                    >
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200"
                >
                  <span>{t("view_project")}</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>

                {/* Technology Count */}
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                  <span>
                    {project.technologies.length} {t("techs")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
