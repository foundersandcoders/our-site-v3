const Airtable = require("airtable");
const email = require("./email");

const apiKey = process.env.AIRTABLE_KEY;

exports.handler = async function (event) {
  const { base, table, ...data } = event.queryStringParameters;

  const db = new Airtable({ apiKey }).base(base);
  try {
    await db(table).create(data);
    await email({
      to: data.email,
      subject: "Founders and Coders Application",
      text: `Hi ${data.name}, 

Thank you for submitting an application to the spring 2021 cohort of Founders and Coders. Please remember you have until 23:59 GMT on January 10th to complete all course requirements. We will send out invitation for interviews the week after application closes. Please note we will contact everyone who's applied, so please do not email us before checking your spam folder.

To stay most up to date with all application news, make sure you're in our Slack community. 

Best wishes,

Founders and Coders Team`,
    });
    return {
      statusCode: 200,
      body: "Done",
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error.message,
    };
  }
};
