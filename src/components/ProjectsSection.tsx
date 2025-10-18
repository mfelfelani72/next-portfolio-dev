/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:37:37
 * @Description:
 */

"use client";
import React from "react";
import ProjectGallery from "./ProjectGallery";

interface Project {
  id:number;
  title:string;
  description:string;
  technologies:string[];
  link:string;
  images:string[];
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="mt-8">
      <h2 className="text-sm font-semibold text-indigo-700">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        {projects.map(p=>(
          <article key={p.id} className="bg-white rounded-xl p-3 shadow-sm">
            <ProjectGallery images={p.images}/>
            <div className="mt-2">
              <div className="text-sm font-semibold">{p.title}</div>
              <div className="text-xs text-gray-600 mt-1">{p.description}</div>
              <div className="flex flex-wrap gap-2 mt-2">{p.technologies.map((t,i)=><span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded-md">{t}</span>)}</div>
              <div className="mt-2 flex gap-2"><a href={p.link} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded-md bg-indigo-600 text-white">GitHub</a></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

