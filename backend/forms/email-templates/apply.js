module.exports = ({ data, readableData }) => {
  return {
    subject: "Founders and Coders Application",
    text: `Hi ${data.name},

Thank you for submitting an application to the autumn 2021 cohort of Founders and Coders. You can find a copy of your application below. Please remember you have until 23:59 BST on May 27 to complete all course requirements. We will send out invitations for interviews the week after applications close.

As a reminder, our programme now includes a part-time pre-apprenticeship programme for 12 weeks, starting on June 14. This means two evening commitments for 12 weeks, with additional time needed to self-study. We will unfortunately not accept you onto the programme if you cannot make this commitment. 

Please note we will contact everyone who's applied, so please do not email us until after May 31 if you haven’t received an email (or before checking your spam folder).

The interview dates will be June 2-4. 

If you need to edit your application, please email admissions@foundersandcoders.com with a copy of your application.

To stay most up to date with our communication with applicants, make sure you’ve joined our Discord community. 

Best wishes,

Founders and Coders Team



${readableData}`,
  };
};
