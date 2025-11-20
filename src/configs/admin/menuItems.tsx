// Components

import { CategoryIcon, ProfileIcon } from "forma-ui";

const AvatarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20v-1a7 7 0 0 1 14 0v1" strokeLinecap="round"/>
  </svg>
);

const CertificateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 7h6M9 11h6M9 15h4" strokeLinecap="round"/>
  </svg>
);

const SkillIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="m9 12 2 2 4-4" />
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
  </svg>
);

const ProjectIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="m13 7-6 6 6 6" strokeLinecap="round"/>
    <path d="m11 19 6-6-6-6" strokeLinecap="round"/>
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);

const LanguageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="m5 8 6 6" strokeLinecap="round"/>
    <path d="m4 14 6-6 2-3" strokeLinecap="round"/>
    <path d="M2 5h12" strokeLinecap="round"/>
    <path d="M7 2h1" strokeLinecap="round"/>
    <path d="M14 18h6l-3-4-3 4z" strokeLinecap="round"/>
    <path d="M18 14v8" strokeLinecap="round"/>
  </svg>
);

const ContactIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" strokeLinecap="round"/>
  </svg>
);

// Interfaces

import { MenuItem } from "@/Interfaces/admin/menu";

export const menuItems: MenuItem[] = [
  {
    id: "1",
    title: "home_page",
    icon: <CategoryIcon />,
    description: "home_page",
    category: "pages",
    url: "/admin/",
    isOpen: false,
  },
  {
    id: "2",
    title: "portfolio",
    icon: <ProfileIcon />,
    description: "portfolio",
    category: "pages",
    isOpen: false,
    children: [
      {
        id: "2-1",
        title: "user_avatar",
        icon: <AvatarIcon />,
        description: "user_avatar",
        category: "pages",
        url: "/admin/user-avatar",
        isOpen: false,
      },
      {
        id: "2-2",
        title: "user_profile",
        icon: <ProfileIcon />,
        description: "user_profile",
        category: "pages",
        url: "/admin/user-profile",
        isOpen: false,
      },
      {
        id: "2-3",
        title: "user_certifications",
        icon: <CertificateIcon />,
        description: "user_certifications",
        category: "pages",
        url: "/admin/user-certifications",
        isOpen: false,
      },
      {
        id: "2-4",
        title: "user_skills",
        icon: <SkillIcon />,
        description: "user_skills",
        category: "pages",
        url: "/admin/user-skills",
        isOpen: false,
      },
      {
        id: "2-5",
        title: "user_projects",
        icon: <ProjectIcon />,
        description: "user_projects",
        category: "pages",
        url: "/admin/user-projects",
        isOpen: false,
      },
      {
        id: "2-6",
        title: "user_languages",
        icon: <LanguageIcon />,
        description: "user_languages",
        category: "pages",
        url: "/admin/user-languages",
        isOpen: false,
      },
      {
        id: "2-7",
        title: "user_contact",
        icon: <ContactIcon />,
        description: "user_contact",
        category: "pages",
        url: "/admin/user-contact",
        isOpen: false,
      },
    ],
  },
];
