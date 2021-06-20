module.exports = ({ data, readableData }) => {
  return {
    subject: "Founders and Coders Tribute Page Submission",
    text: `Hi ${data.name},

Thank you for submitting your tribute page. You can find a copy of your submission below.

Once we’ve had a chance to review your submission you’ll be added to our Discord waiting list. In the meantime we recommend you get started on the rest of our course requirements.

Best wishes,

Founders and Coders Team


Your submission:

${readableData}`,
  };
};
