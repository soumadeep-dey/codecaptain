import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const OWNER_EMAIL = "contactsoumadeepdey@gmail.com";
const PORTFOLIO_URL = "https://soumadeep-dey.vercel.app";
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
              Thank you for your interest. As requested, my resume is attached to this email.
              I'm a <strong style="color:#eef0f5;font-weight:600;">Full Stack Developer</strong> with 2+ years of experience 
              building <strong style="color:#eef0f5;font-weight:600;">enterprise-grade web applications</strong> using 
              React, Node.js, and TypeScript.
            </p>

            <p style="font-size:15px;color:#a0a8b8;line-height:1.75;margin-bottom:32px;">
              I've led frontend architecture, shipped production ERP platforms, and consistently improved 
              performance by <strong style="color:#4f9cf9;font-weight:600;">80–97%</strong> across every project I've touched.
            </p>

            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:#4f9cf9;border-radius:6px;padding:14px 28px;">
                  <a href="${PORTFOLIO_URL}" style="color:#09090f;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.03em;">
                    View Portfolio →
                  </a>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <div style="height:1px;background:rgba(79,156,249,0.12);margin-bottom:28px;"></div>

            <!-- Links row -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding-right:12px;">
                  <a href="${LINKEDIN_URL}" style="display:inline-block;background:rgba(79,156,249,0.08);border:1px solid rgba(79,156,249,0.2);border-radius:5px;padding:10px 16px;color:#4f9cf9;font-size:12px;font-weight:600;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">
                    LinkedIn
                  </a>
                </td>
                <td style="padding-right:12px;">
                  <a href="${GITHUB_URL}" style="display:inline-block;background:rgba(79,156,249,0.08);border:1px solid rgba(79,156,249,0.2);border-radius:5px;padding:10px 16px;color:#4f9cf9;font-size:12px;font-weight:600;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">
                    GitHub
                  </a>
                </td>
                <td>
                  <a href="mailto:${OWNER_EMAIL}" style="display:inline-block;background:rgba(79,156,249,0.08);border:1px solid rgba(79,156,249,0.2);border-radius:5px;padding:10px 16px;color:#4f9cf9;font-size:12px;font-weight:600;text-decoration:none;letter-spacing:0.08em;text-transform:uppercase;">
                    Email Me
                  </a>
                </td>
              </tr>
            </table>

            <!-- Sign off -->
            <p style="font-size:14px;color:#a0a8b8;line-height:1.7;margin-bottom:24px;">
              Looking forward to connecting. Feel free to reply to this email — it goes straight to my inbox.
            </p>

            <p style="font-size:14px;color:#eef0f5;font-weight:600;">
              — Soumadeep Dey
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
              This is a one-time delivery — you won't receive any further emails.
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

function buildOwnerNotification(
  name: string,
  email: string,
  company?: string,
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="background:#09090f;color:#eef0f5;font-family:monospace;padding:32px;">
  <div style="max-width:480px;margin:0 auto;background:#111118;border:1px solid rgba(79,156,249,0.2);border-radius:10px;padding:28px;">
    <p style="color:#4f9cf9;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;">
      New Resume Request
    </p>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;color:#a0a8b8;font-size:13px;width:90px;">Name</td><td style="padding:8px 0;color:#eef0f5;font-size:13px;font-weight:600;">${name}</td></tr>
      <tr><td style="padding:8px 0;color:#a0a8b8;font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#4f9cf9;font-size:13px;">${email}</a></td></tr>
      ${company ? `<tr><td style="padding:8px 0;color:#a0a8b8;font-size:13px;">Company</td><td style="padding:8px 0;color:#eef0f5;font-size:13px;">${company}</td></tr>` : ""}
    </table>
  </div>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

  try {
    // Send resume to requester
    await resend.emails.send({
      from: "Soumadeep Dey <onboarding@resend.dev>",
      to: safeEmail,
      subject: "Resume — Soumadeep Dey · Full Stack Developer",
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

    // Notify owner
    await resend.emails.send({
      from: "Portfolio Bot <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      subject: `Resume requested by ${safeName}${safeCompany ? ` · ${safeCompany}` : ""}`,
      html: buildOwnerNotification(safeName, safeEmail, safeCompany),
    });

    return res.status(200).json({ message: "Resume sent successfully" });
  } catch (err) {
    console.error("Resend error:", err);
    return res
      .status(500)
      .json({ message: "Failed to send email. Please try again." });
  }
}
