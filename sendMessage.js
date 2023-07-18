const sendMessage = require("./lib/sendMessage");

module.exports.sendMessage = async (event) => {
  const req = JSON.parse(event.body);

  const name = req.name;
  const email = req.email;
  const text_message = req.text_message;
  try {
    await sendMessage(name, email, text_message);
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Message sent successfully',
          name: name,
          email: email,
          text_message: message
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Failed to send message',
          error: error.message
        },
        null,
        2
      ),
    };
  }
};