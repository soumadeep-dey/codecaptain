import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useProjects } from "@/hooks/useQueries";
import type { ProjectItem } from "@/types";
gsap.registerPlugin(ScrollTrigger);

const STATUS_COLOR: Record<string, string> = {
  live: "#22c55e",
  professional: "var(--blue)",
  wip: "#f59e0b",
};
const STATUS_LABEL: Record<string, string> = {
  live: "Live",
  professional: "Professional",
  wip: "In Progress",
};

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const { data } = useProjects();

  useEffect(() => {
    if (!data) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [data]);

  if (!data) return null;

  const featured = data.filter((p) => p.featured);
  const rest = data.filter((p) => !p.featured);

  return (
    <section id="projects" ref={ref} style={{ padding: "96px 0", background: "var(--black)" }}>
      <div className="container">
        <p className="section-eyebrow">Work</p>
        <h2 className="section-title">
          Featured <em>Projects</em>
        </h2>

        {/* Featured (large cards) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 24 }}>
          {featured.map((p) => (
            <ProjectCard key={p.id} project={p} large />
          ))}
        </div>

        {/* Rest */}
        {rest.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {rest.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}

        {/* Coming soon note */}
        <div
          style={{
            marginTop: 40,
            padding: "20px 24px",
            background: "var(--dark-2)",
            border: "1px dashed rgba(79,156,249,0.2)",
            borderRadius: "var(--radius)",
            textAlign: "center",
          }}
        >
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--white-dim)" }}>
            <span style={{ color: "var(--blue)" }}>// </span>More projects coming soon — open source contributions &amp; side projects in progress
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, large }: { project: ProjectItem; large?: boolean }) {
  const color = STATUS_COLOR[p.status] ?? "var(--white-dim)";
  const label = STATUS_LABEL[p.status] ?? p.status;

  return (
    <div
      className="project-card"
      style={{
        opacity: 0,
        background: "var(--dark-2)",
        border: "1px solid rgba(79,156,249,0.1)",
        borderRadius: "var(--radius)",
        padding: large ? "clamp(24px, 4vw, 36px)" : "24px",
        transition: "border-color 0.3s, transform 0.3s",
        display: "flex",
        flexDirection: large ? "column" : "column",
        gap: 16,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(79,156,249,0.35)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(79,156,249,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
        <div style={{ flex: 1 }}>
          {/* Status badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", fontWeight: 600, color, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {label}
            </span>
          </div>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: large ? "1.3rem" : "1.05rem",
              fontWeight: 700,
              color: "var(--white)",
              lineHeight: 1.3,
            }}
          >
            {p.title}
          </h3>
        </div>
        {/* Links */}
        {p.links.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            {p.links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                title={l.label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "1px solid rgba(79,156,249,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--white-dim)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--blue)";
                  e.currentTarget.style.color = "var(--blue)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(79,156,249,0.25)";
                  e.currentTarget.style.color = "var(--white-dim)";
                }}
              >
                {l.label.toLowerCase().includes("github") ? <FiGithub size={15} /> : <FiExternalLink size={15} />}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <p style={{ color: "var(--white-dim)", fontSize: "0.88rem", lineHeight: 1.75 }}>
        {p.description}
      </p>

      {/* Stack */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {p.stack.map((s) => (
          <span key={s} className="tag">{s}</span>
        ))}
      </div>
    </div>
  );
}
