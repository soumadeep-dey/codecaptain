import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/hooks/useQueries";
import type { ExperienceItem } from "@/types";
gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { data } = useExperience();

  useEffect(() => {
    if (!data) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-item",
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "expo.out",
          stagger: 0.15,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [data]);

  if (!data) return null;

  return (
    <section id="experience" ref={ref} style={{ padding: "96px 0", background: "var(--dark)" }}>
      <div className="container">
        <p className="section-eyebrow">Career</p>
        <h2 className="section-title">
          Work <em>Experience</em>
        </h2>

        <div style={{ position: "relative", paddingLeft: 28 }}>
          {/* Timeline line */}
          <div className="timeline-line" />

          {data.map((item) => (
            <ExpItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpItem({ item }: { item: ExperienceItem }) {
  return (
    <div
      className="exp-item"
      style={{
        opacity: 0,
        position: "relative",
        paddingBottom: 48,
      }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: "absolute",
          left: -34,
          top: 6,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: item.current ? "var(--blue)" : "var(--dark-3)",
          border: `2px solid ${item.current ? "var(--blue)" : "rgba(79,156,249,0.4)"}`,
          boxShadow: item.current ? "0 0 12px rgba(79,156,249,0.6)" : "none",
        }}
      />

      {/* Card */}
      <div
        style={{
          background: "var(--dark-2)",
          border: "1px solid rgba(79,156,249,0.1)",
          borderRadius: "var(--radius)",
          padding: "clamp(20px, 4vw, 28px)",
          borderLeft: `2px solid ${item.current ? "var(--blue)" : "rgba(79,156,249,0.25)"}`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            marginBottom: 6,
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1.05rem",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: 4,
              }}
            >
              {item.role}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.88rem",
                fontWeight: 600,
                color: "var(--blue)",
              }}
            >
              {item.company}
            </p>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "var(--white-dim)",
                background: "var(--dark-3)",
                padding: "4px 10px",
                borderRadius: 3,
                border: "1px solid rgba(238,240,245,0.08)",
                display: "block",
                marginBottom: 6,
              }}
            >
              {item.period}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "var(--white-dim)",
              }}
            >
              {item.location}
            </span>
          </div>
        </div>

        {/* Highlights */}
        <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {item.highlights.map((h, i) => (
            <li
              key={i}
              style={{ display: "flex", gap: 10, color: "var(--white-dim)", fontSize: "0.88rem", lineHeight: 1.7 }}
            >
              <span style={{ color: "var(--blue)", flexShrink: 0, marginTop: 3, fontSize: "0.6rem" }}>▶</span>
              <span dangerouslySetInnerHTML={{ __html: h.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--white);font-weight:600">$1</strong>') }} />
            </li>
          ))}
        </ul>

        {/* Stack chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
          {item.stack.map((s) => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
