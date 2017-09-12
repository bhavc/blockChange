var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bhavdip.dev@gmail.com',
    pass: '!3Hj.e.n'
  }
});

var mailOptions = {
  from: 'bhavdip.dev@gmail.com',
  to: 'bhavdip.dev@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
