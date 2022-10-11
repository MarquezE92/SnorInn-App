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


//-----------------------------------  ENVÍOS DE MAIL PARA USERS  ----------------------------------

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
            >Confirm Account</a>
        </div>
      `;
  }

    const getTemplateR = (token) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h1>You asked for a password reset<h1>
            
            <h2>To reset your password, click the link below</h2>
            
            <a
                href="http://localhost:3002/reset/${token}"
                target="_blank"
            >Reset</a>
            <h2>And we will send you a mail with a new password</h2>

            <br>
            <h2>If you no longer want to reset your password, ignore this email</h2>
        </div>
      `;
  }

    const sendRecoverEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: `SnorInn <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "SnorInn recovering password service", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Something is wrong with the email', error);
    }
  };

    const getTemplatePass = (newPass) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h1>Here is your new password!<h1>

            <h2>For security reasons, we recommend that you change it once you log in</h2>
            
            <h3>Password: ${newPass}</h3>
        </div>
      `;
  };

    const sendNewPasswordEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: `SnorInn <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "SnorInn recovering password service", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Something is wrong with the email', error);
    }
  };

   const getTemplatePayment = (url) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h1>Excellent choice!! <h1>

            <h2>Thanks for choosing SnorInn to take care of your snoring.</h2>
            
            <h2>To see your receipt, click the link below</h2>
            <a
                href=${url}
                target="_blank"
            >Receipt</a>
        </div>
      `;
  };

  const sendEmailReceipt = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: `SnorInn <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "SnorInn reservation receipt", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Something is wrong with the email', error);
    }
  };

  //-----------------------------------  ENVÍOS DE MAIL PARA ADMINS  ----------------------------------

const getTemplateAdmin = (token) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h1>Thanks for joining Snor Inn!<h1>

            <h2>To confirm your account, press the link below</h2>
            
            <a
                href="http://localhost:3002/confirma/${ token }"
                target="_blank"
            >Confirm Account</a>
        </div>
      `;
  };

  const getTemplateRadmin = (token) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <h1>You asked for a password reset<h1>
            
            <h2>To reset your password, click the link below</h2>
            
            <a
                href="http://localhost:3002/reseta/${token}"
                target="_blank"
            >Reset</a>
            <h2>And we will send you a mail with a new password</h2>

            <br>
            <h2>If you no longer want to reset your password, ignore this email</h2>
        </div>
      `;
  }





  module.exports = {
    sendEmail,
    getTemplate,
    sendRecoverEmail,
    getTemplateR,
    getTemplatePass,
    sendNewPasswordEmail,
    getTemplatePayment,
    sendEmailReceipt,
    getTemplateAdmin,
    getTemplateRadmin,
  }
