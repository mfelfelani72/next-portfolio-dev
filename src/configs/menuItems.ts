interface Item {
  id: string;
  label: string;
}

export interface LinksClientProps {
  items: Item[];
  initialActivePage: string;
}


export const menuItems = [
  { id: "home", path: "/", labelKey: "home" },
  { id: "projects", path: "/projects", labelKey: "projects" },
  { id: "blogs", path: "/blogs", labelKey: "blogs" },
];