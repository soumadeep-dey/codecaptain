import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const LINKS = [
  { id: "hero",     label: "Home" },
  { id: "about",    label: "About" },
  { id: "skills",   label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "awards",   label: "Awards" },
  { id: "contact",  label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location]);

  const scrollTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
        height: "var(--nav-h)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(16px, 4vw, 40px)",
        transition: "background 0.35s, backdrop-filter 0.35s",
        ...(scrolled
          ? {
              background: "rgba(5,5,9,0.94)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(79,156,249,0.1)",
            }
          : {}),
      }}
    >
      {/* Logo */}
      <button
        onClick={() => scrollTo("hero")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-display)",
          fontSize: "1.9rem",
          color: "var(--blue)",
          letterSpacing: "0.05em",
          padding: 0,
        }}
      >
        SD
      </button>

      {/* Desktop nav */}
      <ul style={{ alignItems: "center", gap: 4 }} className="hidden lg:flex">
        {LINKS.map(({ id, label }) => (
          <li key={id}>
            {label === "Contact" ? (
              <button
                onClick={() => scrollTo(id)}
                className="btn-primary"
                style={{ padding: "8px 20px", marginLeft: 8, border: "none", cursor: "pointer" }}
              >
                Hire Me
              </button>
            ) : (
              <button
                onClick={() => scrollTo(id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: active === id ? "var(--blue)" : "var(--white-dim)",
                  padding: "8px 12px",
                  display: "inline-block",
                  transition: "color 0.3s",
                }}
              >
                {label}
              </button>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden"
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "var(--white)",
              borderRadius: 2,
              transition: "all 0.3s",
              transform: open
                ? i === 0
                  ? "translateY(7px) rotate(45deg)"
                  : i === 2
                    ? "translateY(-7px) rotate(-45deg)"
                    : "scaleX(0)"
                : "none",
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: "var(--nav-h)",
            left: 0,
            right: 0,
            background: "rgba(5,5,9,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(79,156,249,0.12)",
            padding: "24px 24px 32px",
            zIndex: 999,
          }}
        >
          <ul style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  style={{
                    background: active === id ? "rgba(79,156,249,0.08)" : "none",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    padding: "14px 16px",
                    borderRadius: "var(--radius)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: active === id ? "var(--blue)" : "var(--white-dim)",
                    transition: "all 0.3s",
                  } as React.CSSProperties}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
