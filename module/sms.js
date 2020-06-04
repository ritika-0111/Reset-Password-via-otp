const accountSid = '*********************************';
const authToken = '**************************************';
const client = require('twilio')(accountSid, authToken);


function sendSMS(body,to) {
  client.messages
    .create({
      body: body,
      from: '+1**********',
      to: to
    })
    .then(message => console.log(message.sid));
};


module.exports = {
    send: sendSMS
};