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
  return `
    <html>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://kleine-musikschule.de/images/logo_small.png" alt="Kleine Musikschule Karlsruhe" style="max-width: 120px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">Wir haben deine Nachricht erhalten! 🎵</h1>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">Hallo <strong>${name}</strong>,</p>
          <p style="font-size: 16px; line-height: 1.6;">
            vielen Dank für deine Nachricht an die kleine Musikschule Karlsruhe.
          </p>
          <div style="background-color: #f8fbfa; border-left: 4px solid #9bf1ff; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; font-size: 15px; line-height: 1.5; color: #333;">Wir werden dein Anliegen so schnell wie möglich bearbeiten und melden uns in Kürze persönlich bei dir zurück.</p>
          </div>
          <div style="margin-top: 25px; margin-bottom: 25px;">
            <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0; color: #333;">
              Ganz herzliche musikalische Grüße,<br>
              <strong style="color: #2c3e50;">Alexander Flöter</strong><br>
              <span style="color: #666; font-size: 14px;">Kleine Musikschule Karlsruhe</span>
            </p>
            <img src="https://kleine-musikschule.de/images/IMG_2963-2.jpg" alt="Alexander Flöter" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #9bf1ff; display: block;">
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px;">
          <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            Dies ist eine automatisch generierte E-Mail. Bitte antworte nicht direkt auf diese Nachricht, sondern schreibe bei Fragen an <a href="mailto:alex@kleine-musikschule.de" style="color: #999;">alex@kleine-musikschule.de</a>.
          </p>
        </div>
      </body>
    </html>
  `;
}

function getLesPetitsAmisRegistrationAutoReplyHtml(kVorname, vVorname, courseName) {
  return `
    <html>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://kleine-musikschule.de/images/logo_small.png" alt="Kleine Musikschule Karlsruhe" style="max-width: 120px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">Vielen Dank für die Anmeldung! 🎵</h1>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">Hallo <strong>${kVorname}</strong> und <strong>${vVorname}</strong>,</p>
          <p style="font-size: 16px; line-height: 1.6;">
            ich habe eure Anmeldung für den <strong>Musikkurs für Kinder (Les Petits Amis)</strong> erhalten. Ich freue mich wirklich sehr über das Interesse!
          </p>
          <div style="background-color: #f8fbfa; border-left: 4px solid #9bf1ff; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <h3 style="margin-top: 0; color: #2c3e50; font-size: 16px;">Die Termine im Überblick</h3>
            <ul style="margin: 10px 0; padding-left: 20px; font-size: 15px; line-height: 1.5; color: #333;">
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
            <p style="margin-top: 15px; font-size: 14px; color: #666;">📅 <em>Die Termine findest du auch als iCal-Datei im Anhang dieser E-Mail – einfach öffnen und im Kalender speichern!</em></p>
          </div>
          <div style="margin-top: 25px; margin-bottom: 25px;">
            <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0; color: #333;">
              Ganz herzliche musikalische Grüße,<br>
              <strong style="color: #2c3e50;">Alexander Flöter</strong><br>
              <span style="color: #666; font-size: 14px;">Kleine Musikschule Karlsruhe</span>
            </p>
            <img src="https://kleine-musikschule.de/images/IMG_2963-2.jpg" alt="Alexander Flöter" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #9bf1ff; display: block;">
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px;">
          <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            Dies ist eine automatisch generierte E-Mail. Bitte antworte nicht direkt auf diese Nachricht, sondern schreibe bei Fragen an <a href="mailto:alex@kleine-musikschule.de" style="color: #999;">alex@kleine-musikschule.de</a>.
          </p>
        </div>
      </body>
    </html>
  `;
}

function getPfinztalRegistrationAutoReplyHtml(kVorname, vVorname, courseName, kurszeit) {
  const kurszeitHtml = kurszeit
    ? `<p style="font-size: 16px; line-height: 1.6; margin-bottom: 10px;">Ausgewählte Kurszeit: <strong>${kurszeit}</strong></p>`
    : "";

  return `
    <html>
      <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f6; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 8px 20px rgba(0,0,0,0.05);">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="https://kleine-musikschule.de/images/logo_small.png" alt="Kleine Musikschule Karlsruhe" style="max-width: 120px; height: auto; margin-bottom: 20px;">
            <h1 style="color: #2c3e50; margin: 0; font-size: 24px;">Vielen Dank für die Anmeldung! 🎵</h1>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">Hallo <strong>${kVorname}</strong> und <strong>${vVorname}</strong>,</p>
          <p style="font-size: 16px; line-height: 1.6;">
            ich habe eure Anmeldung für den <strong>Musikkurs für Kinder (Pfinztal)</strong> erhalten. Ich freue mich wirklich sehr über das Interesse!
          </p>
          ${kurszeitHtml}
          <div style="background-color: #f8fbfa; border-left: 4px solid #9bf1ff; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <h3 style="margin-top: 0; color: #2c3e50; font-size: 16px;">Die Termine im Überblick</h3>
            <ul style="margin: 10px 0; padding-left: 20px; font-size: 15px; line-height: 1.5; color: #333;">
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
            <p style="margin-top: 15px; font-size: 14px; color: #666;">📅 <em>Die Termine findest du auch als iCal-Datei im Anhang dieser E-Mail – einfach öffnen und im Kalender speichern!</em></p>
          </div>
          <div style="margin-top: 25px; margin-bottom: 25px;">
            <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0; color: #333;">
              Ganz herzliche musikalische Grüße,<br>
              <strong style="color: #2c3e50;">Alexander Flöter</strong><br>
              <span style="color: #666; font-size: 14px;">Kleine Musikschule Karlsruhe</span>
            </p>
            <img src="https://kleine-musikschule.de/images/IMG_2963-2.jpg" alt="Alexander Flöter" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid #9bf1ff; display: block;">
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px;">
          <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            Dies ist eine automatisch generierte E-Mail. Bitte antworte nicht direkt auf diese Nachricht, sondern schreibe bei Fragen an <a href="mailto:alex@kleine-musikschule.de" style="color: #999;">alex@kleine-musikschule.de</a>.
          </p>
        </div>
      </body>
    </html>
  `;
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
          <table border="0" cellpadding="0" cellspacing="0" style="margin-top: 25px; margin-bottom: 25px;">
            <tr>
              <td style="padding-right: 15px; vertical-align: middle;">
                <img src="https://kleine-musikschule.de/images/IMG_2963-2.jpg" alt="Alexander Flöter" style="width: 55px; height: 55px; border-radius: 50%; object-fit: cover; border: 2px solid #9bf1ff;">
              </td>
              <td style="vertical-align: middle;">
                <p style="font-size: 15px; line-height: 1.4; margin: 0; color: #333;">Ganz herzliche musikalische Grüße,</p>
                <p style="font-size: 15px; line-height: 1.4; margin: 4px 0 0 0; color: #2c3e50;"><strong>Alexander Flöter</strong><br><span style="color: #666; font-size: 13px;">Kleine Musikschule Karlsruhe</span></p>
              </td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0 20px;">
          <p style="font-size: 12px; color: #999; text-align: center; margin: 0;">
            Dies ist eine automatisch generierte E-Mail. Bitte antworte nicht direkt auf diese Nachricht, sondern schreibe bei Fragen an <a href="mailto:alex@kleine-musikschule.de" style="color: #999;">alex@kleine-musikschule.de</a>.
          </p>
        </div>
      </body>
    </html>
  `;
}

function getInternalCourseRegistrationHtml(data) {
  return `
    <html>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 20px; color: #334155; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); overflow: hidden;">
          
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 30px 20px; text-align: center; border-bottom: 4px solid #38bdf8;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">Neue Kursanmeldung</h1>
            <p style="color: #e0f2fe; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">${data.kurs}</p>
          </div>

          <div style="padding: 30px;">
            ${data.kurszeit ? `
            <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px 20px; margin-bottom: 25px; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #0369a1; font-size: 15px;"><strong>Gewünschte Kurszeit:</strong> ${data.kurszeit}</p>
            </div>
            ` : ''}

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td colspan="2" style="padding: 0 0 10px 0; border-bottom: 2px solid #e2e8f0;">
                  <h3 style="color: #0f172a; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">Kursteilnehmer/in</h3>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; width: 40%; color: #64748b; font-size: 14px;">Name</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 500;">${data.kVorname} ${data.kNachname}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Alter</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 500; border-top: 1px solid #f1f5f9;">${data.alter || '-'}</td>
              </tr>
            </table>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td colspan="2" style="padding: 0 0 10px 0; border-bottom: 2px solid #e2e8f0;">
                  <h3 style="color: #0f172a; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">Gesetzliche/r Vertreter/in</h3>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; width: 40%; color: #64748b; font-size: 14px;">Name</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 500;">${data.vVorname} ${data.vNachname}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Adresse</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 500; border-top: 1px solid #f1f5f9;">${data.adresse}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">E-Mail</td>
                <td style="padding: 12px 0; border-top: 1px solid #f1f5f9;"><a href="mailto:${data.email}" style="color: #0ea5e9; text-decoration: none; font-weight: 500;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Telefon</td>
                <td style="padding: 12px 0; border-top: 1px solid #f1f5f9;"><a href="tel:${data.telefon}" style="color: #1e293b; text-decoration: none; font-weight: 500;">${data.telefon}</a></td>
              </tr>
            </table>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td colspan="2" style="padding: 0 0 10px 0; border-bottom: 2px solid #e2e8f0;">
                  <h3 style="color: #0f172a; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">Weitere Infos</h3>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; width: 40%; color: #64748b; font-size: 14px;">Medien-Erlaubnis</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 500;">
                  ${data.medien ? '<span style="color: #10b981;">✓ Ja erteilt</span>' : '<span style="color: #ef4444;">✗ Nein</span>'}
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 12px 0 6px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Nachricht</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 15px; background-color: #f8fafc; border-radius: 6px; color: #334155; line-height: 1.6; font-size: 15px; font-style: italic;">
                  ${data.nachricht ? data.nachricht.replace(/\n/g, "<br>") : "Keine zusätzliche Nachricht hinterlassen."}
                </td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
              Kleine Musikschule Karlsruhe &mdash; Automatisierte Benachrichtigung
            </p>
          </div>
        </div>
      </body>
    </html>
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
    <html>
      <body style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 20px; color: #334155; margin: 0;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); overflow: hidden;">
          
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px 20px; text-align: center; border-bottom: 4px solid #34d399;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.025em;">Neue Kontaktanfrage</h1>
            <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 16px; font-weight: 500;">kleine-musikschule.de</p>
          </div>

          <div style="padding: 30px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td colspan="2" style="padding: 0 0 10px 0; border-bottom: 2px solid #e2e8f0;">
                  <h3 style="color: #0f172a; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">Absender-Daten</h3>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; width: 40%; color: #64748b; font-size: 14px;">Name</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 500;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">E-Mail</td>
                <td style="padding: 12px 0; border-top: 1px solid #f1f5f9;"><a href="mailto:${data.email}" style="color: #10b981; text-decoration: none; font-weight: 500;">${data.email}</a></td>
              </tr>
            </table>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
              <tr>
                <td colspan="2" style="padding: 0 0 10px 0; border-bottom: 2px solid #e2e8f0;">
                  <h3 style="color: #0f172a; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">Standort (Optional)</h3>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; width: 40%; color: #64748b; font-size: 14px;">Adresse / Ort</td>
                <td style="padding: 12px 0; color: #1e293b; font-weight: 500;">${data.location || '<span style="color:#94a3b8; font-weight:normal;">Nicht angegeben</span>'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #64748b; font-size: 14px; border-top: 1px solid #f1f5f9;">Koordinaten</td>
                <td style="padding: 12px 0; color: #64748b; font-size: 13px; border-top: 1px solid #f1f5f9; font-family: monospace;">${data.coordinates || '-'}</td>
              </tr>
            </table>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td colspan="2" style="padding: 0 0 10px 0; border-bottom: 2px solid #e2e8f0;">
                  <h3 style="color: #0f172a; margin: 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.05em;">Nachricht</h3>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 20px; background-color: #f8fafc; border-radius: 8px; color: #334155; line-height: 1.6; font-size: 15px; border-left: 4px solid #34d399; margin-top: 10px; display: block;">
                  ${data.message.replace(/\n/g, "<br>")}
                </td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
              Kleine Musikschule Karlsruhe &mdash; Automatisierte Benachrichtigung
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
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
