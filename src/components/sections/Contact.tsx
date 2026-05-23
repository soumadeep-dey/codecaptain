import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiMapPin } from "react-icons/fi";
gsap.registerPlugin(ScrollTrigger);

const CONTACTS = [
  {
    icon: <FiMail size={20} />,
    label: "Email",
    value: "contactsoumadeepdey@gmail.com",
    href: "mailto:contactsoumadeepdey@gmail.com",
  },
  {
    icon: <FiPhone size={20} />,
    label: "Phone",
    value: "+91 6291528931",
    href: "tel:+916291528931",
  },
  {
    icon: <FiLinkedin size={20} />,
    label: "LinkedIn",
    value: "soumadeep-dey",
    href: "https://www.linkedin.com/in/soumadeep-dey",
  },
  {
    icon: <FiGithub size={20} />,
    label: "GitHub",
    value: "soumadeep-dey",
    href: "https://github.com/soumadeep-dey",
  },
  {
    icon: <FiMapPin size={20} />,
    label: "Location",
    value: "Kolkata, India",
    href: undefined,
  },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('[data-gsap="fade-up"]', {
        opacity: 1, y: 0, duration: 1, ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
      gsap.to(".contact-bg-text", {
        yPercent: 22, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={ref}
      style={{ position: "relative", padding: "120px 0", background: "var(--black)", overflow: "hidden" }}
    >
      {/* Background text */}
      <div
        className="contact-bg-text"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(5rem, 18vw, 16rem)",
          fontWeight: 900,
          letterSpacing: "0.05em",
          color: "rgba(79,156,249,0.03)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        HIRE ME
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <p className="section-eyebrow" data-gsap="fade-up">Contact</p>
        <h2 className="section-title" data-gsap="fade-up">
          Let's build
          <br /><em>something great</em>
        </h2>
        <p
          data-gsap="fade-up"
          style={{
            color: "var(--white-dim)",
            fontSize: "0.95rem",
            lineHeight: 1.8,
            maxWidth: 480,
            margin: "0 auto 56px",
          }}
        >
          Open to full-time roles, freelance projects, and exciting collaborations. Let's connect.
        </p>

        <div
          className="contact-links-grid"
          data-gsap="fade-up"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          {CONTACTS.map(({ icon, label, value, href }) => (
            <div
              key={label}
              style={{
                background: "var(--dark-2)",
                border: "1px solid rgba(79,156,249,0.12)",
                borderRadius: "var(--radius)",
                padding: "18px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
                transition: "border-color 0.3s, transform 0.3s",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(79,156,249,0.35)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(79,156,249,0.12)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={{ color: "var(--blue)", flexShrink: 0 }}>{icon}</span>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--white-dim)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("mailto") || href.startsWith("tel") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      color: "var(--white)",
                      transition: "color 0.3s",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "block",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--blue)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--white)")}
                  >
                    {value}
                  </a>
                ) : (
                  <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--white)" }}>{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA */}
        <div data-gsap="fade-up" style={{ marginTop: 48 }}>
          <a
            href="mailto:contactsoumadeepdey@gmail.com"
            className="btn-primary"
            style={{ fontSize: "0.9rem", padding: "16px 40px" }}
          >
            Send Me an Email
          </a>
        </div>
      </div>
    </section>
  );
}
