/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-12 08:39:25
 * @Description:
 */

export interface BaseMeta {
  title: string;
  description: string;
  keywords?: string[];
}

export interface PageMeta extends BaseMeta {
  canonicalUrl?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
  };
}

export type OpenGraphMeta = {
  title: string;
  description: string;
  url?: string;
  locale?: string;
  siteName?: string;
  type?: string;
  images?: { url: string; width: number; height: number; alt: string }[];
};

export type TwitterMeta = {
  card?: string;
  title?: string;
  description?: string;
  images?: string[];
};
