import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Restaurant Management System",
  author: "jisanmia",
  description: "Restaurant Management System",
  keywords: ["Restaurant", "order"],
  url: {
    base: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}`,
    author: "https://jisan.io",
  },
  links: {
    github: "https://github.com/",
  },
  ogImage: `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/og.jpg`,
};
