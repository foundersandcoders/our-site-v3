const qs = require("querystring");
const Airtable = require("airtable");
const email = require("./email");
const templates = require("./email-templates");
const validators = require("./validators");

const apiKey = process.env.AIRTABLE_KEY;

exports.handler = async function (event) {
  const { base, table, ...submission } = qs.parse(event.body);
  const referer = new URL(event.headers.referer);
  const filename = referer.pathname.replace("/forms/", "").replace("/", "");
  const template = templates[filename];
  const validator = validators[filename];
  // have to loop through data to join arrays to strings
  // for multiple checkbox inputs etc
  let data = {};
  let readableData = "";
  for (let [key, val] of Object.entries(submission)) {
    if (val) {
      const value = Array.isArray(val) ? val.join(", ") : val;
      data[key] = value;
      readableData += `${key}: ${value}\n`;
    }
  }
  const db = new Airtable({ apiKey }).base(base);
  // each form should have its own validator
  if (validator) {
    const errorPage = await validator({ data, db, table });
    if (errorPage) {
      // if there was a problem redirect to the relevant error page
      return {
        statusCode: 303,
        headers: {
          location: event.headers.referer + errorPage,
        },
      };
    }
  }
  try {
    await db(table).create(data);
    const { subject, text } = template({ data, readableData });
    await email({
      to: data.email,
      subject,
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
