export interface MenuItem {
  id: string
  title: string
  icon: string // SVG as string
  url?: string
  children?: MenuItem[]
  badge?: number
  isOpen?: boolean
}

export interface SidebarProps {
  menuItems: MenuItem[]
  isCollapsed: boolean
  onToggleCollapse: () => void
}