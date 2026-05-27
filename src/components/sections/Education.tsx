import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiExternalLink } from "react-icons/fi";
import { useEducation, useCertifications } from "@/hooks/useQueries";
import type { EducationItem, CertificationItem } from "@/types";
gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const { data: edu } = useEducation();
  const { data: certs } = useCertifications();

  useEffect(() => {
    if (!edu || !certs) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-item, .cert-card",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [edu, certs]);

  if (!edu || !certs) return null;

  return (
    <section
      id="education"
      ref={ref}
      style={{ padding: "96px 0", background: "var(--dark)" }}
    >
      <div className="container">
        <p className="section-eyebrow">Academic Background</p>
        <h2 className="section-title">
          Education &amp; <em>Certifications</em>
        </h2>

        {/* Education Timeline */}
        <div
          className="timeline-wrapper"
          style={{ position: "relative", paddingLeft: 28, marginBottom: 48 }}
        >
          {/* Timeline line */}
          <div className="timeline-line" />
          {edu.map((item) => (
            <EduItem key={item.id} item={item} />
          ))}
        </div>

        {/* Certifications */}
        <h3
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "var(--white)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(79,156,249,0.12)",
          }}
        >
          Certifications
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {certs.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EduItem({ item }: { item: EducationItem }) {
  return (
    <div
      className="edu-item"
      style={{ opacity: 0, position: "relative", paddingBottom: 36 }}
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
          background: "var(--blue)",
          border: "2px solid var(--blue)",
          boxShadow: "0 0 10px rgba(79,156,249,0.5)",
        }}
      />
      {/* Card */}
      <div
        style={{
          background: "var(--dark-2)",
          border: "1px solid rgba(79,156,249,0.1)",
          borderRadius: "var(--radius)",
          padding: "clamp(18px, 4vw, 26px)",
          borderLeft: "2px solid var(--blue)",
        }}
      >
        {/* Card header */}
        <div className="edu-card-header">
          {/* Title + Institution */}
          <div className="edu-title-wrap">
            <h3
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--white)",
                marginBottom: 4,
                lineHeight: 1.35,
              }}
            >
              {item.degree}
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--blue)",
              }}
            >
              {item.institution}
            </p>
          </div>
          {/* Date + Score */}
          <div className="edu-date-wrap">
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
                display: "inline-block",
                marginBottom: 6,
                whiteSpace: "nowrap",
              }}
            >
              {item.startDate}
              {item.endDate ? ` — ${item.endDate}` : ""}
            </span>
            <br />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.78rem",
                fontWeight: 700,
                color: "var(--blue)",
              }}
            >
              {item.score}
            </span>
          </div>
        </div>
        {/* Location */}
        <p className="edu-location">{item.location}</p>
      </div>
    </div>
  );
}

function CertCard({ cert }: { cert: CertificationItem }) {
  return (
    <div
      className="cert-card"
      style={{
        opacity: 0,
        background: "var(--dark-2)",
        border: "1px solid rgba(79,156,249,0.1)",
        borderRadius: "var(--radius)",
        padding: "18px 22px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        transition: "border-color 0.3s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(79,156,249,0.3)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(79,156,249,0.1)")
      }
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4
          style={{
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "var(--white)",
            marginBottom: 4,
            lineHeight: 1.4,
            wordBreak: "break-word",
          }}
        >
          {cert.title}
        </h4>
        <p
          style={{ fontSize: "0.78rem", color: "var(--blue)", marginBottom: 2 }}
        >
          {cert.issuer}
        </p>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--white-dim)",
          }}
        >
          {cert.startDate}
          {cert.endDate ? ` — ${cert.endDate}` : ""}
        </p>
      </div>
      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        title="View certificate"
        style={{
          flexShrink: 0,
          width: 34,
          height: 34,
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
        <FiExternalLink size={14} />
      </a>
    </div>
  );
}


