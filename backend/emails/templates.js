function getContactAutoReplyText(name) {
  return [
    `Hallo ${name},`,
    "",
    "vielen Dank für deine Nachricht an die kleine Musikschule Karlsruhe.",
    "Wir melden uns so schnell wie möglich bei dir zurück.",
    "",
    "Musikalische Grüße",
    "Kleine Musikschule Karlsruhe",
  ].join("\n");
}

function getCourseRegistrationAutoReplyHtml(vorname, courseName, kurszeit) {
  const kurszeitHtml = kurszeit
    ? `<p style="font-size: 16px; line-height: 1.6;">Dein gewünschtes Zeitfenster: <strong>${kurszeit}</strong></p>`
    : "";

  return `
    <html>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://kleine-musikschule.de/images/logo_small.png" alt="Kleine Musikschule Karlsruhe" style="max-width: 120px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">Vielen Dank für die Anmeldung! 🎵</h1>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">Hallo <strong>${vorname}</strong>,</p>
          <p style="font-size: 16px; line-height: 1.6;">
            ich habe deine Anmeldung für <strong>${courseName}</strong> erhalten. Ich freue mich wirklich sehr über dein Interesse!
          </p>
          ${kurszeitHtml}
          <div style="background-color: #f8fbfa; border-left: 4px solid #9bf1ff; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <h3 style="margin-top: 0; color: #2c3e50; font-size: 16px;">Wie geht es jetzt weiter?</h3>
            <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.5;">Ich schaue mir direkt an, welche Plätze noch frei sind, und melde mich dann ganz bald persönlich mit allen weiteren Details bei dir zurück.</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #666;"><em>Wichtiger Hinweis: Da die Plätze begrenzt sind, kann ich den Platz oder das gewünschte Zeitfenster leider nicht immer fest garantieren. Wenn der Kurs voll ist, ist er voll – aber ich schaue dann natürlich gerne mit dir gemeinsam nach einer guten Alternative!</em></p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">
            Ganz herzliche musikalische Grüße,<br>
            <strong>Deine kleine Musikschule Karlsruhe</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px;">
          <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            Dies ist eine automatisch generierte E-Mail. Bitte antworte nicht darauf.
          </p>
        </div>
      </body>
    </html>
  `;
}

function getInternalCourseRegistrationHtml(data) {
  return `
    <h2>Neue Kursanmeldung: ${data.kurs}</h2>
    ${data.kurszeit ? `<p><strong>Gewünschte Kurszeit:</strong> ${data.kurszeit}</p>` : ''}
    <h3>Kursteilnehmer/in</h3>
    <p><strong>Name:</strong> ${data.kVorname} ${data.kNachname}</p>
    <p><strong>Alter:</strong> ${data.alter}</p>
    <h3>Gesetzliche/r Vertreter/in</h3>
    <p><strong>Name:</strong> ${data.vVorname} ${data.vNachname}</p>
    <p><strong>Adresse:</strong> ${data.adresse}</p>
    <p><strong>E-Mail:</strong> ${data.email}</p>
    <p><strong>Telefon:</strong> ${data.telefon}</p>
    <h3>Weitere Infos</h3>
    <p><strong>Nachricht:</strong><br>${data.nachricht ? data.nachricht.replace(/\n/g, "<br>") : "-"}</p>
    <p><strong>Medien-Erlaubnis erteilt:</strong> ${data.medien ? "Ja" : "Nein"}</p>
  `;
}

function getInternalContactText(data) {
  return [
    "Neue Kontaktanfrage über kleine-musikschule.de",
    "",
    `Name: ${data.name}`,
    `E-Mail: ${data.email}`,
    `Standort: ${data.location || "-"}`,
    `Koordinaten: ${data.coordinates || "-"}`,
    "",
    "Nachricht:",
    data.message,
  ].join("\n");
}

function getInternalContactHtml(data) {
  return `
    <h2>Neue Kontaktanfrage</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>E-Mail:</strong> ${data.email}</p>
    <p><strong>Standort:</strong> ${data.location || "-"}</p>
    <p><strong>Koordinaten:</strong> ${data.coordinates || "-"}</p>
    <p><strong>Nachricht:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;
}

module.exports = {
  getContactAutoReplyText,
  getCourseRegistrationAutoReplyHtml,
  getInternalCourseRegistrationHtml,
  getInternalContactText,
  getInternalContactHtml,
};
