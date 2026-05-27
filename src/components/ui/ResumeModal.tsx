import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { FiX, FiCheck, FiSend } from "react-icons/fi";

interface ResumeForm {
  name: string;
  email: string;
  company?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ResumeModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResumeForm>();

  // Mount / unmount animation
  useEffect(() => {
    if (!overlayRef.current || !cardRef.current) return;
    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "expo.out" },
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
          document.body.style.overflow = "";
          setStatus("idle");
          setErrorMsg("");
          reset();
        },
      });
    }
  }, [open, reset]);

  const onSubmit = async (data: ResumeForm) => {
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/send-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(
          (err as { message?: string }).message ?? "Failed to send",
        );
      }
      setStatus("success");
    } catch (e) {
      setStatus("error");
      setErrorMsg(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  const handleClose = () => {
    if (status === "sending") return;
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      style={{
        display: "none",
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(5,5,9,0.85)",
        backdropFilter: "blur(12px)",
      }}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={cardRef}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 480,
          background: "var(--dark-2)",
          border: "1px solid rgba(79,156,249,0.18)",
          borderRadius: "var(--radius)",
          padding: "clamp(28px, 5vw, 40px)",
          boxShadow:
            "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(79,156,249,0.06)",
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--white-dim)",
            padding: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--white-dim)")
          }
        >
          <FiX size={18} />
        </button>

        {status === "success" ? (
          <SuccessView onClose={onClose} />
        ) : (
          <>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  color: "var(--blue)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Quick Request
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.6rem",
                  color: "var(--white)",
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}
              >
                Send My Resume
              </h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--white-dim)",
                  lineHeight: 1.7,
                }}
              >
                Drop your details below and I'll send my resume directly to your
                inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              {/* Name */}
              <FormField label="Name *" error={errors.name?.message}>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="John Smith"
                  autoComplete="name"
                  style={inputStyle(!!errors.name)}
                />
              </FormField>

              {/* Email */}
              <FormField label="Work Email *" error={errors.email?.message}>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  placeholder="john@company.com"
                  autoComplete="email"
                  inputMode="email"
                  style={inputStyle(!!errors.email)}
                />
              </FormField>

              {/* Company */}
              <FormField label="Company (optional)">
                <input
                  {...register("company")}
                  placeholder="Acme Inc."
                  autoComplete="organization"
                  style={inputStyle(false)}
                />
              </FormField>

              {/* Error */}
              {status === "error" && (
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.72rem",
                    color: "#f87171",
                    padding: "10px 14px",
                    background: "rgba(248,113,113,0.06)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    borderRadius: 4,
                  }}
                >
                  {errorMsg}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  marginTop: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  opacity: status === "sending" ? 0.7 : 1,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  border: "none",
                }}
              >
                {status === "sending" ? (
                  <>
                    <span className="modal-spinner" />
                    Sending…
                  </>
                ) : (
                  <>
                    <FiSend size={15} /> Send Resume to My Inbox
                  </>
                )}
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--white-dim)",
                  lineHeight: 1.6,
                }}
              >
                I'll send your resume directly to the email above. No spam, just
                the resume.
              </p>
            </form>
          </>
        )}

        {/* Spinner keyframes */}
        <style>{`
          .modal-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: modal-spin 0.7s linear infinite;
            flex-shrink: 0;
          }
          @keyframes modal-spin { to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  const checkRef = useRef<SVGCircleElement>(null);
  const tickRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    if (!checkRef.current || !tickRef.current) return;
    const circumference = 2 * Math.PI * 38;

    gsap.set(checkRef.current, {
      strokeDasharray: circumference,
      strokeDashoffset: circumference,
    });
    gsap.set(tickRef.current, { strokeDasharray: 60, strokeDashoffset: 60 });

    gsap.to(checkRef.current, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
    gsap.to(tickRef.current, {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      {/* Animated checkmark */}
      <svg
        width={88}
        height={88}
        viewBox="0 0 88 88"
        style={{ margin: "0 auto 24px", display: "block" }}
      >
        <circle
          cx={44}
          cy={44}
          r={38}
          fill="none"
          stroke="rgba(79,156,249,0.15)"
          strokeWidth={3}
        />
        <circle
          ref={checkRef}
          cx={44}
          cy={44}
          r={38}
          fill="none"
          stroke="var(--blue)"
          strokeWidth={3}
          strokeLinecap="round"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
        <polyline
          ref={tickRef}
          points="26,44 38,56 62,32"
          fill="none"
          stroke="#22c55e"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          color: "var(--white)",
          marginBottom: 12,
        }}
      >
        Done! Check Your Inbox
      </h3>
      <p
        style={{
          fontSize: "0.88rem",
          color: "var(--white-dim)",
          lineHeight: 1.75,
          maxWidth: 340,
          margin: "0 auto 28px",
        }}
      >
        My resume is on its way. If you don't see it in a moment, check your
        spam folder. Looking forward to connecting!
      </p>
      <button
        onClick={onClose}
        className="btn-ghost"
        style={{
          padding: "12px 32px",
          border: "1px solid rgba(79,156,249,0.3)",
        }}
      >
        <FiCheck size={14} style={{ marginRight: 6 }} />
        Done
      </button>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.68rem",
          fontWeight: 600,
          color: "var(--white-dim)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "#f87171",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

function inputStyle(hasError: boolean): React.CSSProperties {
  return {
    background: "var(--dark-3)",
    border: `1px solid ${hasError ? "rgba(248,113,113,0.5)" : "rgba(79,156,249,0.15)"}`,
    borderRadius: 4,
    padding: "12px 16px",
    fontFamily: "var(--font-sans)",
    fontSize: "0.9rem",
    color: "var(--white)",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };
}
