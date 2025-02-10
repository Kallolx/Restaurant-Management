import { LucideProps, LucideIcon } from "lucide-react";
import { FC, ForwardRefExoticComponent, RefAttributes, SVGProps, FunctionComponent } from "react";

export type SiteConfig = {
  name: string;
  author: string;
  description: string;
  keywords: Array<string>;
  url: {
    base: string;
    author: string;
  };
  links: {
    github: string;
  };
  ogImage: string;
};

export interface SidebarNavItem {
  id: number;
  icon: FC<SVGProps<SVGElement>> | LucideIcon;
  label: string;
  link: string;
  pathnameMatcher: string[];
}
