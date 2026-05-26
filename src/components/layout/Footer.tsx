export default function Footer() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "var(--dark)",
        borderTop: "1px solid rgba(79,156,249,0.1)",
        padding: "48px 24px 32px",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          textAlign: "center",
        }}
      >
        <button
          onClick={() => scrollTo("hero")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-display)",
            fontSize: "2.2rem",
            color: "var(--blue)",
            letterSpacing: "0.05em",
          }}
        >
          SD
        </button>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            color: "var(--white-dim)",
            letterSpacing: "0.05em",
          }}
        >
          Crafted with storytelling, motion &amp; code.
        </p>
        <div
          style={{
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { href: "https://github.com/soumadeep-dey", label: "GitHub" },
            { href: "https://www.linkedin.com/in/soumadeep-dey", label: "LinkedIn" },
            { href: "mailto:contactsoumadeepdey@gmail.com", label: "Email" },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              style={{
                fontSize: "0.72rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--white-dim)",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--blue)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--white-dim)")
              }
            >
              {label}
            </a>
          ))}
        </div>
        <p
          style={{
            fontSize: "0.7rem",
            color: "var(--white-faint)",
            letterSpacing: "0.1em",
          }}
        >
          © {new Date().getFullYear()} Soumadeep Dey
        </p>
      </div>
    </footer>
  );
}
