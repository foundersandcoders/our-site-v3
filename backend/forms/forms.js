const qs = require("querystring");
const Airtable = require("airtable");
const email = require("./email");

const apiKey = process.env.AIRTABLE_KEY;

exports.handler = async function (event) {
  const { base, table, ...submission } = qs.parse(event.body);

  // have to loop through data to join arrays to strings
  // for multiple checkbox inputs etc
  let airtableData = {};
  let emailData = "Your application:\n\n";
  for (let [key, val] of Object.entries(submission)) {
    if (val) {
      const value = Array.isArray(val) ? val.join(", ") : val;
      airtableData[key] = value;
      emailData += `${key}: ${value}\n`;
    }
  }
  const db = new Airtable({ apiKey }).base(base);
  try {
    await db(table).create(airtableData);
    const text = `Hi ${airtableData.name},

Thank you for submitting an application to the autumn 2021 cohort of Founders and Coders. You can find a copy of your application below. Please remember you have until 23:59 BST on May 27 to complete all course requirements. We will send out invitations for interviews the week after applications close.

As a reminder, our programme now includes a part-time pre-apprenticeship programme for 12 weeks, starting on June 14. This means two evening commitments for 12 weeks, with additional time needed to self-study. We will unfortunately not accept you onto the programme if you cannot make this commitment. 

Please note we will contact everyone who's applied, so please do not email us until after May 31 if you haven’t received an email (or before checking your spam folder).

The interview dates will be June 2-4. 

If you need to edit your application, please email admissions@foundersandcoders.com with a copy of your application.

To stay most up to date with our communication with applicants, make sure you’ve joined our Discord community. 

Best wishes,

Founders and Coders Team



${emailData}`;
    await email({
      to: airtableData.email,
      subject: "Founders and Coders Application",
      text,
    });
    return {
      statusCode: 303,
      headers: {
        // all forms should have a nested success page
        location: event.headers.referer + "/success",
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 303,
      headers: {
        // all forms should have a nested success page
        location: event.headers.referer + "/error",
      },
    };
  }
};
