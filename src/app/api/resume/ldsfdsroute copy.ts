/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 16:36:54
 * @Description:
 */

import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    name: "Mohammad Felfelani",
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
      {
        id: 1,
        title: "CCNA — Cisco Certified Network Associate",
        year: "2019",
      },
      { id: 2, title: "AWS Solutions Architect — Associate", year: "2021" },
      {
        id: 3,
        title: "CKA — Certified Kubernetes Administrator",
        year: "2022",
      },
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
          "https://www.jabord.com/images/628e3b36f652c87c4448027b_How%20to%20Create%20Work%20Samples%20That%20Enhance%20Your%20Applicationthum-thumbnail.webp",
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
          "https://www.jabord.com/images/628e3b36f652c87c4448027b_How%20to%20Create%20Work%20Samples%20That%20Enhance%20Your%20Applicationthum-thumbnail.webp",
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
          "https://www.jabord.com/images/628e3b36f652c87c4448027b_How%20to%20Create%20Work%20Samples%20That%20Enhance%20Your%20Applicationthum-thumbnail.webp",
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

  return NextResponse.json(data);
}
