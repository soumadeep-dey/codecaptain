const ITEMS = [
  "TypeScript", "React", "Node.js", "Express.js", "PostgreSQL", "MongoDB",
  "TanStack Query", "Zustand", "Tailwind CSS", "Shadcn/UI", "JWT", "REST APIs",
  "Git", "Vercel", "CI/CD", "Prisma", "Redux Toolkit", "Zod",
];

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-strip">
      <div className="marquee-inner">
        {doubled.map((item, i) => (
          <span key={i}>
            {item}
            <span style={{ marginLeft: 20, marginRight: 0, opacity: 0.5 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
