/*
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:47:36
 * @Description:
 */
import React from "react";
import { Skill } from "@/Interfaces/portfolio";
import SkillProgress from "./SkillProgress";

interface Props {
  skills: Skill[];
  name: string;
  title: string;
  email: string;
}

export default function Sidebar({ skills, name, title, email }: Props) {
  return (
    <aside className="bg-white rounded-xl p-4 shadow-sm sticky top-28">
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div className="text-center">
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-gray-500">{title}</div>
        </div>
        <div className="w-full mt-2">
          {skills.slice(0, 4).map((s) => (
            <SkillProgress key={s.name} skill={s} />
          ))}
        </div>
        <a
          href={`mailto:${email}`}
          className="w-full text-center px-3 py-1 rounded-md bg-indigo-600 text-white text-xs"
        >
          Contact
        </a>
      </div>
    </aside>
  );
}
