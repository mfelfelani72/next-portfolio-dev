"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import MobileDrawer from "@/components/MobileDrawer";
import Sidebar from "@/components/Sidebar";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import NetworkSection from "@/components/NetworkSection";
import CertificationsSection from "@/components/CertificationsSection";
import LanguagesSection from "@/components/LanguagesSection";
import ContactSection from "@/components/ContactSection";
import { ResumeData } from "@/Interfaces/portfolio";

export default function PageLanding() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");


  useEffect(() => {
    fetch("/next-portfolio/api/resume/")
      .then((r) => r.json())
      .then((d: ResumeData) => setData(d));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
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
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-50 text-slate-900 text-sm">
      <Nav
        active={active}
        onToggleMobile={() => setMobileOpen((s) => !s)}
        contactEmail={data.contact.email}
        name={data.name}
        title={data.title}
      />
      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        active={active}
      />

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
            skills={data.skills}
            name={data.name}
            title={data.title}
            email={data.contact.email}
          />
        </section>

        {/* Other Sections */}
        <SkillsSection
          skills={data.skills}
          tools={data.tools}
          networkingExperience={data.networkingExperience}
        />
        <ProjectsSection projects={data.projects} />
        <NetworkSection />
        <CertificationsSection certifications={data.certifications} />
        <LanguagesSection languages={data.languages} />
        <ContactSection contact={data.contact} />
      </main>
    </div>
  );
}
