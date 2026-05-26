import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSkills } from "@/hooks/useQueries";
import type { IconType } from "react-icons";
import {
  FiCode,
  FiLayout,
  FiServer,
  FiDatabase,
  FiTerminal,
} from "react-icons/fi";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiReactrouter,
  SiRedux,
  SiReactquery,
  SiZod,
  SiReacthookform,
  SiShadcnui,
  SiTailwindcss,
  SiMui,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiTypeorm,
  SiPrisma,
  SiMongoose,
  SiJsonwebtokens,
  SiPassport,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiVercel,
  SiRender,
  SiLinux,
  SiCpanel,
  SiPlesk,
  SiGithubactions,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi, TbLock, TbUpload, TbBrandOauth } from "react-icons/tb";
import { GiBearHead } from "react-icons/gi";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ICON_MAP: Record<string, IconType> = {
  code: FiCode,
  layout: FiLayout,
  server: FiServer,
  database: FiDatabase,
  terminal: FiTerminal,
};

type SkillIconEntry = { icon: IconType; color: string };

// All colors chosen to be vivid against dark backgrounds
const SKILL_ICON_MAP: Record<string, SkillIconEntry> = {
  // Languages
  TypeScript: { icon: SiTypescript, color: "#60A5FA" },
  "JavaScript (ES6+)": { icon: SiJavascript, color: "#FBBF24" },
  Python: { icon: SiPython, color: "#FFD43B" },
  Java: { icon: FaJava, color: "#F97316" },
  // Frontend
  React: { icon: SiReact, color: "#61DAFB" },
  "React Router": { icon: SiReactrouter, color: "#F87171" },
  "Redux Toolkit": { icon: SiRedux, color: "#A78BFA" },
  Zustand: { icon: GiBearHead, color: "#D97706" },
  "TanStack Query": { icon: SiReactquery, color: "#FF6B6B" },
  Zod: { icon: SiZod, color: "#818CF8" },
  "React Hook Form": { icon: SiReacthookform, color: "#F472B6" },
  "Shadcn/UI": { icon: SiShadcnui, color: "#E2E8F0" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
  MUI: { icon: SiMui, color: "#29B6F6" },
  Bootstrap: { icon: SiBootstrap, color: "#C084FC" },
  // Backend
  "Node.js": { icon: SiNodedotjs, color: "#4ADE80" },
  "Express.js": { icon: SiExpress, color: "#CBD5E1" },
  "RESTful APIs": { icon: TbApi, color: "#4f9cf9" },
  TypeORM: { icon: SiTypeorm, color: "#F87171" },
  Prisma: { icon: SiPrisma, color: "#C4B5FD" },
  Mongoose: { icon: SiMongoose, color: "#F87171" },
  JWT: { icon: SiJsonwebtokens, color: "#FCD34D" },
  Bcrypt: { icon: TbLock, color: "#34D399" },
  OAuth: { icon: TbBrandOauth, color: "#60A5FA" },
  "Passport.js": { icon: SiPassport, color: "#34E27A" },
  Multer: { icon: TbUpload, color: "#93C5FD" },
  GraphQL: { icon: SiGraphql, color: "#F472B6" },
  // Databases
  PostgreSQL: { icon: SiPostgresql, color: "#60A5FA" },
  MongoDB: { icon: SiMongodb, color: "#4ADE80" },
  MySQL: { icon: SiMysql, color: "#38BDF8" },
  // DevOps & Tools
  Git: { icon: SiGit, color: "#FB923C" },
  GitHub: { icon: SiGithub, color: "#E2E8F0" },
  Vercel: { icon: SiVercel, color: "#E2E8F0" },
  Render: { icon: SiRender, color: "#46E3B7" },
  Linux: { icon: SiLinux, color: "#FCD34D" },
  cPanel: { icon: SiCpanel, color: "#FF8C42" },
  Plesk: { icon: SiPlesk, color: "#7DD3FC" },
  "CI/CD": { icon: SiGithubactions, color: "#60A5FA" },
};

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const { data } = useSkills();

  useEffect(() => {
    if (!data) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [data]);

  if (!data) return null;

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: "96px 0", background: "var(--black)" }}
    >
      <div className="container">
        <p className="section-eyebrow" style={{ textAlign: "center" }}>
          Tech Stack
        </p>
        <h2 className="section-title" style={{ textAlign: "center" }}>
          Skills &amp; <em>Technologies</em>
        </h2>

        <div
          className="skills-grid"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {data.map((group) => {
            const CategoryIcon = CATEGORY_ICON_MAP[group.icon];
            return (
              <div
                key={group.category}
                className="skill-card"
                style={{
                  opacity: 0,
                  background: "var(--dark-2)",
                  border: "1px solid rgba(79,156,249,0.1)",
                  borderRadius: "var(--radius)",
                  padding: "24px 20px",
                  transition: "border-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(79,156,249,0.35)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(79,156,249,0.1)")
                }
              >
                {/* Category header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 16,
                  }}
                >
                  <span
                    style={{
                      fontSize: "1rem",
                      color: "var(--blue)",
                      width: 32,
                      height: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(79,156,249,0.08)",
                      borderRadius: 4,
                      flexShrink: 0,
                    }}
                  >
                    {CategoryIcon ? <CategoryIcon size={16} /> : "◆"}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--white)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {group.category}
                  </h3>
                </div>

                {/* Skills grid */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: 8,
                  }}
                >
                  {group.skills.map((skill) => {
                    const entry = SKILL_ICON_MAP[skill];
                    const SkillIcon = entry?.icon;
                    return (
                      <div
                        key={skill}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          background: "var(--dark-3)",
                          border: "1px solid rgba(238,240,245,0.07)",
                          borderRadius: 6,
                          padding: "8px 10px",
                          transition: "border-color 0.2s, background 0.2s",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = entry
                            ? `${entry.color}55`
                            : "rgba(238,240,245,0.2)";
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor =
                            "rgba(238,240,245,0.07)";
                          e.currentTarget.style.background = "var(--dark-3)";
                        }}
                      >
                        {/* Icon in a tinted pill so it always stands out */}
                        <span
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 5,
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: entry
                              ? `${entry.color}22`
                              : "rgba(255,255,255,0.07)",
                          }}
                        >
                          {SkillIcon ? (
                            <SkillIcon
                              size={15}
                              style={{ color: entry.color }}
                            />
                          ) : (
                            <span
                              style={{
                                fontSize: "0.6rem",
                                color: "var(--white-dim)",
                              }}
                            >
                              ◆
                            </span>
                          )}
                        </span>
                        <span
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.72rem",
                            fontWeight: 500,
                            color: "var(--white-dim)",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {skill}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
