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
    url: "/admin/",
    isOpen: false,
  },
  {
    id: "2",
    title: "portfolio",
    icon: <ProfileIcon />,
    isOpen: false,
    children: [
      {
        id: "2-1",
        title: "user_profile",
        icon: <DangerSquareIcon />,
        url: "/admin/user/profile",
        isOpen: false,
      },
    ],
  },
];
