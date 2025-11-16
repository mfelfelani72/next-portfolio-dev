// Components

import { SidebarContent } from "@/components/ui/admin/sidebar/sidebar-content";

// Constants

import { menuItems } from "@/configs/admin/menuItems";

// Interfaces

import { MenuItem } from "@/Interfaces/admin/menu";

interface SidebarProps {
  initialItems?: MenuItem[];
}

const initialMenuItems: MenuItem[] = menuItems;


export function Sidebar({ initialItems = initialMenuItems }: SidebarProps) {
  return <SidebarContent initialItems={initialItems} />;
}
