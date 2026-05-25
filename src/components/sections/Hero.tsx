import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";

const ROLES = ["Full Stack Developer", "MERN Stack Engineer", "React Specialist", "Node.js Developer", "UI Architect"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Role cycling animation
    let idx = 0;
    let tl: gsap.core.Timeline | null = null;

    const cycleRole = () => {
      if (!roleRef.current) return;
      idx = (idx + 1) % ROLES.length;
      tl = gsap.timeline();
      tl.to(roleRef.current, { opacity: 0, y: -12, duration: 0.3, ease: "power2.in" })
        .call(() => { if (roleRef.current) roleRef.current.textContent = ROLES[idx]; })
        .to(roleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    };

    const interval = setInterval(cycleRole, 2800);

    // Entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 });
      tl.to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .to(".hero-name", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4")
        .to(".hero-role-line", { opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.5")
        .to(".hero-bio", { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
        .to(".hero-cta-group", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2")
        .to(".hero-social", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.2")
        .from(".hero-scroll-hint", { opacity: 0, y: 16, duration: 0.5, ease: "power2.out" }, "-=0.1");
    }, ref);

    return () => {
      clearInterval(interval);
      tl?.kill();
      ctx.revert();
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "var(--nav-h) 24px 100px",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(79,156,249,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 60% 80% at 85% 30%, rgba(6,182,212,0.05) 0%, transparent 60%),
            linear-gradient(160deg, #050509 0%, #0d0d14 60%, #050509 100%)
          `,
        }}
      />
      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(79,156,249,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,156,249,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {/* Noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 760,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <p
          className="hero-eyebrow"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            fontWeight: 500,
            letterSpacing: "0.2em",
            color: "var(--blue)",
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "var(--cyan)" }}>~/</span> soumadeep-dey
        </p>

        {/* Name */}
        <h1
          className="hero-name"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 12vw, 8rem)",
            lineHeight: 0.95,
            letterSpacing: "0.02em",
            color: "var(--white)",
            marginBottom: 20,
          }}
        >
          Soumadeep
          <br />
          <span style={{ color: "var(--blue)" }}>Dey</span>
        </h1>

        {/* Role cycling */}
        <div
          className="hero-role-line"
          style={{
            opacity: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: 28,
            minHeight: 32,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.85rem, 2vw, 1rem)",
              color: "var(--cyan)",
            }}
          >
            &gt;
          </span>
          <span
            ref={roleRef}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
              fontWeight: 500,
              color: "var(--white-dim)",
              letterSpacing: "0.05em",
            }}
          >
            {ROLES[0]}
          </span>
          <span
            style={{
              width: 2,
              height: 20,
              background: "var(--blue)",
              borderRadius: 1,
              animation: "blink 1s step-end infinite",
            }}
          />
          <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
        </div>

        {/* Bio */}
        <p
          className="hero-bio"
          style={{
            opacity: 0,
            transform: "translateY(16px)",
            color: "var(--white-dim)",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 auto 36px",
          }}
        >
          2+ years crafting high-performance, scalable web applications.
          Specialist in React ecosystems, Node.js backends &amp;
          enterprise-grade UI architectures.
        </p>

        {/* CTA */}
        <div
          className="hero-cta-group"
          style={{
            opacity: 0,
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          <button
            className="btn-primary"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Projects
          </button>
          <button
            className="btn-ghost"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Hire Me
          </button>
        </div>

        {/* Social links */}
        <div
          className="hero-social"
          style={{
            opacity: 0,
            display: "flex",
            gap: 20,
            justifyContent: "center",
            marginBottom: 60,
          }}
        >
          {[
            {
              href: "https://github.com/soumadeep-dey",
              icon: <FiGithub size={20} />,
              label: "GitHub",
            },
            {
              href: "https://linkedin.com/in/soumadeep-dey",
              icon: <FiLinkedin size={20} />,
              label: "LinkedIn",
            },
            {
              href: "mailto:contactsoumadeepdey@gmail.com",
              icon: <FiMail size={20} />,
              label: "Email",
            },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: 44,
                height: 44,
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
                e.currentTarget.style.background = "rgba(79,156,249,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(79,156,249,0.25)";
                e.currentTarget.style.color = "var(--white-dim)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Scroll hint */}
        <button
          className="hero-scroll-hint"
          onClick={scrollToAbout}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            color: "var(--white-dim)",
            margin: "0 auto",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
          <FiArrowDown
            size={16}
            style={{ animation: "bounce 2s ease-in-out infinite" }}
          />
          <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}`}</style>
        </button>
      </div>
    </section>
  );
}
