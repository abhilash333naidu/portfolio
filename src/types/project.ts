export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  size: "small" | "medium" | "large" | "wide" | "featured";
  accent?: boolean;
  link?: string;
  github?: string;
  highlights?: string[];
}
