const { getByEmail } = require("../utils.js");

module.exports = async ({ data, db, table }) => {
  let existing = await getByEmail(db(table), data.email, ["email"]);
  if (existing) {
    return { errorPage: "/error/duplicate/", shouldSave: false };
  }

  let eoi = await getByEmail(db("EOI"), data.email, ["email", "name"]);
  if (!eoi) {
    return { errorPage: "/error/missing-eoi/", shouldSave: false };
  }

  return { shouldSave: true, linkedData: { id: eoi.id, ...eoi.fields } };
};
