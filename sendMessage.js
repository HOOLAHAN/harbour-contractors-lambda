const sendMessage = require("./lib/sendMessage");

module.exports.sendMessage = async (event) => {
  const req = JSON.parse(event.body);
 
  const name = req.name;
  const email = req.email;
  const message = req.message;
  const data = await sendMessage(name, email, message);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        data: data,
        input: event,
        name: name,
        email: email,
        message: message
      },
      null,
      2
    ),
  };
};