// Components

import { CategoryIcon, ProfileIcon } from "forma-ui";

// Interfaces

import { MenuItem } from "@/Interfaces/admin/menu";
import { DangerSquareIcon } from "forma-ui";

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
        icon: <DangerSquareIcon />,
        description: "user_avatar",
        category: "pages",
        url: "/admin/user-avatar",
        isOpen: false,
      },
      {
        id: "2-2",
        title: "user_profile",
        icon: <DangerSquareIcon />,
        description: "user_profile",
        category: "pages",
        url: "/admin/user-profile",
        isOpen: false,
      },
      {
        id: "2-3",
        title: "user_certifications",
        icon: <DangerSquareIcon />,
        description: "user_certifications",
        category: "pages",
        url: "/admin/user-certifications",
        isOpen: false,
      },
      {
        id: "2-4",
        title: "user_skills",
        icon: <DangerSquareIcon />,
        description: "user_skills",
        category: "pages",
        url: "/admin/user-skills",
        isOpen: false,
      },
      {
        id: "2-5",
        title: "user_projects",
        icon: <DangerSquareIcon />,
        description: "user_projects",
        category: "pages",
        url: "/admin/user-projects",
        isOpen: false,
      },
      {
        id: "2-6",
        title: "user_languages",
        icon: <DangerSquareIcon />,
        description: "user_languages",
        category: "pages",
        url: "/admin/user-languages",
        isOpen: false,
      },
      {
        id: "2-7",
        title: "user_contact",
        icon: <DangerSquareIcon />,
        description: "user_contact",
        category: "pages",
        url: "/admin/user-contact",
        isOpen: false,
      },
    ],
  },
];
