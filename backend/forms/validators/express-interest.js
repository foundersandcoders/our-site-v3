let nono = {
  apprenticeship: ["No, I am not eligible for an apprenticeship in the UK"],
  age: ["No, I am not over 18 years old"],
  residence: ["Elsewhere in the UK", "Outside the UK"],
};

module.exports = async ({ data, db, table }) => {
  if (nono.apprenticeship.includes(data["eligible-apprenticeship"])) {
    return "/error/apprenticeship/";
  }
  if (nono.age.includes(data["eligible-age"])) {
    return "/error/age/";
  }
  if (nono.residence.includes(data["residence"])) {
    return "/error/residence/";
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
    return "/error/duplicate/";
  }
  return false;
};
