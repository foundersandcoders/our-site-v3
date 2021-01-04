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
      text: "Thanks for your submission",
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
