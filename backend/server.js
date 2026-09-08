require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const { Resend } = require("resend");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const {
  getContactAutoReplyText,
  getCourseRegistrationAutoReplyHtml,
  getLesPetitsAmisRegistrationAutoReplyHtml,
  getPfinztalRegistrationAutoReplyHtml,
  getInternalCourseRegistrationHtml,
  getInternalContactText,
  getInternalContactHtml,
} = require("./emails/templates");
const app = express();
app.set("trust proxy", 1);

const PORT = Number(process.env.PORT || 3000);
const MAIL_TO = process.env.MAIL_TO;
const MAIL_FROM =
  process.env.MAIL_FROM || "Kleine Musikschule <onboarding@resend.dev>";
const MAIL_REPLY_TO = process.env.MAIL_REPLY_TO || MAIL_TO;

if (!MAIL_TO) {
  console.warn(
    "[warn] MAIL_TO is not set. Contact emails cannot be delivered.",
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailViaResend(mailOptions) {
  const sendPayload = {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    html: mailOptions.html,
    text: mailOptions.text,
    reply_to: mailOptions.replyTo,
  };

  if (mailOptions.attachments) {
    sendPayload.attachments = mailOptions.attachments;
  }

  const { data, error } = await resend.emails.send(sendPayload);

  if (error) {
    throw new Error(`Resend Error: ${error.message}`);
  }
  return data;
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
  await sendEmailViaResend({
    from: MAIL_FROM,
    to: email,
    replyTo: MAIL_REPLY_TO,
    subject: "Wir haben deine Nachricht erhalten",
    text: getContactAutoReplyText(name),
  });
}

function getIcsAttachment(icsFilePath, filename) {
  try {
    const fullPath = path.resolve(__dirname, "..", icsFilePath);
    const content = fs.readFileSync(fullPath, "utf8");
    return {
      filename: filename,
      content: Buffer.from(content).toString("base64"),
      content_type: "text/calendar",
    };
  } catch (err) {
    console.warn(`[ical] Could not read ${icsFilePath}:`, err.message);
    return null;
  }
}

async function sendKursanmeldungConfirmationEmail(kVorname, vVorname, email, courseName, kurszeit) {
  let htmlContent;
  let icsAttachment = null;
  
  if (courseName && courseName.includes("Les Petits Amis")) {
    htmlContent = getLesPetitsAmisRegistrationAutoReplyHtml(kVorname, vVorname, courseName);
    icsAttachment = getIcsAttachment(
      "assets/downloads/les-petits-amis-termine.ics",
      "Les-Petits-Amis-Termine.ics"
    );
  } else if (courseName && courseName.includes("Pfinztal")) {
    htmlContent = getPfinztalRegistrationAutoReplyHtml(kVorname, vVorname, courseName, kurszeit);
    const icsFile = (kurszeit && kurszeit.includes("15:10"))
      ? "assets/downloads/pfinztal-termine-1.ics"
      : "assets/downloads/pfinztal-termine-2.ics";
    icsAttachment = getIcsAttachment(icsFile, "Pfinztal-Termine.ics");
  } else {
    htmlContent = getCourseRegistrationAutoReplyHtml(vVorname, courseName, kurszeit);
  }

  const mailOptions = {
    from: MAIL_FROM,
    to: email,
    replyTo: MAIL_REPLY_TO,
    subject: `Bestätigung deiner Anmeldung: ${courseName}`,
    html: htmlContent,
  };

  if (icsAttachment) {
    mailOptions.attachments = [icsAttachment];
  }

  await sendEmailViaResend(mailOptions);
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
    const kurszeit = sanitizeText(req.body?.["Kurszeit"], 100);
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

    const internalHtml = getInternalCourseRegistrationHtml({
      kurs, kurszeit, kVorname, kNachname, alter, vVorname, vNachname,
      adresse, email, telefon, nachricht, medien
    });

    try {
      const emailToSchool = sendEmailViaResend({
        from: MAIL_FROM,
        to: MAIL_TO,
        replyTo: email,
        subject: `Neue Anmeldung: ${kurs}`,
        html: internalHtml,
      });

      const emailToCustomer = sendKursanmeldungConfirmationEmail(kVorname, vVorname, email, kurs, kurszeit)
        .catch(confirmError => {
          console.warn("[kursanmeldung] Auto-Reply an Kunden fehlgeschlagen. Resend Sandbox Limit?", confirmError.message);
        });

      await Promise.all([emailToSchool, emailToCustomer]);

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

  const internalText = getInternalContactText({ name, email, location, coordinates, message });
  const internalHtml = getInternalContactHtml({ name, email, location, coordinates, message });

  try {
    const emailToSchool = sendEmailViaResend({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject: "Neue Kontaktanfrage | kleine Musikschule",
      text: internalText,
      html: internalHtml,
    });

    const emailToCustomer = sendCustomerConfirmationEmail(name, email)
      .catch(confirmError => {
        console.warn("[contact] Auto-Reply an Kunden fehlgeschlagen. Resend Sandbox Limit?", confirmError.message);
      });

    await Promise.all([emailToSchool, emailToCustomer]);

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
