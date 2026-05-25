export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  highlights: string[];
  roles?: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  stack: string[];
  bullets?: string[];
  links: ProjectLink[];
  images: string[];
  featured: boolean;
  status: string;
  type?: "website" | "ai-ml";
  awardRef?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  topic: string;
  period: string;
  link: string;
}

export interface AwardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  images: string[];
  videoId?: string;
  certLink?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}
