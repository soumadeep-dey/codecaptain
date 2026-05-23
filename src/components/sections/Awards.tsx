import { useEffect, useRef } from "react";
import type { SwiperRef } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiExternalLink } from "react-icons/fi";
import useFancybox from "@/hooks/useFancybox";
import { ytThumb } from "@/lib/utils";
import { useAwards } from "@/hooks/useQueries";
import type { AwardItem } from "@/types";
gsap.registerPlugin(ScrollTrigger);

export default function Awards() {
  const ref = useRef<HTMLElement>(null);
  const { data } = useAwards();
  useFancybox();

  useEffect(() => {
    if (!data) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".award-row-grid",
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "expo.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [data]);

  if (!data) return null;

  return (
    <section id="awards" ref={ref} style={{ padding: "96px 0", background: "var(--dark)" }}>
      <div className="container">
        <p className="section-eyebrow" style={{ textAlign: "center" }}>Recognition</p>
        <h2 className="section-title" style={{ textAlign: "center" }}>
          Awards &amp; <em>Achievements</em>
        </h2>

        {data.map((award, i) => (
          <AwardRow key={award.id} award={award} reverse={i % 2 !== 0} />
        ))}
      </div>

      <style>{`
        .award-row-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; margin-bottom: 72px; opacity: 0; }
        .award-nav-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; background: rgba(5,5,9,0.85); border: 1px solid rgba(79,156,249,0.3); color: var(--blue); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; cursor: pointer; transition: background 0.3s; }
        .award-nav-btn:hover { background: rgba(79,156,249,0.1); }
        .award-nav-btn.prev { left: 0; }
        .award-nav-btn.next { right: 0; }
        @media(max-width: 768px) { .award-row-grid { grid-template-columns: 1fr !important; gap: 28px !important; } .award-nav-btn { display: none !important; } .award-img-pagination { display: flex !important; } }
      `}</style>
    </section>
  );
}

function AwardRow({ award, reverse }: { award: AwardItem; reverse: boolean }) {
  const swiperRef = useRef<SwiperRef>(null);
  const paginationId = `award-pag-${award.id}`;
  const fancyboxGroup = `award-fb-${award.id}`;
  const hasMultiple = (award.images || []).length > 1;

  return (
    <div className={`award-row-grid${reverse ? " reverse" : ""}`}>
      {/* Text */}
      <div className={`award-text${reverse ? " order-2-on-lg" : ""}`}>
        <h3
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: 8,
            lineHeight: 1.35,
          }}
        >
          {award.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--blue)",
            marginBottom: 14,
          }}
        >
          {award.subtitle}
        </p>
        <p style={{ color: "var(--white-dim)", lineHeight: 1.8, fontSize: "0.88rem", marginBottom: 20 }}>
          {award.description}
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {award.certLink && (
            <a
              href={award.certLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ padding: "8px 18px", fontSize: "0.78rem", gap: 6 }}
            >
              <FiExternalLink size={13} /> View Certificate
            </a>
          )}
        </div>

        {/* YouTube video embed via Fancybox */}
        {award.videoId && (
          <a
            href={`https://www.youtube.com/watch?v=${award.videoId}`}
            data-fancybox={`${fancyboxGroup}-vid`}
            data-type="iframe"
            data-src={`https://www.youtube.com/embed/${award.videoId}?autoplay=1`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 16,
              background: "var(--dark-3)",
              border: "1px solid rgba(79,156,249,0.12)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(79,156,249,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(79,156,249,0.12)")}
          >
            <div style={{ position: "relative", width: 130, flexShrink: 0 }}>
              <img
                src={ytThumb(award.videoId, "mqdefault")}
                alt="Watch video"
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }}
              />
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "rgba(0,0,0,0.4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "1.4rem", color: "var(--blue)" }}>▶</span>
              </div>
            </div>
            <div style={{ padding: "8px 12px 8px 0", flex: 1 }}>
              <p style={{ fontWeight: 700, color: "var(--white)", marginBottom: 3, fontSize: "0.84rem" }}>Watch Video</p>
              <p style={{ fontSize: "0.7rem", color: "var(--white-dim)" }}>Official highlight reel</p>
            </div>
          </a>
        )}
      </div>

      {/* Media / Image carousel */}
      <div style={{ position: "relative", minWidth: 0 }}>
        {award.images && award.images.length > 0 ? (
          <>
            <div style={{ position: "relative" }}>
              {/* Custom nav buttons (desktop only) */}
              {hasMultiple && (
                <>
                  <button
                    className="award-nav-btn prev"
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                    aria-label="Previous image"
                  >‹</button>
                  <button
                    className="award-nav-btn next"
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    aria-label="Next image"
                  >›</button>
                </>
              )}
              <div style={{ padding: hasMultiple ? "0 44px" : "0" }}>
                <Swiper
                  ref={swiperRef}
                  modules={[Navigation, Autoplay, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={hasMultiple}
                  autoplay={hasMultiple ? { delay: 3500, disableOnInteraction: false } : false}
                  style={{ borderRadius: "var(--radius)", overflow: "hidden" }}
                  onSwiper={(swiper) => {
                    // Update pagination on slide change
                    swiper.on("slideChange", () => {
                      const bullets = document.querySelectorAll(`#${paginationId} .award-img-bullet`);
                      bullets.forEach((b, i) => {
                        b.classList.toggle("award-img-bullet-active", i === swiper.realIndex);
                      });
                    });
                  }}
                >
                  {award.images.map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <a
                        href={src}
                        data-fancybox={fancyboxGroup}
                        data-caption={award.title}
                        style={{ display: "block", cursor: "zoom-in" }}
                      >
                        <img
                          src={src}
                          alt={`${award.title} ${idx + 1}`}
                          style={{
                            width: "100%",
                            aspectRatio: "4/3",
                            objectFit: "cover",
                            display: "block",
                            borderRadius: "var(--radius)",
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Mobile pagination dots */}
            {hasMultiple && (
              <div id={paginationId} className="award-img-pagination">
                {award.images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`award-img-bullet${idx === 0 ? " award-img-bullet-active" : ""}`}
                    onClick={() => swiperRef.current?.swiper.slideTo(idx)}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              aspectRatio: "4/3",
              background: "var(--dark-3)",
              borderRadius: "var(--radius)",
              border: "1px solid rgba(79,156,249,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "var(--white-faint)", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>No image</span>
          </div>
        )}
      </div>
    </div>
  );
}
