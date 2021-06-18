let nono = {
  apprenticeship: ["No, I am not eligible for an apprenticeship in the UK"],
  age: ["No, I am not over 18 years old"],
  residence: ["Elsewhere in the UK", "Outside the UK"],
};

module.exports = async ({ data, db, table }) => {
  if (nono.apprenticeship.includes(data["eligible-apprenticeship"])) {
    return { errorPage: "/error/apprenticeship/", shouldSave: true };
  }
  if (nono.age.includes(data["eligible-age"])) {
    return { errorPage: "/error/age/", shouldSave: true };
  }
  if (nono.residence.includes(data["residence"])) {
    return { errorPage: "/error/residence/", shouldSave: true };
  }
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
