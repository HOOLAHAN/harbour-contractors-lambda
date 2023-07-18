require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const number = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

function sendMessage(name, email, message) {
  client.messages
    .create({
      body: `From ${name} (${email}) : ${message}`,
      from: number,
      to: '+447300220551'
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error(error));
}

sendMessage('Name', 'example@example.com', 'Example message');


// module.exports = sendMessage;
