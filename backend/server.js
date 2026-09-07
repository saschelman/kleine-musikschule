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
  process.env.MAIL_FROM || "Kleine Musikschule <noreply@kleine-musikschule.de>";
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
  connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT || 10000),
  greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT || 10000),
  socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT || 15000),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function sendMailWithTimeout(mailOptions, timeoutMs = 15000) {
  return Promise.race([
    transporter.sendMail(mailOptions),
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("SMTP send timeout"));
      }, timeoutMs);
    }),
  ]);
}

const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((item) => item.trim())
  : [
      "https://www.kleine-musikschule.de",
      "https://kleine-musikschule.de",
      "https://kleine-musikschule-webseite-forty.onrender.com",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ];

app.use(cors({ origin: corsOrigin }));

app.use(helmet());
app.use(express.json({ limit: "200kb" }));

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
});

const confirmationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Zu viele Bestätigungsanfragen. Bitte später erneut versuchen.",
  },
});

function sanitizeText(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendCustomerConfirmationEmail(name, email) {
  const autoReplyText = [
    `Hallo ${name},`,
    "",
    "vielen Dank für deine Nachricht an die kleine Musikschule Karlsruhe.",
    "Wir melden uns so schnell wie möglich bei dir zurück.",
    "",
    "Musikalische Grüße",
    "Kleine Musikschule Karlsruhe",
  ].join("\n");

  await sendMailWithTimeout({
    from: MAIL_FROM,
    to: email,
    replyTo: MAIL_REPLY_TO,
    subject: "Wir haben deine Nachricht erhalten",
    text: autoReplyText,
  });
}

async function sendKursanmeldungConfirmationEmail(vorname, email, courseName) {
  const subject = `Bestätigung deiner Voranmeldung: ${courseName}`;
  const htmlTemplate = `
    <html>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">Vielen Dank für die Anmeldung! 🎵</h1>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">Hallo <strong>${vorname}</strong>,</p>
          <p style="font-size: 16px; line-height: 1.6;">
            wir haben deine Voranmeldung für <strong>${courseName}</strong> erhalten. Wir freuen uns sehr über das Interesse!
          </p>
          <div style="background-color: #f8fbfa; border-left: 4px solid #9bf1ff; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <h3 style="margin-top: 0; color: #2c3e50; font-size: 16px;">Wie geht es jetzt weiter?</h3>
            <p style="margin: 0; font-size: 15px; line-height: 1.5;">Wir prüfen aktuell die freien Plätze und melden uns in Kürze mit allen weiteren Details bei dir zurück.</p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">
            Musikalische Grüße,<br>
            <strong>Deine Kleine Musikschule Karlsruhe</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px;">
          <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            Dies ist eine automatisch generierte E-Mail. Bitte antworte nicht darauf.
          </p>
        </div>
      </body>
    </html>
  `;

  await sendMailWithTimeout({
    from: MAIL_FROM,
    to: email,
    replyTo: MAIL_REPLY_TO,
    subject: subject,
    html: htmlTemplate,
  });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post(
  "/api/contact/customer-confirmation",
  confirmationRateLimit,
  async (req, res) => {
    const name = sanitizeText(req.body?.name, 120);
    const email = sanitizeText(req.body?.email, 180);

    if (!name || !email) {
      return res
        .status(400)
        .json({ error: "Bitte Name und E-Mail ausfüllen." });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ error: "Bitte eine gültige E-Mail-Adresse eingeben." });
    }

    try {
      await sendCustomerConfirmationEmail(name, email);
      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error("[confirmation-mail-error]", error);
      return res
        .status(500)
        .json({ error: "Bestätigungsmail konnte nicht gesendet werden." });
    }
  },
);

app.post(
  "/api/kursanmeldung",
  confirmationRateLimit,
  async (req, res) => {
    const kurs = sanitizeText(req.body?.["Kursanmeldung"], 200) || "Musikkurs";
    const kVorname = sanitizeText(req.body?.["Kursteilnehmer Vorname"], 120);
    const kNachname = sanitizeText(req.body?.["Kursteilnehmer Nachname"], 120);
    const alter = sanitizeText(req.body?.["Alter"], 50);
    const vVorname = sanitizeText(req.body?.["Vertreter Vorname"], 120);
    const vNachname = sanitizeText(req.body?.["Vertreter Nachname"], 120);
    const adresse = sanitizeText(req.body?.["Adresse"], 300);
    const email = sanitizeText(req.body?.["Email"], 180);
    const telefon = sanitizeText(req.body?.["Telefonnummer"], 100);
    const nachricht = sanitizeText(req.body?.["Nachricht"], 4000);
    
    const agb = Boolean(req.body?.["AGB akzeptiert"]);
    const datenschutz = Boolean(req.body?.["Datenschutz akzeptiert"]);
    const medien = Boolean(req.body?.["Medien Erlaubnis"]);

    if (!kVorname || !kNachname || !vVorname || !vNachname || !adresse || !email || !telefon) {
      return res.status(400).json({ error: "Bitte alle Pflichtfelder ausfüllen." });
    }

    if (!agb || !datenschutz) {
      return res.status(400).json({ error: "AGB und Datenschutz müssen akzeptiert werden." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Bitte eine gültige E-Mail-Adresse eingeben." });
    }

    if (!MAIL_TO) {
      return res.status(500).json({ error: "Mail-Empfänger ist nicht konfiguriert." });
    }

    const internalHtml = `
      <h2>Neue Kursanmeldung: ${kurs}</h2>
      <h3>Kursteilnehmer/in</h3>
      <p><strong>Name:</strong> ${kVorname} ${kNachname}</p>
      <p><strong>Alter:</strong> ${alter}</p>
      <h3>Gesetzliche/r Vertreter/in</h3>
      <p><strong>Name:</strong> ${vVorname} ${vNachname}</p>
      <p><strong>Adresse:</strong> ${adresse}</p>
      <p><strong>E-Mail:</strong> ${email}</p>
      <p><strong>Telefon:</strong> ${telefon}</p>
      <h3>Weitere Infos</h3>
      <p><strong>Nachricht:</strong><br>${nachricht ? nachricht.replace(/\n/g, "<br>") : "-"}</p>
      <p><strong>Medien-Erlaubnis erteilt:</strong> ${medien ? "Ja" : "Nein"}</p>
    `;

    try {
      // Send to Music School
      await sendMailWithTimeout({
        from: MAIL_FROM,
        to: MAIL_TO,
        replyTo: email,
        subject: `Neue Anmeldung: ${kurs}`,
        html: internalHtml,
      });

      // Send confirmation to Customer
      await sendKursanmeldungConfirmationEmail(vVorname, email, kurs);

      return res.status(200).json({ ok: true });
    } catch (error) {
      console.error("[kursanmeldung-error]", error);
      return res.status(500).json({ error: "Anmeldung konnte nicht verarbeitet werden." });
    }
  }
);

app.post("/api/contact", contactRateLimit, async (req, res) => {
  const name = sanitizeText(req.body?.name, 120);
  const email = sanitizeText(req.body?.email, 180);
  const message = sanitizeText(req.body?.message, 4000);
  const location = sanitizeText(req.body?.location, 250);
  const coordinates = sanitizeText(req.body?.coordinates, 120);
  const datenschutz = Boolean(req.body?.datenschutz);

  console.log("[contact] request received", {
    name,
    email,
    hasMessage: Boolean(message),
    datenschutz,
  });

  if (!name || !email || !message) {
    console.warn("[contact] validation failed: missing required fields");
    return res
      .status(400)
      .json({ error: "Bitte Name, E-Mail und Nachricht ausfüllen." });
  }

  if (!datenschutz) {
    console.warn("[contact] validation failed: datenschutz not confirmed");
    return res
      .status(400)
      .json({ error: "Datenschutz muss bestätigt werden." });
  }

  if (!isValidEmail(email)) {
    console.warn("[contact] validation failed: invalid email");
    return res
      .status(400)
      .json({ error: "Bitte eine gültige E-Mail-Adresse eingeben." });
  }

  if (!MAIL_TO) {
    console.error("[contact] MAIL_TO is not configured");
    return res
      .status(500)
      .json({ error: "Mail-Empfänger ist nicht konfiguriert." });
  }

  const internalText = [
    "Neue Kontaktanfrage über kleine-musikschule.de",
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

  try {
    await sendMailWithTimeout({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject: "Neue Kontaktanfrage | kleine Musikschule",
      text: internalText,
      html: internalHtml,
    });

    await sendCustomerConfirmationEmail(name, email);

    console.log("[contact] mail sent successfully", { to: MAIL_TO, email });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[mail-error]", error);
    return res.status(500).json({
      error: "Versand fehlgeschlagen. Bitte später erneut versuchen.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`[contact-backend] running on http://localhost:${PORT}`);
});
