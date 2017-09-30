const api_key = 'key-1c57698d55d52c419c202f262c298b1f';
const domain = 'sandboxfda9ff4542624253b7a83c9aa1be02e1.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function sendCreateEmail(email) {
  const data = {
    from: 'Prefegator <prefegator@samples.mailgun.org>',
    to: email,
    subject: 'New Poll Created',
    text: 'Testing some Mailgun awesomness!'
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

function sendVoteEmail(email) {
  const data = {
    from: 'Prefegator <prefegator@samples.mailgun.org>',
    to: email,
    subject: 'Vote Recieved!',
    text: 'Testing some Mailgun awesomness!'
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = { sendCreateEmail, sendVoteEmail };