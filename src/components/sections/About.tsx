import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: "2+", label: "Years Experience", count: 2, suffix: "+" },
  { num: "3+", label: "Products Shipped", count: 3, suffix: "+" },
  { num: "90%", label: "Performance Gains", count: 90, suffix: "%" },
];

const STACK_ROLES = [
  "Full Stack Developer",
  "React Specialist",
  "Node.js Engineer",
  "UI Architect",
  "API Designer",
  "Performance Engineer",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const [visibleRoles, setVisibleRoles] = useState<string[]>([]);
  const countersRef = useRef<Map<string, HTMLSpanElement>>(new Map());
  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timeoutIdsRef.current.forEach(clearTimeout);
    timeoutIdsRef.current = [];
    setVisibleRoles([]);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-gsap="slide-left"]',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        '[data-gsap="slide-right"]',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
      gsap.fromTo(
        ".about-stat-card",
        { opacity: 0, y: 24, scale: 0.93 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".about-stats-row",
            start: "top 90%",
            once: true,
            onEnter: () => {
              countersRef.current.forEach((el) => {
                const target = parseInt(el.dataset.count || "0", 10);
                const suffix = el.dataset.suffix || "";
                const start = { val: 0 };
                gsap.to(start, {
                  val: target, duration: 1.5, ease: "power2.out",
                  onUpdate: () => { el.textContent = Math.round(start.val) + suffix; },
                });
              });
            },
          },
        },
      );
    }, ref);

    let triggered = false;
    const trigger = ScrollTrigger.create({
      trigger: ref.current, start: "top 80%", once: true,
      onEnter: () => {
        if (triggered) return;
        triggered = true;
        STACK_ROLES.forEach((role, i) => {
          const id = setTimeout(() => {
            setVisibleRoles((prev) => prev.includes(role) ? prev : [...prev, role]);
          }, i * 130);
          timeoutIdsRef.current.push(id);
        });
      },
    });

    return () => {
      ctx.revert();
      trigger.kill();
      timeoutIdsRef.current.forEach(clearTimeout);
      timeoutIdsRef.current = [];
    };
  }, []);

  return (
    <section id="about" ref={ref} style={{ padding: "100px 0", background: "var(--dark)" }}>
      <div
        className="container about-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}
      >
        {/* Left — photo + stats */}
        <div data-gsap="slide-left" style={{ opacity: 0 }}>
          {/* Profile image */}
          <div style={{ position: "relative", width: "fit-content", isolation: "isolate", marginBottom: 32 }}>
            <div
              style={{
                aspectRatio: "4/5",
                width: "100%",
                maxWidth: 320,
                background: "var(--dark-3)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                border: "1px solid rgba(79,156,249,0.15)",
                position: "relative",
              }}
            >
              <img
                src="/assets/dp.jpg"
                alt="Soumadeep Dey"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg, transparent 60%, rgba(79,156,249,0.06) 100%)",
                  pointerEvents: "none",
                }}
              />
            </div>
            {/* Blue offset frame */}
            <div
              style={{
                position: "absolute",
                top: 12, left: 12,
                width: "100%", maxWidth: 320,
                aspectRatio: "4/5",
                border: "1px solid rgba(79,156,249,0.3)",
                borderRadius: "var(--radius)",
                zIndex: -1,
              }}
            />
            {/* Status badge */}
            <div
              style={{
                position: "absolute",
                bottom: -14, right: -14,
                background: "var(--dark-3)",
                border: "1px solid rgba(79,156,249,0.25)",
                borderRadius: "var(--radius)",
                padding: "8px 14px",
                backdropFilter: "blur(8px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 600, color: "var(--white)", letterSpacing: "0.05em" }}>
                  Open to Work
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="about-stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {STATS.map((s) => (
              <div
                key={s.label}
                className="about-stat-card"
                style={{
                  opacity: 0,
                  background: "var(--dark-2)",
                  border: "1px solid rgba(79,156,249,0.12)",
                  borderRadius: "var(--radius)",
                  padding: "16px 12px",
                  textAlign: "center",
                }}
              >
                <span
                  ref={(el) => {
                    if (el) countersRef.current.set(s.label, el);
                  }}
                  data-count={s.count}
                  data-suffix={s.suffix}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    letterSpacing: "0.03em",
                    color: "var(--blue)",
                    display: "block",
                  }}
                >
                  0{s.suffix}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", fontWeight: 600, color: "var(--white-dim)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — text */}
        <div data-gsap="slide-right" style={{ opacity: 0 }}>
          <p className="section-eyebrow">About Me</p>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            Turning ideas into<br /><em>scalable products</em>
          </h2>
          <p style={{ color: "var(--white-dim)", lineHeight: 1.8, fontSize: "0.92rem", marginBottom: 20 }}>
            I'm a Full Stack Developer with 2+ years of professional experience building high-performance, 
            production-grade web applications. I specialize in React ecosystems and Node.js backends, 
            with a strong focus on clean architecture, UI performance, and developer experience.
          </p>
          <p style={{ color: "var(--white-dim)", lineHeight: 1.8, fontSize: "0.92rem", marginBottom: 32 }}>
            Currently at <strong style={{ color: "var(--white)" }}>Durbin Technologies</strong>, building enterprise ERP 
            solutions for Fleet Telematics and Mining IoT. I've shipped production systems that reduced 
            npm dependency sizes by 90% and improved page load times by over 97%.
          </p>

          {/* Role tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {STACK_ROLES.map((role) => (
              <span
                key={role}
                className="tag"
                style={{
                  opacity: visibleRoles.includes(role) ? 1 : 0,
                  transform: visibleRoles.includes(role) ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.35s, transform 0.35s",
                }}
              >
                {role}
              </span>
            ))}
          </div>

          {/* Contact links */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="mailto:contactsoumadeepdey@gmail.com" className="btn-primary" style={{ gap: 8 }}>
              <FiMail size={16} /> Email Me
            </a>
            <a href="https://linkedin.com/in/soumadeep-dey" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ gap: 8 }}>
              <FiLinkedin size={16} /> LinkedIn
            </a>
            <a href="https://github.com/soumadeep-dey" target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ gap: 8 }}>
              <FiGithub size={16} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
