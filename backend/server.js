require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();
app.set("trust proxy", 1);

const PORT = Number(process.env.PORT || 3000);
const MAIL_TO = process.env.MAIL_TO;
const MAIL_FROM =
  process.env.MAIL_FROM || "Kleine Musikschule <noreply@kleine-muskischule.de>";
const MAIL_REPLY_TO = process.env.MAIL_REPLY_TO || MAIL_TO;

if (!MAIL_TO) {
  console.warn(
    "[warn] MAIL_TO is not set. Contact emails cannot be delivered.",
  );
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((item) => item.trim())
  : null;

if (corsOrigin) {
  app.use(cors({ origin: corsOrigin }));
}

app.use(helmet());
app.use(express.json({ limit: "200kb" }));

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
});

function sanitizeText(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", contactRateLimit, async (req, res) => {
  const name = sanitizeText(req.body?.name, 120);
  const email = sanitizeText(req.body?.email, 180);
  const message = sanitizeText(req.body?.message, 4000);
  const location = sanitizeText(req.body?.location, 250);
  const coordinates = sanitizeText(req.body?.coordinates, 120);
  const datenschutz = Boolean(req.body?.datenschutz);

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Bitte Name, E-Mail und Nachricht ausfüllen." });
  }

  if (!datenschutz) {
    return res
      .status(400)
      .json({ error: "Datenschutz muss bestätigt werden." });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res
      .status(400)
      .json({ error: "Bitte eine gültige E-Mail-Adresse eingeben." });
  }

  if (!MAIL_TO) {
    return res
      .status(500)
      .json({ error: "Mail-Empfänger ist nicht konfiguriert." });
  }

  const internalText = [
    "Neue Kontaktanfrage über kleine-muskischule.de",
    "",
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Standort: ${location || "-"}`,
    `Koordinaten: ${coordinates || "-"}`,
    "",
    "Nachricht:",
    message,
  ].join("\n");

  const internalHtml = `
    <h2>Neue Kontaktanfrage</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>E-Mail:</strong> ${email}</p>
    <p><strong>Standort:</strong> ${location || "-"}</p>
    <p><strong>Koordinaten:</strong> ${coordinates || "-"}</p>
    <p><strong>Nachricht:</strong></p>
    <p>${message.replace(/\n/g, "<br>")}</p>
  `;

  const autoReplyText = [
    `Hallo ${name},`,
    "",
    "vielen Dank für deine Nachricht an die kleine Musikschule Karlsruhe.",
    "Wir melden uns so schnell wie möglich bei dir zurück.",
    "",
    "Musikalische Grüße",
    "Kleine Musikschule Karlsruhe",
  ].join("\n");

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject: "Neue Kontaktanfrage | kleine Musikschule",
      text: internalText,
      html: internalHtml,
    });

    await transporter.sendMail({
      from: MAIL_FROM,
      to: email,
      replyTo: MAIL_REPLY_TO,
      subject: "Wir haben deine Nachricht erhalten",
      text: autoReplyText,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[mail-error]", error);
    return res
      .status(500)
      .json({
        error: "Versand fehlgeschlagen. Bitte später erneut versuchen.",
      });
  }
});

app.listen(PORT, () => {
  console.log(`[contact-backend] running on http://localhost:${PORT}`);
});
