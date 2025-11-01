"use client";
import React, { useEffect, useState } from "react";
import { Skill } from "@/Interfaces/portfolio";

export default function SkillProgress({ skill }: { skill: Skill }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(skill.level), 100); // کمی delay برای animation
    return () => clearTimeout(t);
  }, [skill.level]);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full ${skill.colorClass}`}
          style={{
            width: `${width}%`,
            transition: "width 1s ease-in-out",
          }}
        />
      </div>
    </div>
  );
}
