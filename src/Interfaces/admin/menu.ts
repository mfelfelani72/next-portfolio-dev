export interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode | string;
  url?: string;
  children?: MenuItem[];
  badge?: number;
  isOpen?: boolean;
}

export interface SidebarProps {
  menuItems: MenuItem[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}
