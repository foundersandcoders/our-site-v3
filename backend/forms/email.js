const nodemailer = require("nodemailer");

const { GMAIL_CLIENT_ID, GMAIL_PRIVATE_KEY } = process.env;
// this is stored as base64 cause Netlify can't cope wth linebreaks etc
// have to decode it before we can use
const PRIVATE_KEY = Buffer.from(GMAIL_PRIVATE_KEY, "base64").toString();

const from = "admissions@foundersandcoders.com";

async function email({ to, subject, text }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: from,
      serviceClient: GMAIL_CLIENT_ID,
      privateKey: PRIVATE_KEY,
    },
  });
  await transporter.verify();
  await transporter.sendMail({
    from,
    to,
    subject,
    text,
  });
}

module.exports = email;
