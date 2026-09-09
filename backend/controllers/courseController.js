const prisma = require("../services/db");

const { sendEmailViaResend, getIcsAttachment, MAIL_TO } = require("../services/emailService");
const { sanitizeText, isValidEmail } = require("../utils/validation");
const {
  getCourseRegistrationAutoReplyHtml,
  getLesPetitsAmisRegistrationAutoReplyHtml,
  getPfinztalRegistrationAutoReplyHtml,
  getInternalCourseRegistrationHtml,
} = require("../emails/templates");

async function sendKursanmeldungConfirmationEmail(kVorname, vVorname, email, courseName, kurszeit) {
  let htmlContent;
  let icsAttachment = null;

  if (courseName && courseName.includes("Les Petits Amis")) {
    htmlContent = getLesPetitsAmisRegistrationAutoReplyHtml(kVorname, vVorname, courseName);
    icsAttachment = getIcsAttachment("assets/downloads/les-petits-amis-termine.ics", "Les-Petits-Amis-Termine.ics");
  } else if (courseName && courseName.includes("Pfinztal")) {
    htmlContent = getPfinztalRegistrationAutoReplyHtml(kVorname, vVorname, courseName, kurszeit);
    const icsFile =
      kurszeit && kurszeit.includes("15:10")
        ? "assets/downloads/pfinztal-termine-1.ics"
        : "assets/downloads/pfinztal-termine-2.ics";
    icsAttachment = getIcsAttachment(icsFile, "Pfinztal-Termine.ics");
  } else {
    htmlContent = getCourseRegistrationAutoReplyHtml(vVorname, courseName, kurszeit);
  }

  const mailOptions = {
    to: email,
    subject: `Bestätigung deiner Anmeldung: ${courseName}`,
    html: htmlContent,
  };

  if (icsAttachment) {
    mailOptions.attachments = [icsAttachment];
  }

  await sendEmailViaResend(mailOptions);
}

async function handleCourseRegistration(req, res) {
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
    kurs,
    kurszeit,
    kVorname,
    kNachname,
    alter,
    vVorname,
    vNachname,
    adresse,
    email,
    telefon,
    nachricht,
    medien,
  });

  try {
    await prisma.courseRegistration.create({
      data: {
        kurs,
        kurszeit: kurszeit || null,
        kVorname,
        kNachname,
        alter: alter || null,
        vVorname,
        vNachname,
        adresse,
        email,
        telefon,
        nachricht: nachricht || null,
        agb,
        datenschutz,
        medien,
      },
    });
  } catch (dbError) {
    console.error("[db-error] Fehler beim Speichern der Kursanmeldung in der DB:", dbError);
  }

  try {
    const emailToSchool = sendEmailViaResend({
      to: MAIL_TO,
      replyTo: email,
      subject: `Neue Anmeldung: ${kurs}`,
      html: internalHtml,
    });

    const emailToCustomer = sendKursanmeldungConfirmationEmail(kVorname, vVorname, email, kurs, kurszeit).catch(
      (confirmError) => {
        console.warn(
          "[kursanmeldung] Auto-Reply an Kunden fehlgeschlagen. Resend Sandbox Limit?",
          confirmError.message,
        );
      },
    );

    await Promise.all([emailToSchool, emailToCustomer]);

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[kursanmeldung-error]", error);
    return res.status(500).json({ error: "Anmeldung konnte nicht verarbeitet werden." });
  }
}

module.exports = {
  handleCourseRegistration,
};
