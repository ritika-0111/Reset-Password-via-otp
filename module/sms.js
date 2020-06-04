const accountSid = 'AC6cd9784fdd8dddc570d76e0967bbebba';
const authToken = 'dc3fdd66a227b8e4f4ec8836287bd488';
const client = require('twilio')(accountSid, authToken);


function sendSMS(body,to) {
  client.messages
    .create({
      body: body,
      from: '+12052559217',
      to: to
    })
    .then(message => console.log(message.sid));
};


module.exports = {
    send: sendSMS
};