export interface Skill {
  name: string;
  level: number;
  colorClass: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  images: string[];
}

export interface Certification {
  id: number;
  title: string;
  year: string;
}

export interface NetworkingExperience {
  id: number;
  title: string;
  details: string;
}

export interface Language {
  name: string;
  level: string;
  percent: number;
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  skills: Skill[];
  tools: string[];
  networkingExperience: NetworkingExperience[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  contact: Contact;
}
