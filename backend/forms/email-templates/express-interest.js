module.exports = ({ data, readableData }) => {
  return {
    subject: "Founders and Coders Expression of Interest",
    text: `Hi ${data.name},

Thank you for your interest in the Spring 2022 cohort of the Founders and Coders programme.

You can find out what we need you to do next on our website: https://foundersandcoders.com/apply/tribute-page/

Once you've completed these steps you'll go on the waiting list to join our Discord community. We admit people in batches during the application window, up to a maximum of 80 members. You can get started on the rest of our course requirements while you're waiting.

Best wishes,

Founders and Coders Team


You submitted:

${readableData}`,
  };
};
