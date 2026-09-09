const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { sendEmailViaResend, MAIL_TO } = require("../services/emailService");
const { sanitizeText, isValidEmail } = require("../utils/validation");
const {
  getInternalContactText,
  getInternalContactHtml,
  getContactAutoReplyText,
  getContactAutoReplyHtml,
} = require("../emails/templates");

async function sendCustomerConfirmationEmail(name, email) {
  await sendEmailViaResend({
    to: email,
    subject: "Wir haben deine Nachricht erhalten",
    text: getContactAutoReplyText(name),
    html: getContactAutoReplyHtml(name),
  });
}

async function handleContact(req, res) {
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
    return res.status(400).json({ error: "Bitte Name, E-Mail und Nachricht ausfüllen." });
  }

  if (!datenschutz) {
    console.warn("[contact] validation failed: datenschutz not confirmed");
    return res.status(400).json({ error: "Datenschutz muss bestätigt werden." });
  }

  if (!isValidEmail(email)) {
    console.warn("[contact] validation failed: invalid email");
    return res.status(400).json({ error: "Bitte eine gültige E-Mail-Adresse eingeben." });
  }

  if (!MAIL_TO) {
    console.error("[contact] MAIL_TO is not configured");
    return res.status(500).json({ error: "Mail-Empfänger ist nicht konfiguriert." });
  }

  const internalText = getInternalContactText({ name, email, location, coordinates, message });
  const internalHtml = getInternalContactHtml({ name, email, location, coordinates, message });

  try {
    await prisma.contactRequest.create({
      data: {
        name,
        email,
        message,
        location: location || null,
        coordinates: coordinates || null,
        datenschutz,
      },
    });
  } catch (dbError) {
    console.error("[db-error] Fehler beim Speichern der Kontaktanfrage in der DB:", dbError);
  }

  try {
    const emailToSchool = sendEmailViaResend({
      to: MAIL_TO,
      replyTo: email,
      subject: "Neue Kontaktanfrage | kleine Musikschule",
      text: internalText,
      html: internalHtml,
    });

    const emailToCustomer = sendCustomerConfirmationEmail(name, email).catch((confirmError) => {
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
}

async function handleCustomerConfirmation(req, res) {
  const name = sanitizeText(req.body?.name, 120);
  const email = sanitizeText(req.body?.email, 180);

  if (!name || !email) {
    return res.status(400).json({ error: "Bitte Name und E-Mail ausfüllen." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Bitte eine gültige E-Mail-Adresse eingeben." });
  }

  try {
    await sendCustomerConfirmationEmail(name, email);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[confirmation-mail-error]", error);
    return res.status(500).json({ error: "Bestätigungsmail konnte nicht gesendet werden." });
  }
}

module.exports = {
  handleContact,
  handleCustomerConfirmation,
};
