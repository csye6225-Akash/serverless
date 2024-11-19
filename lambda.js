
//  const mailgun = require('mailgun-js');
 
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY, // Your Mailgun API key
//   domain: process.env.MAILGUN_DOMAIN, // Your Mailgun domain
// });
 
// exports.handler = async (event) => {
//   try {
//     const message = JSON.parse(event.Records[0].Sns.Message);
//     const { email, verificationToken } = message;
 
//     const verificationLink = `http://dev.akashchhabria.me/v1/verify?user=${encodeURIComponent(
//       email
//     )}&token=${verificationToken}`;
 
//     const emailData = {
//       from: 'no-reply@dev.akashchhabria.me', // Hardcoded sender email
//       to: email,
//       subject: 'Verify Your Email',
//       text: `Please verify your email by clicking the following link: ${verificationLink}`,
//     };
 
//     await mg.messages().send(emailData);
//     console.log(`Verification email sent to ${email}`);
//   } catch (error) {
//     console.error(`Error in Lambda function: ${error.message}`);
//     throw new Error(`Failed to send verification email: ${error.message}`);
//   }
// };

const mailgun = require('mailgun-js');

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY, // Your Mailgun API key
  domain: process.env.MAILGUN_DOMAIN, // Your Mailgun domain
});

exports.handler = async (event) => {
  try {
    const message = JSON.parse(event.Records[0].Sns.Message);
    const { email, verificationToken } = message;

    const BASE_URL = process.env.BASE_URL || 'http://demo.akashchhabria.me';
    const verificationLink = `${BASE_URL}/v1/verify?user=${encodeURIComponent(
      email
    )}&token=${verificationToken}`;

    const emailData = {
      from: 'no-reply@demo.akashchhabria.me', // Sender email
      to: email,
      subject: 'Verify Your Email',
      text: `Please verify your email by clicking the following link: ${verificationLink}`,
    };

    await mg.messages().send(emailData);

    console.log(
      JSON.stringify({
        email,
        verificationLink,
        status: 'Verification email sent',
        timestamp: new Date().toISOString(),
      })
    );
  } catch (error) {
    console.error(`Error in Lambda function: ${error.message}`);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

 

 
 