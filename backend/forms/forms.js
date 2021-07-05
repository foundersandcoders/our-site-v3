const qs = require("querystring");
const Airtable = require("airtable");
const fetch = require("node-fetch");
const email = require("./email");
const templates = require("./email-templates");
const validators = require("./validators");

const apiKey = process.env.AIRTABLE_KEY;
const discordUrl = process.env.DISCORD_WEBHOOK;

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
  try {
    const db = new Airtable({ apiKey }).base(base);

    // each form should have its own validator
    let {
      errorPage,
      shouldSave,
      linkedData = {},
      invalidData = {},
    } = validator ? await validator({ data, db, table }) : {};

    // store the submission
    // to avoid re-submissions avoiding the validation
    if (shouldSave) {
      if (linkedData.id) {
        await db(table).create({ ...data, link: [linkedData.id] });
      } else {
        await db(table).create(data);
      }
    }

    // if there was a problem redirect to the relevant error page
    if (errorPage) {
      await logToDiscord(
        filename,
        `**Validation failed**
\`\`\`json
${JSON.stringify(
  {
    type: errorPage,
    email: data.email,
    ...invalidData,
  },
  null,
  2
)}
\`\`\`
      `
      );
      return {
        statusCode: 303,
        headers: {
          location: event.headers.referer + errorPage,
        },
      };
    }

    if (process.env.NODE_ENV === "production") {
      const { subject, text } = template({
        data: { ...data, ...linkedData },
        readableData,
      });
      await email({
        to: data.email,
        subject,
        text,
      });
    }
    return {
      statusCode: 303,
      headers: {
        // all forms should have a nested success page
        location: event.headers.referer + "/success",
      },
    };
  } catch (error) {
    console.error(error);
    await logToDiscord(
      filename,
      `**Submission failed**
\`${error.message}\`
\`\`\`json
${JSON.stringify(error, null, 2)}
\`\`\`
      `
    );
    return {
      statusCode: 303,
      headers: {
        // all forms should have a nested success page
        location: event.headers.referer + "/error",
      },
    };
  }
};

function logToDiscord(filename, content) {
  fetch(discordUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username: `${filename} form`,
      content,
    }),
  }).catch((e) => {
    console.error(e);
  });
}
