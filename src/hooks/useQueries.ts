import { useQuery } from "@tanstack/react-query";
import type {
  SkillGroup,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  CertificationItem,
  AwardItem,
  SocialLink,
} from "@/types";

const fetchJson = <T>(url: string): Promise<T> =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Failed to fetch ${url}`);
    return r.json() as Promise<T>;
  });

export const useSkills = () =>
  useQuery({
    queryKey: ["skills"],
    queryFn: () => fetchJson<SkillGroup[]>("/data/skills.json"),
  });

export const useExperience = () =>
  useQuery({
    queryKey: ["experience"],
    queryFn: () => fetchJson<ExperienceItem[]>("/data/experience.json"),
  });

export const useProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchJson<ProjectItem[]>("/data/projects.json"),
  });

export const useEducation = () =>
  useQuery({
    queryKey: ["education"],
    queryFn: () => fetchJson<EducationItem[]>("/data/education.json"),
  });

export const useCertifications = () =>
  useQuery({
    queryKey: ["certifications"],
    queryFn: () => fetchJson<CertificationItem[]>("/data/certifications.json"),
  });

export const useAwards = () =>
  useQuery({
    queryKey: ["awards"],
    queryFn: () => fetchJson<AwardItem[]>("/data/awards.json"),
  });

export const useSocialLinks = () =>
  useQuery({
    queryKey: ["social-links"],
    queryFn: () => fetchJson<SocialLink[]>("/data/social-links.json"),
  });
