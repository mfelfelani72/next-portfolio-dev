import React from "react";

// Components

import Bio from "@/components/ui/landing/home/Bio";

// Interfaces

import { languages, type Lang } from "@/configs/language";
import Skills from "@/components/ui/landing/home/Skills";
import Languages from "@/components/ui/landing/home/Languages";
import Contact from "@/components/ui/landing/home/Contact";
import Certifications from "@/components/ui/landing/home/Certifications";
import ProjectsSection from "@/components/ui/landing/home/Projects";

export default async function PageLanding({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang =
    resolvedParams.lang in languages ? (resolvedParams.lang as Lang) : "en";

  return (
    <>
      <div className="w-full h-full flex flex-col gap-2 px-5">
        <Bio params={{ lang }} />
        <Certifications />
        <Skills />
        <ProjectsSection />
        <Languages />
        <Contact />
      </div>
    </>
  );
}
