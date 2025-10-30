"use client";

import React, { useEffect, useState } from "react";
import { ResumeData } from "@/Interfaces/portfolio";

// Client components
import Nav from "@/components/Nav";
import MobileDrawer from "@/components/MobileDrawer";
import Sidebar from "@/components/Sidebar";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import NetworkSection from "@/components/NetworkSection";
import CertificationsSection from "@/components/CertificationsSection";
import LanguagesSection from "@/components/LanguagesSection";
import ContactSection from "@/components/ContactSection";

interface ResumeClientProps {
  initialData: ResumeData;
  lang: string;
}

export default function ResumeClient({ initialData, lang }: ResumeClientProps) {
  const [data, setData] = useState<ResumeData>(initialData);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [currentLang, setCurrentLang] = useState(lang);
  const [isLoading, setIsLoading] = useState(false);

  // Handle language changes
  useEffect(() => {
    if (currentLang !== lang) {
      fetchResume(currentLang);
    }
  }, [currentLang, lang]);

  const fetchResume = async (language: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/resume/${language}`);
      if (!response.ok) {
        throw new Error('Failed to fetch resume');
      }
      const newData: ResumeData = await response.json();
      setData(newData);
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Intersection Observer for active section tracking
  useEffect(() => {
    if (typeof window === "undefined" || !data) return;
    
    const sectionIds = [
      "home",
      "skills",
      "projects",
      "network",
      "certs",
      "languages",
      "contact",
    ];
    
    const observers: IntersectionObserver[] = [];
    
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(id);
            }
          });
        },
        { 
          root: null, 
          threshold: 0.6,
          rootMargin: '-10% 0px -10% 0px'
        }
      );
      
      observer.observe(element);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [data]);

  const handleToggleMobile = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleCloseMobile = () => {
    setMobileOpen(false);
  };

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
    github: ""
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-50 text-slate-900 text-sm">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-gray-700">Loading...</span>
          </div>
        </div>
      )}
      
      <ClientNav
        active={active}
        onToggleMobile={handleToggleMobile}
        contactEmail={contact.email}
        name={data.name}
        title={data.title}
        currentLang={currentLang}
        onLangChange={setCurrentLang}
      />
      
      <ClientMobileDrawer
        open={mobileOpen}
        onClose={handleCloseMobile}
        active={active}
      />

      <main className="max-w-5xl mx-auto pt-28 pb-20 px-4">
        {/* Home Section */}
        <ClientHomeSection
          data={data}
          contact={contact}
        />

        {/* Skills Section */}
        <div id="skills">
          <ClientSkillsSection
            skills={data.skills || []}
            tools={data.tools || []}
            networkingExperience={data.networkingExperience || []}
          />
        </div>

        {/* Projects Section */}
        <div id="projects">
          <ClientProjectsSection projects={data.projects || []} />
        </div>

        {/* Network Section */}
        <div id="network">
          <ClientNetworkSection />
        </div>

        {/* Certifications Section */}
        <div id="certs">
          <ClientCertificationsSection certifications={data.certifications || []} />
        </div>

        {/* Languages Section */}
        <div id="languages">
          <ClientLanguagesSection languages={data.languages || []} />
        </div>

        {/* Contact Section */}
        <div id="contact">
          <ClientContactSection contact={contact} />
        </div>
      </main>
    </div>
  );
}