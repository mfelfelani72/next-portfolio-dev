import Redis from 'ioredis';
import { MultiLanguageResume, ResumeData } from '@/Interfaces/portfolio';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function getResumeData(): Promise<MultiLanguageResume | null> {
  try {
    const data = await redis.get('resume');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting resume data:', error);
    return null;
  }
}

export async function getResumeByLanguage(lang: string): Promise<ResumeData | null> {
  const data = await getResumeData();
  return data?.[lang] || data?.en || null;
}

export async function setResumeData(data: MultiLanguageResume): Promise<boolean> {
  try {
    await redis.set('resume', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error setting resume data:', error);
    return false;
  }
}

export async function initializeDefaultData(): Promise<void> {
  const exists = await redis.exists('resume');
  
  if (!exists) {
    const defaultData: MultiLanguageResume = {
      en: {
        name: "Mohammad Felfelani",
        title: "Senior Full Stack Developer",
        summary: "Full-stack engineer focused on resilient architectures, automation, and operational excellence. Experienced in building high-traffic services, automating network infra (Cisco), and shaping monitoring & SRE practices.",
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
            details: "Design and template Cisco IOS configs (BGP, OSPF, VLAN, ACLs). Automated deployments using Ansible and Jinja2 templates.",
          },
          {
            id: 2,
            title: "Network Troubleshooting",
            details: "Packet troubleshooting, Netflow analysis, and performance tuning for WAN/VCPE appliances.",
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
            description: "Serverless storefront with realtime inventory syncing and resilient checkout flow.",
            technologies: ["Next.js", "GraphQL", "Lambda", "Docker"],
            link: "https://github.com/alireza/nextgen-ecommerce",
            images: ["/images/project1.jpg"],
          },
          {
            id: 2,
            title: "Enterprise Analytics Dashboard",
            description: "Streaming analytics dashboard with custom visualizations and role-based access.",
            technologies: ["React", "D3", "Postgres", "Node"],
            link: "https://github.com/alireza/analytics-dashboard",
            images: ["/images/project2.jpg"],
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
        }
      },
      fa: {
        name: "محمد فلفلانی",
        title: "توسعه دهنده فول استک ارشد",
        summary: "مهندس فول استک متمرکز بر معماری‌های مقاوم، اتوماسیون و تعالی عملیاتی. دارای تجربه در ساخت سرویس‌های پرترافیک، اتوماسیون زیرساخت شبکه (سیسکو) و شکل‌دهی روش‌های مانیتورینگ و SRE.",
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
            title: "سیسکو IOS و اتوماسیون",
            details: "طراحی و قالب‌بندی پیکربندی سیسکو IOS (BGP, OSPF, VLAN, ACLs). استقرار خودکار با استفاده از Ansible و قالب‌های Jinja2.",
          },
          {
            id: 2,
            title: "عیب‌یابی شبکه",
            details: "عیب‌یابی بسته‌ها، تحلیل Netflow و تنظیم عملکرد برای دستگاه‌های WAN/VCPE.",
          },
        ],
        certifications: [
          {
            id: 1,
            title: "CCNA — مدرک متخصص شبکه سیسکو",
            year: "2019",
          },
          { id: 2, title: "AWS Solutions Architect — Associate", year: "2021" },
          {
            id: 3,
            title: "CKA — مدیر تایید شده کوبرنتیز",
            year: "2022",
          },
        ],
        projects: [
          {
            id: 1,
            title: "فروشگاه اینترنتی نسل بعدی",
            description: "فروشگاه بدون سرور با همگام‌سازی موجودی بلادرنگ و فرآیند پرداخت مقاوم.",
            technologies: ["Next.js", "GraphQL", "Lambda", "Docker"],
            link: "https://github.com/alireza/nextgen-ecommerce",
            images: ["/images/project1.jpg"],
          },
          {
            id: 2,
            title: "داشبورد تحلیل سازمانی",
            description: "داشبورد تحلیل جریانی با ویژوال‌سازی‌های سفارشی و دسترسی مبتنی بر نقش.",
            technologies: ["React", "D3", "Postgres", "Node"],
            link: "https://github.com/alireza/analytics-dashboard",
            images: ["/images/project2.jpg"],
          },
        ],
        languages: [
          { name: "فارسی", level: "بومی", percent: 100 },
          { name: "انگلیسی", level: "مسلط", percent: 90 },
          { name: "فرانسوی", level: "متوسط", percent: 60 },
        ],
        contact: {
          email: "ali.reza@example.com",
          linkedin: "https://linkedin.com/in/alireza",
          github: "https://github.com/alireza",
        }
      }
    };

    await setResumeData(defaultData);
  }
}
