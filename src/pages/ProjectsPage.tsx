import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiExternalLink,
  FiGithub,
  FiArrowLeft,
  FiYoutube,
} from "react-icons/fi";
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

const TYPE_FILTERS = [
  { key: "all", label: "All" },
  { key: "website", label: "Website" },
  { key: "ai-ml", label: "AI / ML" },
];

function parseBold(text: string) {
  return text.replace(
    /\*\*(.+?)\*\*/g,
    '<strong style="color:rgba(238,240,245,0.85);font-weight:600">$1</strong>',
  );
}

export default function ProjectsPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { data } = useProjects();
  const [filter, setFilter] = useState<string>("all");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!data) return;
    const ctx = gsap.context(() => {
      gsap.from(".projects-page-header", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.fromTo(
        ".project-page-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
          stagger: 0.1,
          delay: 0.3,
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [data, filter]);

  if (!data) return null;

  const filtered =
    filter === "all" ? data : data.filter((p) => p.type === filter);

  return (
    <>
      <Helmet>
        <title>Projects — Soumadeep Dey</title>
        <meta
          name="description"
          content="Full portfolio of projects by Soumadeep Dey — enterprise web apps, AI/ML solutions, and personal projects."
        />
      </Helmet>

      <div
        ref={ref}
        style={{
          minHeight: "100svh",
          background: "var(--black)",
          paddingTop: "calc(var(--nav-h) + 60px)",
          paddingBottom: 100,
        }}
      >
        <div className="container">
          {/* Back */}
          <button
            onClick={() => navigate("/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--white-dim)",
              marginBottom: 40,
              padding: 0,
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--blue)")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--white-dim)")
            }
          >
            <FiArrowLeft size={14} /> Back to Home
          </button>

          {/* Header */}
          <div className="projects-page-header" style={{ marginBottom: 48 }}>
            <p className="section-eyebrow">All Work</p>
            <h1 className="section-title">
              All <em>Projects</em>
            </h1>
            <p
              style={{
                color: "var(--white-dim)",
                fontSize: "0.95rem",
                maxWidth: 520,
                lineHeight: 1.8,
              }}
            >
              Enterprise platforms, AI/ML solutions, and personal projects —
              everything I've shipped.
            </p>
          </div>

          {/* Filter tabs */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 18px",
                  borderRadius: 4,
                  border: `1px solid ${filter === f.key ? "var(--blue)" : "rgba(79,156,249,0.2)"}`,
                  background:
                    filter === f.key ? "rgba(79,156,249,0.12)" : "transparent",
                  color: filter === f.key ? "var(--blue)" : "var(--white-dim)",
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
              >
                {f.label}
                <span style={{ marginLeft: 6, opacity: 0.5 }}>
                  ({f.key === "all" ? data.length : data.filter((p) => p.type === f.key).length})
                </span>
              </button>
            ))}
          </div>

          {/* Project list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {filtered.map((p) => (
              <ProjectPageCard key={p.id} project={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "var(--white-dim)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.85rem",
              }}
            >
              No projects found for this filter.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function ProjectPageCard({ project: p }: { project: ProjectItem }) {
  const color = STATUS_COLOR[p.status] ?? "var(--white-dim)";
  const label = STATUS_LABEL[p.status] ?? p.status;

  const handleLinkClick = (url: string) => {
    if (url === "#awards") {
      window.location.href = "/#awards";
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="project-page-card"
      style={{
        opacity: 0,
        background: "var(--dark-2)",
        border: "1px solid rgba(79,156,249,0.1)",
        borderRadius: "var(--radius)",
        padding: "clamp(24px, 4vw, 36px)",
        transition: "border-color 0.3s, transform 0.3s",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(79,156,249,0.35)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(79,156,249,0.1)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 6px ${color}`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                fontWeight: 600,
                color,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {label}
            </span>
            {p.type && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  color: p.type === "ai-ml" ? "#a78bfa" : "var(--cyan)",
                  background:
                    p.type === "ai-ml"
                      ? "rgba(167,139,250,0.08)"
                      : "rgba(6,182,212,0.08)",
                  border: `1px solid ${p.type === "ai-ml" ? "rgba(167,139,250,0.25)" : "rgba(6,182,212,0.25)"}`,
                  borderRadius: 3,
                  padding: "2px 7px",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {p.type === "ai-ml" ? "AI / ML" : "Website"}
              </span>
            )}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.2rem",
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
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            {p.links.map((l) => {
              const isYoutube =
                l.url.includes("youtube") || l.url.includes("youtu.be");
              const isGithub = l.label.toLowerCase().includes("github");
              return (
                <button
                  key={l.label}
                  title={l.label}
                  onClick={() => handleLinkClick(l.url)}
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
                    background: "transparent",
                    cursor: "pointer",
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
                  {isYoutube ? (
                    <FiYoutube size={14} />
                  ) : isGithub ? (
                    <FiGithub size={14} />
                  ) : (
                    <FiExternalLink size={14} />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bullet points */}
      {p.bullets && p.bullets.length > 0 && (
        <ul style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {p.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 10,
                color: "var(--white-dim)",
                fontSize: "0.88rem",
                lineHeight: 1.7,
              }}
            >
              <span
                style={{
                  color: "var(--blue)",
                  flexShrink: 0,
                  marginTop: 4,
                  fontSize: "0.55rem",
                }}
              >
                ▶
              </span>
              <span dangerouslySetInnerHTML={{ __html: parseBold(b) }} />
            </li>
          ))}
        </ul>
      )}

      {/* SIH recognition */}
      {p.awardRef === "sih" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "rgba(79,156,249,0.06)",
            border: "1px solid rgba(79,156,249,0.2)",
            borderRadius: 5,
          }}
        >
          <span style={{ fontSize: "0.75rem" }}>🏆</span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "var(--blue)",
              letterSpacing: "0.05em",
            }}
          >
            Smart India Hackathon 2023 — Ranked 7th / 74 teams
          </span>
        </div>
      )}

      {/* Stack chips */}
      {p.stack.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.stack.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                fontWeight: 500,
                color: "var(--white-dim)",
                background: "var(--dark-3)",
                border: "1px solid rgba(238,240,245,0.07)",
                borderRadius: 3,
                padding: "3px 8px",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
