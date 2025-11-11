"use client";

import { useEffect, useRef, useState } from "react";
import { indexDB } from "@/libs/cache/indexDB/IndexDB";
import { saveResumeSection } from "@/libs/cache/indexDB/helper";
import { useFetch } from "@/libs/api/useFetch";
import { Skill } from "@/Interfaces/portfolio";

interface SkillsResponse {
  skills: Skill[];
}

// رنگ‌های شاد
const COLORS = [
  "bg-red-400",
  "bg-orange-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-teal-400",
  "bg-blue-400",
  "bg-indigo-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-fuchsia-400",
];

// تخصیص رنگ‌های منحصربه‌فرد به هر مهارت
const assignUniqueColors = (skills: Skill[]) => {
  const colors = [...COLORS]; // کپی آرایه رنگ‌ها
  const skillsWithColors = skills.map((skill) => {
    // اگر رنگ‌ها تموم شد، دوباره آرایه رنگ‌ها رو کپی می‌کنیم
    if (colors.length === 0) colors.push(...COLORS);
    // انتخاب رندوم رنگ و حذف از آرایه برای جلوگیری از تکرار
    const randomIndex = Math.floor(Math.random() * colors.length);
    const colorClass = colors.splice(randomIndex, 1)[0];
    return { ...skill, colorClass };
  });
  return skillsWithColors;
};

const Skills = () => {
  const [manualFetch, setManualFetch] = useState(true);
  const [skills, setSkills] = useState<(Skill & { colorClass: string })[]>([]);
  const hasFetchedFromAPI = useRef(false);

  const { mutate } = useFetch<SkillsResponse>(
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

        setSkills(assignUniqueColors(res.skills));
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
          if (mounted) setSkills(assignUniqueColors(cachedSkills.data.data.skills));
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
  }, [mutate, manualFetch]);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm w-full mx-auto">
      <h2 className="text-lg font-bold mb-3 text-center md:text-left">مهارت‌ها</h2>
      {skills.length > 0 ? (
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <div key={index}>
              <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full ${skill.colorClass}`}
                  style={{
                    width: `${skill.level}%`,
                    transition: "width 1s ease-in-out",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center">هیچ مهارتی ثبت نشده است</p>
      )}
    </div>
  );
};

export default Skills;
