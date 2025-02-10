import { LucideProps } from "lucide-react";
import { FC, ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

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

export type SidebarNavItem = {
  id: number | string;
  label: string;
  link: string;
  icon:
    | FC<SVGProps<SVGElement>>
    | ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
  pathnameMatcher: Array<string>;
};
