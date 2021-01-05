const qs = require("querystring");
const Airtable = require("airtable");
const email = require("./email");

const apiKey = process.env.AIRTABLE_KEY;

exports.handler = async function (event) {
  const { base, table, ...data } = qs.parse(event.body);
  const db = new Airtable({ apiKey }).base(base);
  try {
    await db(table).create(data);
    let applicationCopy = "Your application:\n\n";
    for (let [key, val] of Object.entries(data)) {
      if (val) {
        const value = Array.isArray(val) ? val.join(", ") : val;
        applicationCopy += `${key}: ${value}\n`;
      }
    }
    const text = `Hi ${data.name},

Thank you for submitting an application to the spring 2021 cohort of Founders and Coders. You can find a copy of your application below. Please remember you have until 23:59 GMT on January 10 to complete all course requirements. We will send out invitations for interviews the week after applications close.

Please note we will contact everyone who's applied, so please do not email us until after January 16 if you haven’t received an email (or before checking your spam folder).

If you need to edit your application, please email admissions@foundersandcoders.com with a copy of your application.

To stay most up to date with our communication with applicants, make sure to check our Slack community.

Best wishes,

Founders and Coders Team

${applicationCopy}`;
    await email({
      to: data.email,
      subject: "Founders and Coders Application",
      text,
    });
    return {
      statusCode: 303,
      headers: {
        location: "/",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
