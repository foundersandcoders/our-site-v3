module.exports = async ({ data, db, table }) => {
  let existing = await getByEmail(db(table), data.email, ["email"]);
  if (existing) {
    return { errorPage: "/error/duplicate/", shouldSave: false };
  }

  let eoi = await getByEmail(db("EOI"), data.email, ["email", "name"]);
  if (!eoi) {
    return { errorPage: "/error/missing-eoi/", shouldSaveL: false };
  }

  return { shouldSave: true, linkedData: { id: eoi.id, ...eoi.fields } };
};

async function getByEmail(client, email, fields) {
  let records = await client
    .select({
      fields,
    })
    .all();
  return records.find((record) => record.fields.email === email);
}
