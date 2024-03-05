// ./lib/sendMessage.js

require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const number = process.env.TWILIO_PHONE_NUMBER;
const HCnumber = process.env.HC_PHONE_NUMBER;

const client = require('twilio')(accountSid, authToken);

async function sendMessage(name, email, text_message) {
  try {
    const message = await client.messages.create({
      body: `Message from ${name} (${email}) : ${text_message}`,
      from: number,
      to: HCnumber,
    });
    console.log('Twilio Response:', message.sid);
  } catch (error) {
    console.error('Twilio Error:', error);
    throw error;
  }
}

module.exports = sendMessage;
