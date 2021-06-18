module.exports = async ({ data, db, table }) => {
  let prevEmails = await db(table)
    .select({
      fields: ["email"],
    })
    .all();
  let existing = prevEmails.find(
    (record) => record.fields.email === data.email
  );
  if (existing) {
    return { errorPage: "/error/duplicate/", shouldSave: false };
  }
  return false;
};
