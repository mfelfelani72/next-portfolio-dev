import React from "react";
import { Skill, NetworkingExperience } from "@/Interfaces/portfolio";
import SkillProgress from "./SkillProgress";

interface Props {
  skills: Skill[];
  tools: string[];
  networkingExperience: NetworkingExperience[];
}

export default function SkillsSection({
  skills,
  tools,
  networkingExperience,
}: Props) {
  return (
    <section id="skills" className="mt-8 bg-white rounded-xl p-4 shadow-sm">
      <h2 className="text-sm font-semibold text-purple-700">Skills & Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <div>
          {skills.map((s) => (
            <SkillProgress key={s.name} skill={s} />
          ))}
        </div>
        <div>
          <h3 className="text-xs font-semibold">Tooling</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {tools.map((t, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 bg-slate-100 rounded-md"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="text-xs font-semibold mt-3">Networking (selected)</h3>
          <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
            {networkingExperience.map((n) => (
              <li key={n.id}>
                <strong>{n.title}</strong>: {n.details}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
