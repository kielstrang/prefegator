const api_key = 'key-1c57698d55d52c419c202f262c298b1f';
const domain = 'sandboxfda9ff4542624253b7a83c9aa1be02e1.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function sendCreateEmail(email, name, url) {
  const data = {
    from: 'Prefegator <prefegator@samples.mailgun.org>',
    to: email,
    subject: 'New Poll Created',
    text: `Your new poll, ${name}, has been created.\n
    Vote at www.prefegator.com/polls/${url}\n
    See results at www.prefegator.com/polls/${url}/results`
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

function sendVoteEmail(email, name, url) {
  const data = {
    from: 'Prefegator <prefegator@samples.mailgun.org>',
    to: email,
    subject: 'Vote Received!',
    text: `New vote received on your poll, ${name}\n
    See results at www.prefegator.com/polls/${url}/results`
  };
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = { sendCreateEmail, sendVoteEmail };