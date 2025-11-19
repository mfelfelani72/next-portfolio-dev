"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Components

import { Skill } from "@/Interfaces/portfolio";

// Functions

import { indexDB } from "@/libs/cache/indexDB/IndexDB";
import { saveResumeSection } from "@/libs/cache/indexDB/helper";

// Hooks

import { useFetch } from "@/libs/api/useFetch";

// Interfaces

interface SkillsResponse {
  skills: Skill[];
}

const Skills = () => {
  // States and Refs

  const [manualFetch, setManualFetch] = useState(true);
  const [skills, setSkills] = useState<(Skill & { color: string; darkColor: string })[]>([]);

  const hasFetchedFromAPI = useRef(false);

  // Constants

  const COLOR_PAIRS = [
    { light: "#3B82F6", dark: "#60A5FA" }, // blue
    { light: "#10B981", dark: "#34D399" }, // green
    { light: "#8B5CF6", dark: "#A78BFA" }, // purple
    { light: "#EF4444", dark: "#F87171" }, // red
    { light: "#F59E0B", dark: "#FBBF24" }, // yellow
    { light: "#6366F1", dark: "#818CF8" }, // indigo
    { light: "#EC4899", dark: "#F472B6" }, // pink
    { light: "#14B8A6", dark: "#2DD4BF" }, // teal
    { light: "#F97316", dark: "#FB923C" }, // orange
    { light: "#06B6D4", dark: "#22D3EE" }, // cyan
    { light: "#84CC16", dark: "#A3E635" }, // lime
    { light: "#F43F5E", dark: "#FB7185" }, // rose
    { light: "#A855F7", dark: "#C084FC" }, // violet
    { light: "#0EA5E9", dark: "#38BDF8" }, // sky
    { light: "#64748B", dark: "#94A3B8" }, // slate
  ];

  // Hooks

  const { t } = useTranslation();

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

  // Functions

  const assignUniqueColors = (skills: Skill[]) => {
    const availableColorPairs = [...COLOR_PAIRS];
    const skillsWithColors = skills.map((skill) => {
      if (availableColorPairs.length === 0) {
        
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        const randomDarkColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        return {
          ...skill,
          color: randomColor,
          darkColor: randomDarkColor
        };
      }

      const randomIndex = Math.floor(Math.random() * availableColorPairs.length);
      const colorPair = availableColorPairs.splice(randomIndex, 1)[0];
      return { 
        ...skill, 
        color: colorPair.light,
        darkColor: colorPair.dark
      };
    });
    return skillsWithColors;
  };

  const getProficiencyText = (level: number) => {
    if (level >= 90) return t("expert");
    if (level >= 70) return t("advanced");
    if (level >= 50) return t("intermediate");
    return t("beginner");
  };

  const getGradientStyle = (color: string, darkColor: string, level: number) => {
    return {
      background: `linear-gradient(90deg, ${color} ${level}%, ${color}22 ${level}%)`,
    };
  };


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
          if (mounted)
            setSkills(assignUniqueColors(cachedSkills.data.data.skills));
        } else {
          setManualFetch(false);
          mutate();
        }

        const skillsCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith(`resume_refresh_skills=`))
          ?.split("=")[1];

        if (skillsCookie === "1") {
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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("skills")}</h2>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded">
          {skills.length}{" "} {t("count_skills")}
        </div>
      </div>
      
      {skills.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="group p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-200 hover:shadow-sm dark:hover:shadow-sm-dark"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {skill.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {skill.level}%
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:inline">
                    {getProficiencyText(skill.level)}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all duration-1000 ease-out group-hover:scale-[1.02] transform"
                    style={getGradientStyle(skill.color, skill.darkColor, skill.level)}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>0%</span>
                  <span className="sm:hidden">{getProficiencyText(skill.level)}</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;