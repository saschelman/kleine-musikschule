/**
 * E-Mail Templates for Kleine Musikschule Karlsruhe
 *
 * This file contains templates for automated replies to users and
 * internal notifications. The code is structured to reuse common
 * HTML parts for consistent styling and easier maintenance.
 */

// ============================================================================
// COMMON COMPONENTS & STYLES
// ============================================================================

const STYLE = {
  fontExternal: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  fontInternal: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  colors: {
    primary: "#2c3e50",
    text: "#333",
    lightText: "#666",
    muted: "#999",
    bgBody: "#f4f7f6",
    bgCard: "#ffffff",
    highlight: "#9bf1ff",
    highlightBg: "#f8fbfa",
    // Internal styles
    intText: "#334155",
    intBgBody: "#f8fafc",
    intBorder: "#e2e8f0",
    intLabel: "#64748b",
    intVal: "#1e293b",
    intDivider: "#f1f5f9",
  },
};

/**
 * Base layout for external automated replies (sent to clients)
 */
const externalEmailLayout = (title, contentHtml) => `
  <html>
    <body style="font-family: ${STYLE.fontExternal}; background-color: ${STYLE.colors.bgBody}; padding: 20px; color: ${STYLE.colors.text};">
      <div style="max-width: 600px; margin: 0 auto; background: ${STYLE.colors.bgCard}; padding: 40px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.05);">
        
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://kleine-musikschule.de/images/logo_small.png" alt="Kleine Musikschule Karlsruhe" style="max-width: 120px; height: auto; margin-bottom: 20px;">
          <h1 style="color: ${STYLE.colors.primary}; margin: 0; font-size: 24px;">${title}</h1>
        </div>
        
        ${contentHtml}
        
        <div style="margin-top: 25px; margin-bottom: 25px; text-align: center;">
          <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0; color: ${STYLE.colors.text};">
            Ganz herzliche musikalische Grüße,<br>
            <strong style="color: ${STYLE.colors.primary};">Alexander Flöter</strong><br>
            <span style="color: ${STYLE.colors.lightText}; font-size: 14px;">Kleine Musikschule Karlsruhe</span>
          </p>
          <img src="https://kleine-musikschule.de/images/alex-portrait-square.jpg" alt="Alexander Flöter" width="100" height="100" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid ${STYLE.colors.highlight}; display: inline-block;">
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px;">
        <p style="font-size: 12px; color: ${STYLE.colors.muted}; text-align: center; margin: 0;">
          Du kannst auf diese E-Mail direkt antworten, falls du noch Fragen hast!
        </p>

      </div>
    </body>
  </html>
`;

/**
 * Reusable info box component for external emails
 */
const externalInfoBox = (contentHtml, title = "") => `
  <div style="background-color: ${STYLE.colors.highlightBg}; border-left: 4px solid ${STYLE.colors.highlight}; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
    ${title ? `<h3 style="margin-top: 0; color: ${STYLE.colors.primary}; font-size: 16px;">${title}</h3>` : ""}
    ${contentHtml}
  </div>
`;

/**
 * Base layout for internal notifications (sent to admin)
 */
const internalEmailLayout = (headerHtml, contentHtml) => `
  <html>
    <body style="font-family: ${STYLE.fontInternal}; background-color: ${STYLE.colors.intBgBody}; padding: 20px; color: ${STYLE.colors.intText}; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background: ${STYLE.colors.bgCard}; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); overflow: hidden;">
        
        ${headerHtml}

        <div style="padding: 30px;">
          ${contentHtml}
        </div>
        
        <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid ${STYLE.colors.intBorder};">
          <p style="margin: 0; font-size: 12px; color: #94a3b8;">
            Kleine Musikschule Karlsruhe &mdash; Automatisierte Benachrichtigung
          </p>
        </div>
      </div>
    </body>
  </html>
`;

/**
 * Reusable header component for internal emails
 */
const internalHeader = (title, subtitle, gradientConfig, borderColor, subtitleColor) => `
  <div style="background: linear-gradient(135deg, ${gradientConfig}); padding: 30px 20px; text-align: center; border-bottom: 4px solid ${borderColor};">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">${title}</h1>
    <p style="color: ${subtitleColor}; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">${subtitle}</p>
  </div>
`;

/**
 * Reusable table section for internal emails
 */
const internalTableSection = (title, rowsData) => {
  const rowsHtml = rowsData
    .map((row, index) => {
      const isFirst = index === 0;
      const borderTop = isFirst ? "" : `border-top: 1px solid ${STYLE.colors.intDivider};`;

      if (row.fullWidth) {
        const padding = row.padding || "20px";
        return `
        <tr>
          <td colspan="2" style="padding: ${padding}; ${borderTop} ${row.style || ""}">
            ${row.content}
          </td>
        </tr>
      `;
      }

      return `
      <tr>
        <td style="padding: 12px 0; width: 40%; color: ${STYLE.colors.intLabel}; font-size: 14px; ${borderTop}">${row.label}</td>
        <td style="padding: 12px 0; color: ${STYLE.colors.intVal}; font-weight: 500; ${borderTop}">${row.value}</td>
      </tr>
    `;
    })
    .join("");

  return `
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
      <tr>
        <td colspan="2" style="padding: 0 0 10px 0; border-bottom: 2px solid ${STYLE.colors.intBorder};">
          <h3 style="color: #0f172a; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">${title}</h3>
        </td>
      </tr>
      ${rowsHtml}
    </table>
  `;
};

// ============================================================================
// EXTERNAL EMAILS (AUTO-REPLIES TO CLIENTS)
// ============================================================================

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

function getContactAutoReplyHtml(name) {
  const content = `
    <p style="font-size: 16px; line-height: 1.6;">Hallo <strong>${name}</strong>,</p>
    <p style="font-size: 16px; line-height: 1.6;">
      vielen Dank für deine Nachricht an die kleine Musikschule Karlsruhe.
    </p>
    ${externalInfoBox(`
      <p style="margin: 0; font-size: 15px; line-height: 1.5; color: ${STYLE.colors.text};">
        Wir werden dein Anliegen so schnell wie möglich bearbeiten und melden uns in Kürze persönlich bei dir zurück.
      </p>
    `)}
  `;

  return externalEmailLayout("Wir haben deine Nachricht erhalten! 🎵", content);
}

function getLesPetitsAmisRegistrationAutoReplyHtml(kVorname, vVorname, courseName) {
  const content = `
    <p style="font-size: 16px; line-height: 1.6;">Hallo <strong>${kVorname}</strong> und <strong>${vVorname}</strong>,</p>
    <p style="font-size: 16px; line-height: 1.6;">
      ich habe eure Anmeldung für den <strong>Musikkurs für Kinder (Les Petits Amis)</strong> erhalten. Ich freue mich wirklich sehr über das Interesse!
    </p>
    ${externalInfoBox(
      `
      <ul style="margin: 10px 0; padding-left: 20px; font-size: 15px; line-height: 1.5; color: ${STYLE.colors.text};">
        <li>12.10.2026</li>
        <li>19.10.2026</li>
        <li>26.10.2026</li>
        <li>02.11.2026</li>
        <li>09.11.2026</li>
        <li>16.11.2026</li>
        <li>23.11.2026</li>
        <li>30.11.2026</li>
        <li>07.12.2026</li>
        <li>14.12.2026</li>
      </ul>
      <p style="margin-top: 15px; font-size: 14px; color: ${STYLE.colors.lightText};">
        📅 <em>Die Termine findest du auch als iCal-Datei im Anhang dieser E-Mail – einfach öffnen und im Kalender speichern!</em>
      </p>
    `,
      "Die Termine im Überblick",
    )}
  `;

  return externalEmailLayout("Vielen Dank für die Anmeldung! 🎵", content);
}

function getPfinztalRegistrationAutoReplyHtml(kVorname, vVorname, courseName, kurszeit) {
  const kurszeitHtml = kurszeit
    ? `<p style="font-size: 16px; line-height: 1.6; margin-bottom: 10px;">Ausgewählte Kurszeit: <strong>${kurszeit}</strong></p>`
    : "";

  const content = `
    <p style="font-size: 16px; line-height: 1.6;">Hallo <strong>${kVorname}</strong> und <strong>${vVorname}</strong>,</p>
    <p style="font-size: 16px; line-height: 1.6;">
      ich habe eure Anmeldung für den <strong>Musikkurs für Kinder (Pfinztal)</strong> erhalten. Ich freue mich wirklich sehr über das Interesse!
    </p>
    ${kurszeitHtml}
    ${externalInfoBox(
      `
      <ul style="margin: 10px 0; padding-left: 20px; font-size: 15px; line-height: 1.5; color: ${STYLE.colors.text};">
        <li>12.10.2026</li>
        <li>19.10.2026</li>
        <li>26.10.2026</li>
        <li>02.11.2026</li>
        <li>09.11.2026</li>
        <li>16.11.2026</li>
        <li>23.11.2026</li>
        <li>30.11.2026</li>
        <li>07.12.2026</li>
        <li>14.12.2026</li>
      </ul>
      <p style="margin-top: 15px; font-size: 14px; color: ${STYLE.colors.lightText};">
        📅 <em>Die Termine findest du auch als iCal-Datei im Anhang dieser E-Mail – einfach öffnen und im Kalender speichern!</em>
      </p>
    `,
      "Die Termine im Überblick",
    )}
  `;

  return externalEmailLayout("Vielen Dank für die Anmeldung! 🎵", content);
}

function getCourseRegistrationAutoReplyHtml(vorname, courseName, kurszeit) {
  const kurszeitHtml = kurszeit
    ? `<p style="font-size: 16px; line-height: 1.6;">Dein gewünschtes Zeitfenster: <strong>${kurszeit}</strong></p>`
    : "";

  const content = `
    <p style="font-size: 16px; line-height: 1.6;">Hallo <strong>${vorname}</strong>,</p>
    <p style="font-size: 16px; line-height: 1.6;">
      ich habe deine Anmeldung für <strong>${courseName}</strong> erhalten. Ich freue mich wirklich sehr über dein Interesse!
    </p>
    ${kurszeitHtml}
    ${externalInfoBox(
      `
      <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.5;">Ich schaue mir direkt an, welche Plätze noch frei sind, und melde mich dann ganz bald persönlich mit allen weiteren Details bei dir zurück.</p>
      <p style="margin: 0; font-size: 14px; line-height: 1.5; color: ${STYLE.colors.lightText};"><em>Wichtiger Hinweis: Da die Plätze begrenzt sind, kann ich den Platz oder das gewünschte Zeitfenster leider nicht immer fest garantieren. Wenn der Kurs voll ist, ist er voll – aber ich schaue dann natürlich gerne mit dir gemeinsam nach einer guten Alternative!</em></p>
    `,
      "Wie geht es jetzt weiter?",
    )}
  `;

  return externalEmailLayout("Vielen Dank für die Anmeldung! 🎵", content);
}

// ============================================================================
// INTERNAL EMAILS (NOTIFICATIONS FOR ADMIN)
// ============================================================================

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

function getInternalCourseRegistrationHtml(data) {
  const headerHtml = internalHeader(
    "Neue Kursanmeldung",
    data.kurs,
    "#0ea5e9 0%, #0284c7 100%", // Blue gradient
    "#38bdf8", // Blue border
    "#e0f2fe", // Subtitle color
  );

  const kurszeitAlertHtml = data.kurszeit
    ? `
    <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
      <p style="margin: 0; color: #0369a1; font-size: 15px;"><strong>Gewünschte Kurszeit:</strong> ${data.kurszeit}</p>
    </div>
  `
    : "";

  const childSection = internalTableSection("Kursteilnehmer/in", [
    { label: "Name", value: `${data.kVorname} ${data.kNachname}` },
    { label: "Alter", value: data.alter || "-" },
  ]);

  const parentSection = internalTableSection("Gesetzliche/r Vertreter/in", [
    { label: "Name", value: `${data.vVorname} ${data.vNachname}` },
    { label: "Adresse", value: data.adresse },
    {
      label: "E-Mail",
      value: `<a href="mailto:${data.email}" style="color: #0ea5e9; text-decoration: none; font-weight: 500;">${data.email}</a>`,
    },
    {
      label: "Telefon",
      value: `<a href="tel:${data.telefon}" style="color: ${STYLE.colors.intVal}; text-decoration: none; font-weight: 500;">${data.telefon}</a>`,
    },
  ]);

  const msgContent = data.nachricht
    ? data.nachricht.replace(/\n/g, "<br>")
    : "Keine zusätzliche Nachricht hinterlassen.";
  const moreInfoSection = internalTableSection("Weitere Infos", [
    {
      label: "Medien-Erlaubnis",
      value: data.medien
        ? '<span style="color: #10b981;">✓ Ja erteilt</span>'
        : '<span style="color: #ef4444;">✗ Nein</span>',
    },
    {
      fullWidth: true,
      content: "Nachricht",
      padding: "12px 0 6px 0",
      style: `color: ${STYLE.colors.intLabel}; font-size: 14px;`,
    },
    {
      fullWidth: true,
      content: msgContent,
      padding: "15px",
      style: `background-color: ${STYLE.colors.intBgBody}; border-radius: 6px; color: ${STYLE.colors.intText}; line-height: 1.6; font-size: 15px; font-style: italic;`,
    },
  ]);

  const contentHtml = `
    ${kurszeitAlertHtml}
    ${childSection}
    ${parentSection}
    ${moreInfoSection}
  `;

  return internalEmailLayout(headerHtml, contentHtml);
}

function getInternalContactHtml(data) {
  const headerHtml = internalHeader(
    "Neue Kontaktanfrage",
    "kleine-musikschule.de",
    "#10b981 0%, #059669 100%", // Green gradient
    "#34d399", // Green border
    "#d1fae5", // Subtitle color
  );

  const senderSection = internalTableSection("Absender-Daten", [
    { label: "Name", value: data.name },
    {
      label: "E-Mail",
      value: `<a href="mailto:${data.email}" style="color: #10b981; text-decoration: none; font-weight: 500;">${data.email}</a>`,
    },
  ]);

  const locationSection = internalTableSection("Standort (Optional)", [
    {
      label: "Adresse / Ort",
      value: data.location || '<span style="color:#94a3b8; font-weight:normal;">Nicht angegeben</span>',
    },
    { label: "Koordinaten", value: `<span style="font-family: monospace;">${data.coordinates || "-"}</span>` },
  ]);

  const msgContent = data.message.replace(/\n/g, "<br>");
  const msgSection = internalTableSection("Nachricht", [
    {
      fullWidth: true,
      content: msgContent,
      padding: "20px",
      style: `background-color: ${STYLE.colors.intBgBody}; border-radius: 8px; color: ${STYLE.colors.intText}; line-height: 1.6; font-size: 15px; border-left: 4px solid #34d399; margin-top: 10px; display: block;`,
    },
  ]);

  const contentHtml = `
    ${senderSection}
    ${locationSection}
    ${msgSection}
  `;

  return internalEmailLayout(headerHtml, contentHtml);
}

module.exports = {
  getContactAutoReplyText,
  getContactAutoReplyHtml,
  getCourseRegistrationAutoReplyHtml,
  getLesPetitsAmisRegistrationAutoReplyHtml,
  getPfinztalRegistrationAutoReplyHtml,
  getInternalCourseRegistrationHtml,
  getInternalContactText,
  getInternalContactHtml,
};
