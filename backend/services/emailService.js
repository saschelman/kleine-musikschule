const { Resend } = require("resend");
const path = require("path");
const fs = require("fs");

// Lazy initialization: The client is only created on the first email send,
// not at module load time. This prevents a startup crash if RESEND_API_KEY
// is not yet set in the local .env file.
let _resendClient = null;

function getResendClient() {
  if (!_resendClient) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("[emailService] RESEND_API_KEY is not set in environment variables.");
    }
    _resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return _resendClient;
}

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

  const { data, error } = await getResendClient().emails.send(sendPayload);

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
