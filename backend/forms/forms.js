const Airtable = require("airtable");

const apiKey = process.env.AIRTABLE_KEY;

exports.handler = async function (event) {
  const { base, table, ...data } = event.queryStringParameters;

  const db = new Airtable({ apiKey }).base(base);

  // const { API_SECRET = 'shiba' } = process.env
  // console.log({ name, email, eligibility, topic, base });
  try {
    const result = await db(table).create(data);
    console.log(result);
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
