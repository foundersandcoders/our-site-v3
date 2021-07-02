let nono = {
  apprenticeship: ["No, I am not eligible for an apprenticeship in the UK"],
  age: ["No, I am not over 18 years old"],
  residence: ["Elsewhere in the UK", "Outside the UK"],
};

module.exports = async ({ data, db, table }) => {
  let eligibleApprenticeship = data["eligible-apprenticeship"];
  if (nono.apprenticeship.includes(eligibleApprenticeship)) {
    return {
      errorPage: "/error/apprenticeship/",
      shouldSave: true,
      invalidData: { "eligible-apprenticeship": eligibleApprenticeship },
    };
  }
  let eligibleAge = data["eligible-age"];
  if (nono.age.includes(eligibleAge)) {
    return {
      errorPage: "/error/age/",
      shouldSave: true,
      invalidData: { "eligible-age": eligibleAge },
    };
  }
  let residence = data["residence"];
  if (nono.residence.includes(residence)) {
    return {
      errorPage: "/error/residence/",
      shouldSave: true,
      invalidData: { residence },
    };
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
  return { shouldSave: true };
};
