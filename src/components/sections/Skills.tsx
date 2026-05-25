import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSkills } from "@/hooks/useQueries";
gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, string> = {
  code: "{ }",
  layout: "⬜",
  server: "⚙",
  database: "🗄",
  terminal: ">_",
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
          {data.map((group) => (
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
                      fontFamily: "var(--font-mono)",
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
                    {ICON_MAP[group.icon] ?? "◆"}
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
                {/* Skills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        color: "var(--white-dim)",
                        background: "var(--dark-3)",
                        border: "1px solid rgba(238,240,245,0.07)",
                        borderRadius: 3,
                        padding: "3px 8px",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
