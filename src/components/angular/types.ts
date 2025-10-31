export interface NavigationPage {
  title: string;
  slug: string;
  description?: string;
  navGroup: 'docs' | 'information' | 'playground' | 'other';
}

export interface NavGroup {
  id: string;
  label: string;
  href: string;
  pages: NavigationPage[];
}

export interface SidebarItem {
  title: string;
  slug: string;
  group?: string;
}

export interface HeadingLink {
  depth: number;
  slug: string;
  text: string;
}
