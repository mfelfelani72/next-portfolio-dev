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
        title: "user_profile",
        icon: <DangerSquareIcon />,
        description: "user_profile",
        category: "pages",
        url: "/admin/user/profile",
        isOpen: false,
      },
    ],
  },
];
