"use client";

import { useEffect, useRef, useState } from "react";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";
import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { useFetch } from "@/libs/api/useFetch";
import { Skill } from "@/Interfaces/portfolio";

interface SkillsResponse {
  skills: Skill[];
}

const Skills = () => {
  const [manualFetch, setManualFetch] = useState(true);
  const [skills, setSkills] = useState<Skill[]>([]);
  const hasFetchedFromAPI = useRef(false);

  const { data, mutate } = useFetch<SkillsResponse>(
    "get",
    { endPoint: `/api/resume/skills` },
    {
      manual: manualFetch,
      onSuccess: async (res) => {
        if (!res) return;

        if (!hasFetchedFromAPI.current) {
          await saveResumeSection("resume", "skills", res, "global");
          hasFetchedFromAPI.current = true;
          console.log("Skills saved to IndexedDB (global)");
        }

        setSkills(res.skills);
        setManualFetch(true);
        document.cookie = `resume_refresh_skills=; path=/; max-age=0`;
      },
    }
  );

  useEffect(() => {
    let mounted = true;

    const loadSkills = async () => {
      try {
        await indexDB.connect();
        const skillsKey = `resume:skills:global`;
        const cachedSkills = await indexDB.read<{ data: SkillsResponse }>(
          "resume",
          skillsKey
        );

        if (cachedSkills.success && cachedSkills.data?.data) {
          console.log("Using cached global skills");
          if (mounted) setSkills(cachedSkills.data.data.skills);
        } else {
          console.log("No cached skills → fetching from API...");
          setManualFetch(false);
          mutate();
        }

        const skillsCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_skills=`))
          ?.split("=")[1];

        if (skillsCookie === "1") {
          console.log("Skills cookie changed → refetching...");
          setManualFetch(false);
          mutate();
        }
      } catch (error) {
        console.error("IndexedDB error:", error);
        setManualFetch(false);
        mutate();
      }
    };

    loadSkills();

    return () => {
      mounted = false;
    };
  }, [mutate,manualFetch]);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <h2 className="text-lg font-bold mb-3">مهارت‌ها</h2>
      {skills.length > 0 ? (
        skills.map((skill, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full ${skill.colorClass}`}
                style={{
                  width: `${skill.level}%`,
                  transition: "width 1s ease-in-out",
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">هیچ مهارتی ثبت نشده است</p>
      )}
    </div>
  );
};

export default Skills;
