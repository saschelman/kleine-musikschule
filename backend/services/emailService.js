const { Resend } = require("resend");
const path = require("path");
const fs = require("fs");

const resend = new Resend(process.env.RESEND_API_KEY);

const MAIL_TO = process.env.MAIL_TO;
const MAIL_FROM = process.env.MAIL_FROM || "Kleine Musikschule <onboarding@resend.dev>";
const MAIL_REPLY_TO = process.env.MAIL_REPLY_TO || MAIL_TO;

if (!MAIL_TO) {
  console.warn("[warn] MAIL_TO is not set. Contact emails cannot be delivered.");
}

async function sendEmailViaResend(mailOptions) {
  const sendPayload = {
    from: mailOptions.from || MAIL_FROM,
    to: mailOptions.to,
    subject: mailOptions.subject,
    html: mailOptions.html,
    text: mailOptions.text,
    reply_to: mailOptions.replyTo || MAIL_REPLY_TO,
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

function getIcsAttachment(icsFilePath, filename) {
  try {
    const fullPath = path.resolve(__dirname, "..", "..", icsFilePath);
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

module.exports = {
  sendEmailViaResend,
  getIcsAttachment,
  MAIL_TO,
  MAIL_FROM,
  MAIL_REPLY_TO,
};
