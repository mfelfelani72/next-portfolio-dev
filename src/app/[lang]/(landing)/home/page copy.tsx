"use client";
import React, { useEffect, useState } from "react";

import Sidebar from "@/components/ui/landing/Sidebar";
import SkillsSection from "@/components/ui/landing/SkillsSection";
import ProjectsSection from "@/components/ui/landing/ProjectsSection";
import NetworkSection from "@/components/ui/landing/NetworkSection";
import CertificationsSection from "@/components/ui/landing/CertificationsSection";
import LanguagesSection from "@/components/ui/landing/LanguagesSection";
import ContactSection from "@/components/ui/landing/ContactSection";
import { ResumeData } from "@/Interfaces/portfolio";

export default function PageLanding({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = React.use(params);
  const [data, setData] = useState<ResumeData | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [currentLang, setCurrentLang] = useState(resolvedParams.lang || "en");

  useEffect(() => {
    fetchResume(currentLang);
  }, [currentLang]);

  const fetchResume = async (language: string) => {
    try {
      const response = await fetch(`/api/resume/${language}`);
      if (!response.ok) {
        throw new Error("Failed to fetch resume");
      }
      const data: ResumeData = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !data) return;

    const ids = [
      "home",
      "skills",
      "projects",
      "network",
      "certs",
      "languages",
      "contact",
    ];

    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(id);
          });
        },
        { root: null, threshold: 0.6 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const contact = data.contact || {
    email: "",
    linkedin: "",
    github: "",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-50 text-slate-900 text-sm">
      <main className="max-w-5xl mx-auto pt-28 pb-20 px-4">
        {/* Home Section with Sidebar */}
        <section
          id="home"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
        >
          <div className="md:col-span-2 bg-white rounded-xl p-5 shadow-sm">
            <h1 className="text-xl font-bold">{data.name}</h1>
            <div className="text-xs text-indigo-600 font-medium mt-1">
              {data.title}
            </div>
            <p className="mt-3 text-sm text-gray-700">{data.summary}</p>
          </div>

          <Sidebar
            skills={data.skills || []}
            name={data.name}
            title={data.title}
            email={contact.email}
          />
        </section>

        {/* Other Sections */}
        <SkillsSection
          skills={data.skills || []}
          tools={data.tools || []}
          networkingExperience={data.networkingExperience || []}
        />
        <ProjectsSection projects={data.projects || []} />
        <NetworkSection />
        <CertificationsSection certifications={data.certifications || []} />
        <LanguagesSection languages={data.languages || []} />
        <ContactSection contact={contact} />
      </main>
    </div>
  );
}
