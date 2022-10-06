const nodemailer = require('nodemailer');

const mail = {
    user: 'SnorInn.2022@gmail.com',
    pass: 'tbyjjcwyzkkoodxe'
}

let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
        rejectUnauthorized: false
    },
   
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.pass, // generated ethereal password
    },
  });

  const sendEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: `SnorInn <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Welcome to SnorInn", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Something is wrong with the email', error);
    }
  }

  const getTemplate = (token) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h1>Thanks for your registration!<h1>

            <h2>To confirm your account, press the link below</h2>
            
            <a
                href="http://localhost:3002/confirm/${ token }"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
      `;
  }

  module.exports = {
    sendEmail,
    getTemplate
  }
