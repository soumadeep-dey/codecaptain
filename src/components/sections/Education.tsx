import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiExternalLink } from "react-icons/fi";
import { useEducation, useCertifications } from "@/hooks/useQueries";
gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const { data: edu } = useEducation();
  const { data: certs } = useCertifications();

  useEffect(() => {
    if (!edu || !certs) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-card, .cert-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [edu, certs]);

  if (!edu || !certs) return null;

  return (
    <section id="education" ref={ref} style={{ padding: "96px 0", background: "var(--dark)" }}>
      <div className="container">
        {/* Education */}
        <p className="section-eyebrow">Academic Background</p>
        <h2 className="section-title">Education &amp; <em>Certifications</em></h2>

        <div
          className="edu-cert-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 48 }}
        >
          {edu.map((item) => (
            <div
              key={item.id}
              className="edu-card"
              style={{
                opacity: 0,
                background: "var(--dark-2)",
                border: "1px solid rgba(79,156,249,0.12)",
                borderRadius: "var(--radius)",
                padding: "24px 22px",
                borderTop: "2px solid var(--blue)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  color: "var(--blue)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {item.period}
              </p>
              <h3 style={{ fontWeight: 700, fontSize: "0.98rem", color: "var(--white)", marginBottom: 6, lineHeight: 1.4 }}>
                {item.degree}
              </h3>
              <p style={{ fontSize: "0.83rem", color: "var(--white-dim)", marginBottom: 8 }}>
                {item.institution}
              </p>
              <p style={{ fontSize: "0.78rem", color: "var(--blue)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                {item.score}
              </p>
            </div>
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
        <div
          className="edu-cert-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
        >
          {certs.map((cert) => (
            <div
              key={cert.id}
              className="cert-card"
              style={{
                opacity: 0,
                background: "var(--dark-2)",
                border: "1px solid rgba(79,156,249,0.1)",
                borderRadius: "var(--radius)",
                padding: "20px 22px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(79,156,249,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(79,156,249,0.1)")}
            >
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--white)", marginBottom: 4, lineHeight: 1.4 }}>
                  {cert.title}
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--blue)", marginBottom: 4 }}>{cert.issuer}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--white-dim)" }}>{cert.period}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
