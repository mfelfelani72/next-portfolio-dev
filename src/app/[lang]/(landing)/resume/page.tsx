import React from "react";

import Header from "@/components/ui/resume/header/HeaderLanding";

import { ResumeData } from "@/Interfaces/portfolio";

import { languages, type Lang } from "@/configs/language";

export default async function PageLanding({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";

  //   useEffect(() => {
  //     fetchResume(currentLang);
  //   }, [currentLang]);

  //   const fetchResume = async (language: string) => {
  //     try {
  //       const response = await fetch(`/api/resume/${language}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch resume");
  //       }
  //       const data: ResumeData = await response.json();
  //       setData(data);
  //     } catch (error) {
  //       console.error("Error fetching resume:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     if (typeof window === "undefined" || !data) return;

  //     const ids = [
  //       "home",
  //       "skills",
  //       "projects",
  //       "network",
  //       "certs",
  //       "languages",
  //       "contact",
  //     ];

  //     const observers: IntersectionObserver[] = [];

  //     ids.forEach((id) => {
  //       const el = document.getElementById(id);
  //       if (!el) return;

  //       const obs = new IntersectionObserver(
  //         (entries) => {
  //           entries.forEach((entry) => {
  //             if (entry.isIntersecting) setActive(id);
  //           });
  //         },
  //         { root: null, threshold: 0.6 }
  //       );

  //       obs.observe(el);
  //       observers.push(obs);
  //     });

  //     return () => observers.forEach((o) => o.disconnect());
  //   }, [data]);

  //   if (!data) {
  //     return null;
  //   }

  // Define contact with fallback values
  //   const contact = data.contact || {
  //     email: "",
  //     linkedin: "",
  //     github: "",
  //   };

  return (
    <>
      <div className="h-full flex flex-col bg-amber-200">
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
        <div>sdsadf</div>
    
      </div>
    </>
  );
}
