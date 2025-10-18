"use client"; // Next.js App Router: client component

import React, { useEffect, useState } from "react";
import { type Lang } from "@/configs/language";

/* --------------------- TypeScript Types --------------------- */
type Skill = { name: string; level: number; colorClass: string };
type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  images: string[];
};
type Certification = { id: number; title: string; year: string };
type NetworkingExperience = { id: number; title: string; details: string };
type Language = { name: string; level: string; percent: number };
type Contact = { email: string; linkedin: string; github: string };

type MockData = {
  name: string;
  title: string;
  summary: string;
  skills: Skill[];
  tools: string[];
  networkingExperience: NetworkingExperience[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  contact: Contact;
};

/* --------------------- Mock Data --------------------- */
const mockData: MockData = {
  name: "Ali Reza",
  title: "Senior Full Stack Developer",
  summary:
    "Full-stack engineer focused on resilient architectures, automation, and operational excellence. Experienced in building high-traffic services, automating network infra (Cisco), and shaping monitoring & SRE practices.",
  skills: [
    { name: "React", level: 90, colorClass: "skill-grad-1" },
    { name: "Next.js", level: 85, colorClass: "skill-grad-2" },
    { name: "TypeScript", level: 80, colorClass: "skill-grad-3" },
    { name: "Node.js", level: 85, colorClass: "skill-grad-4" },
    { name: "GraphQL", level: 75, colorClass: "skill-grad-5" },
    { name: "Docker", level: 70, colorClass: "skill-grad-6" },
    { name: "AWS", level: 65, colorClass: "skill-grad-7" },
  ],
  tools: [
    "Ansible",
    "Terraform",
    "Prometheus",
    "Grafana",
    "Kubernetes",
    "Docker",
    "GitOps",
  ],
  networkingExperience: [
    {
      id: 1,
      title: "Cisco IOS & Automations",
      details:
        "Design and template Cisco IOS configs (BGP, OSPF, VLAN, ACLs). Automated deployments using Ansible and Jinja2 templates.",
    },
    {
      id: 2,
      title: "Network Troubleshooting",
      details:
        "Packet troubleshooting, Netflow analysis, and performance tuning for WAN/VCPE appliances.",
    },
  ],
  certifications: [
    { id: 1, title: "CCNA — Cisco Certified Network Associate", year: "2019" },
    { id: 2, title: "AWS Solutions Architect — Associate", year: "2021" },
    { id: 3, title: "CKA — Certified Kubernetes Administrator", year: "2022" },
  ],
  projects: [
    {
      id: 1,
      title: "NextGen E-commerce",
      description:
        "Serverless storefront with realtime inventory syncing and resilient checkout flow.",
      technologies: ["Next.js", "GraphQL", "Lambda", "Docker"],
      link: "https://github.com/alireza/nextgen-ecommerce",
      images: [
        "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    {
      id: 2,
      title: "Enterprise Analytics Dashboard",
      description:
        "Streaming analytics dashboard with custom visualizations and role-based access.",
      technologies: ["React", "D3", "Postgres", "Node"],
      link: "https://github.com/alireza/analytics-dashboard",
      images: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80",
      ],
    },
    {
      id: 3,
      title: "Real-time Chat Service",
      description:
        "High-throughput messaging with optimistic UI, message batching and media attachments.",
      technologies: ["Socket.IO", "Redis", "MongoDB"],
      link: "https://github.com/alireza/realtime-chat",
      images: [
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      ],
    },
  ],
  languages: [
    { name: "Persian (Farsi)", level: "Native", percent: 100 },
    { name: "English", level: "Fluent", percent: 90 },
    { name: "French", level: "Intermediate", percent: 60 },
  ],
  contact: {
    email: "ali.reza@example.com",
    linkedin: "https://linkedin.com/in/alireza",
    github: "https://github.com/alireza",
  },
};

/* --------------------- Components --------------------- */
function Nav({
  active,
  onToggleMobile,
}: {
  active: string;
  onToggleMobile: () => void;
}) {
  const items = [
    "home",
    "skills",
    "projects",
    "network",
    "certs",
    "languages",
    "contact",
  ];
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center font-bold text-white">
            AR
          </div>
          <div>
            <div className="text-sm font-semibold">{mockData.name}</div>
            <div className="text-xs text-gray-500">{mockData.title}</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          {items.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`px-3 py-1 rounded-md text-xs font-medium transition transform ${
                active === id
                  ? "bg-indigo-600 text-white scale-105 shadow"
                  : "text-gray-700 hover:scale-105"
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a
            href={`mailto:${mockData.contact.email}`}
            className="ml-3 px-3 py-1 rounded-md bg-amber-400 text-white text-xs font-semibold"
          >
            Hire
          </a>
        </nav>

        <div className="md:hidden">
          <button
            onClick={onToggleMobile}
            aria-label="Toggle menu"
            className="p-2 rounded-md bg-white shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="#111827"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function MobileDrawer({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: string;
}) {
  const items = [
    "home",
    "skills",
    "projects",
    "network",
    "certs",
    "languages",
    "contact",
  ];
  if (!open) return null;
  return (
    <div className="max-w-5xl mx-auto mt-2 bg-white rounded-xl p-3 shadow-sm">
      <div className="flex flex-col gap-2">
        {items.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={onClose}
            className={`px-3 py-2 rounded-md text-sm ${
              active === id
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </div>
    </div>
  );
}

function SkillProgress({ skill }: { skill: Skill }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
        <span>{skill.name}</span>
        <span>{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full ${skill.colorClass}`}
          style={{ width: `${skill.level}%`, transition: "width 900ms ease" }}
        />
      </div>
    </div>
  );
}

function ProjectGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), 3500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative w-full rounded-md overflow-hidden">
      <img
        src={images[index]}
        alt={`project-${index}`}
        className="w-full h-44 object-cover transition-transform duration-700"
      />
      <div className="absolute right-2 bottom-2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* --------------------- Main Page --------------------- */
export default function PageLanding({ params }: { params: { lang: Lang } }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-slate-50 text-slate-900 text-sm">
      <Nav active={active} onToggleMobile={() => setMobileOpen((s) => !s)} />
      <div className="pt-28 px-4">
        <MobileDrawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          active={active}
        />
        <main className="max-w-5xl mx-auto pb-20">
          {/* Home */}
          <section
            id="home"
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
          >
            <div className="md:col-span-2 bg-white rounded-xl p-5 shadow-sm">
              <h1 className="text-xl font-bold">{mockData.name}</h1>
              <div className="text-xs text-indigo-600 font-medium mt-1">
                {mockData.title}
              </div>
              <p className="mt-3 text-sm text-gray-700">{mockData.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={mockData.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-1 rounded-md bg-sky-100 text-sky-700"
                >
                  GitHub
                </a>
                <a
                  href={mockData.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3 py-1 rounded-md bg-rose-100 text-rose-700"
                >
                  LinkedIn
                </a>
              </div>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="text-sm font-semibold">Highlights</div>
                  <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
                    <li>
                      Designed multi-region architectures handling failover.
                    </li>
                    <li>
                      Automated infra deployments with Terraform & Ansible.
                    </li>
                    <li>Mentored teams and ran on-call rotations with SLOs.</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-3 rounded-md">
                  <div className="text-sm font-semibold">Availability</div>
                  <div className="text-sm text-gray-700 mt-2">
                    Open for Full-time & Contract work. Remote preferred.
                  </div>
                </div>
              </div>
            </div>

            <aside className="bg-white rounded-xl p-4 shadow-sm sticky top-28">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  AR
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold">{mockData.name}</div>
                  <div className="text-xs text-gray-500">{mockData.title}</div>
                </div>
                <div className="w-full mt-2">
                  {mockData.skills.slice(0, 4).map((s) => (
                    <SkillProgress key={s.name} skill={s} />
                  ))}
                </div>
                <a
                  href={`mailto:${mockData.contact.email}`}
                  className="w-full text-center px-3 py-1 rounded-md bg-indigo-600 text-white text-xs"
                >
                  Contact
                </a>
              </div>
            </aside>
          </section>

          {/* Skills & Tools */}
          <section
            id="skills"
            className="mt-8 bg-white rounded-xl p-4 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-purple-700">
              Skills & Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                {mockData.skills.map((s) => (
                  <SkillProgress key={s.name} skill={s} />
                ))}
              </div>
              <div>
                <h3 className="text-xs font-semibold">Tooling</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mockData.tools.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-slate-100 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-xs font-semibold mt-3">
                  Networking (selected)
                </h3>
                <ul className="list-disc list-inside text-gray-700 text-sm mt-2">
                  {mockData.networkingExperience.map((n) => (
                    <li key={n.id}>
                      <strong>{n.title}</strong>: {n.details}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" className="mt-8">
            <h2 className="text-sm font-semibold text-indigo-700">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {mockData.projects.map((p) => (
                <article
                  key={p.id}
                  className="bg-white rounded-xl p-3 shadow-sm"
                >
                  <ProjectGallery images={p.images} />
                  <div className="mt-2">
                    <div className="text-sm font-semibold">{p.title}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {p.description}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {p.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-slate-100 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-2 flex gap-2">
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs px-2 py-1 rounded-md bg-indigo-600 text-white"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Network */}
          <section
            id="network"
            className="mt-8 bg-white rounded-xl p-4 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-rose-700">
              Network & Infra
            </h2>
            <div className="mt-2 text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-50 p-3 rounded-md">
                <div className="font-semibold">Cisco & Routing</div>
                <p className="mt-1 text-xs text-gray-600">
                  BGP, OSPF, VLANs, Access-Lists, NAT — templating and
                  automating configs with Ansible.
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-md">
                <div className="font-semibold">Observability</div>
                <p className="mt-1 text-xs text-gray-600">
                  Prometheus + Grafana stacks, alerting, tracing basics and
                  SLO-driven incident handling.
                </p>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section
            id="certs"
            className="mt-8 bg-white rounded-xl p-4 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-indigo-700">
              Certifications
            </h2>
            <ul className="mt-2 text-sm text-gray-700 list-disc list-inside">
              {mockData.certifications.map((c) => (
                <li key={c.id}>
                  {c.title} — {c.year}
                </li>
              ))}
            </ul>
          </section>

          {/* Languages */}
          <section
            id="languages"
            className="mt-8 bg-white rounded-xl p-4 shadow-sm"
          >
            <h2 className="text-sm font-semibold text-teal-700">Languages</h2>
            <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
              {mockData.languages.map((l) => (
                <div
                  key={l.name}
                  className="p-3 bg-slate-50 rounded-md text-sm"
                >
                  <div className="font-semibold">{l.name}</div>
                  <div className="text-xs text-gray-500">{l.level}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="h-2 rounded-full bg-indigo-400"
                      style={{ width: `${l.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section
            id="contact"
            className="mt-8 bg-white rounded-xl p-4 shadow-sm text-center"
          >
            <h2 className="text-sm font-semibold text-indigo-700">Contact</h2>
            <p className="text-xs text-gray-700 mt-2">
              Open to new opportunities — hire or contract.
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <a
                href={`mailto:${mockData.contact.email}`}
                className="px-3 py-1 rounded-md bg-indigo-600 text-white text-xs"
              >
                Email
              </a>
              <a
                href={mockData.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-md bg-rose-100 text-rose-700 text-xs"
              >
                LinkedIn
              </a>
              <a
                href={mockData.contact.github}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded-md bg-sky-100 text-sky-700 text-xs"
              >
                GitHub
              </a>
            </div>
          </section>
        </main>
      </div>

      <a
        href={`mailto:${mockData.contact.email}`}
        className="fixed right-4 bottom-4 z-40 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-4 py-2 text-sm font-semibold shadow-lg"
      >
        Hire
      </a>

      <style>{`
        .skill-grad-1{background:linear-gradient(90deg,#2dd4bf,#06b6d4)}
        .skill-grad-2{background:linear-gradient(90deg,#a78bfa,#7c3aed)}
        .skill-grad-3{background:linear-gradient(90deg,#60a5fa,#0ea5e9)}
        .skill-grad-4{background:linear-gradient(90deg,#86efac,#22c55e)}
        .skill-grad-5{background:linear-gradient(90deg,#f472b6,#fb7185)}
        .skill-grad-6{background:linear-gradient(90deg,#a78bfa,#8b5cf6)}
        .skill-grad-7{background:linear-gradient(90deg,#fb923c,#f97316)}

        img{transition:transform 600ms ease, opacity 600ms ease}
        img:hover{transform:scale(1.03)}

        @keyframes pulse-small{0%{transform:scale(1)}50%{transform:scale(1.03)}100%{transform:scale(1)}}
        .scale-105{animation: pulse-small 900ms ease-in-out}

        button[aria-label^='Go to image']{border:none;outline:none}
      `}</style>
    </div>
  );
}
