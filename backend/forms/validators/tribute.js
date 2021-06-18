module.exports = async ({ data, db, table }) => {
  let existing = await getByEmail(db(table), data.email);
  if (existing) {
    return { errorPage: "/error/duplicate/", shouldSave: false };
  }

  let eoi = await getByEmail(db("EOI"), data.email);
  if (!eoi) {
    return { errorPage: "/error/missing-eoi/", shouldSaveL: false };
  }

  return { shouldSave: true };
};

async function getByEmail(client, email) {
  let records = await client
    .select({
      fields: ["email"],
    })
    .all();
  return records.find((record) => record.fields.email === email);
}
