import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const OWNER_EMAIL = "contactsoumadeepdey@gmail.com";
const PORTFOLIO_URL = process.env.PORTFOLIO_URL ?? "https://soumadeep-dey.com";
const LINKEDIN_URL = "https://linkedin.com/in/soumadeep-dey";
const GITHUB_URL = "https://github.com/soumadeep-dey";
const RESUME_URL = process.env.RESUME_URL ?? "";

function buildRequesterEmail(name: string, company?: string): string {
  const greeting = company ? `Hi ${name} from ${company},` : `Hi ${name},`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Resume — Soumadeep Dey</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #09090f; color: #eef0f5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
</style>
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#09090f;padding:48px 16px;">
  <tr>
    <td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Header bar -->
        <tr>
          <td style="background:linear-gradient(90deg,#4f9cf9 0%,#06b6d4 100%);height:3px;border-radius:3px 3px 0 0;"></td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#111118;border:1px solid rgba(79,156,249,0.15);border-top:none;border-radius:0 0 12px 12px;padding:40px 36px;">

            <!-- Eyebrow -->
            <p style="font-size:11px;letter-spacing:0.2em;color:#4f9cf9;text-transform:uppercase;font-weight:600;margin-bottom:20px;">
              Soumadeep Dey · Full Stack Developer
            </p>

            <!-- Greeting -->
            <p style="font-size:15px;color:#a0a8b8;line-height:1.7;margin-bottom:24px;">
              ${greeting}
            </p>

            <!-- Intro -->
            <p style="font-size:15px;color:#a0a8b8;line-height:1.75;margin-bottom:20px;">
              Thanks for reaching out. I've attached my resume to this email for your review.
            </p>

            <p style="font-size:15px;color:#a0a8b8;line-height:1.75;margin-bottom:24px;">
              I'm a <strong style="color:#eef0f5;font-weight:600;">Full Stack Developer</strong> with 2+ years of hands-on experience building 
              <strong style="color:#eef0f5;font-weight:600;">scalable web applications</strong> using React, Node.js, and TypeScript. 
              I've led frontend architecture work, shipped production ERP platforms, and consistently delivered 
              <strong style="color:#4f9cf9;font-weight:600;">80–97% performance improvements</strong> across projects. I take pride in writing clean, maintainable code and collaborating closely with teams to ship products that users love.
            </p>

            <!-- Primary CTA: Download Resume -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td style="background:#4f9cf9;border-radius:6px;padding:14px 28px;">
                  <a href="${RESUME_URL || PORTFOLIO_URL}" style="color:#09090f;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.03em;">
                    ${RESUME_URL ? "↓ Download Resume" : "View Profile"}
                  </a>
                </td>
              </tr>
            </table>

            <!-- Secondary CTA: Portfolio -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:transparent;border:1px solid rgba(79,156,249,0.35);border-radius:6px;padding:13px 28px;">
                  <a href="${PORTFOLIO_URL}" style="color:#4f9cf9;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.03em;">
                    View My Work →
                  </a>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <div style="height:1px;background:rgba(79,156,249,0.12);margin-bottom:28px;"></div>

            <!-- Contact details row -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding-right:12px;">
                  <a href="mailto:${OWNER_EMAIL}" style="display:inline-block;background:rgba(79,156,249,0.08);border:1px solid rgba(79,156,249,0.2);border-radius:5px;padding:10px 16px;color:#4f9cf9;font-size:12px;font-weight:600;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">
                    Email Me
                  </a>
                </td>
                <td style="padding-right:12px;">
                  <a href="${LINKEDIN_URL}" style="display:inline-block;background:rgba(79,156,249,0.08);border:1px solid rgba(79,156,249,0.2);border-radius:5px;padding:10px 16px;color:#4f9cf9;font-size:12px;font-weight:600;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">
                    LinkedIn
                  </a>
                </td>
                <td>
                  <a href="${GITHUB_URL}" style="display:inline-block;background:rgba(79,156,249,0.08);border:1px solid rgba(79,156,249,0.2);border-radius:5px;padding:10px 16px;color:#4f9cf9;font-size:12px;font-weight:600;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">
                    GitHub
                  </a>
                </td>
              </tr>
            </table>

            <!-- Sign off -->
            <p style="font-size:14px;color:#a0a8b8;line-height:1.7;margin-bottom:24px;">
              Looking forward to chatting about the opportunity. Feel free to reply directly to this email — it goes straight to my inbox.
            </p>

            <p style="font-size:14px;color:#eef0f5;font-weight:600;">
              Best,<br/>Soumadeep
            </p>
            <p style="font-size:12px;color:#5a6478;margin-top:4px;">
              Full Stack Developer · Kolkata, India
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top:24px;text-align:center;">
            <p style="font-size:11px;color:#3a4252;line-height:1.6;">
              You requested this resume from <a href="${PORTFOLIO_URL}" style="color:#4f9cf9;text-decoration:none;">${PORTFOLIO_URL}</a><br/>
              This is a one-time delivery — no spam, ever.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, company } = req.body as {
    name?: string;
    email?: string;
    company?: string;
  };

  // Validate inputs
  if (!name || typeof name !== "string" || name.trim().length < 1) {
    return res.status(400).json({ message: "Name is required" });
  }
  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  const safeName = name.trim().slice(0, 100);
  const safeEmail = email.trim().slice(0, 200);
  const safeCompany =
    typeof company === "string" ? company.trim().slice(0, 100) : undefined;

  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Missing Gmail credentials in environment variables");
    console.error("GMAIL_USER set:", !!GMAIL_USER);
    console.error("GMAIL_APP_PASSWORD set:", !!GMAIL_APP_PASSWORD);
    return res.status(500).json({ 
      message: "Email service not configured. Please try again later." 
    });
  }

  // Debug log environment variables
  console.log("Resume send request from:", safeEmail);
  console.log("PORTFOLIO_URL:", PORTFOLIO_URL);
  console.log("RESUME_URL:", RESUME_URL ? "SET" : "NOT SET");
  console.log("GMAIL_USER:", GMAIL_USER.slice(0, 5) + "...");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  try {
    // Send resume to requester with owner BCC'd
    await transporter.sendMail({
      from: `Soumadeep Dey <${GMAIL_USER}>`,
      to: safeEmail,
      bcc: OWNER_EMAIL,
      replyTo: OWNER_EMAIL,
      subject: `My Resume — Soumadeep Dey`,
      html: buildRequesterEmail(safeName, safeCompany),
      ...(RESUME_URL
        ? {
            attachments: [
              {
                filename: "Soumadeep-Dey-Resume.pdf",
                path: RESUME_URL,
              },
            ],
          }
        : {}),
    });

    console.log("Resume sent successfully to:", safeEmail);
    return res.status(200).json({ message: "Resume sent successfully" });
  } catch (err) {
    console.error("Nodemailer error:", err);
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    return res
      .status(500)
      .json({ message: `Failed to send email: ${errorMessage}` });
  }
}
