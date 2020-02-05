const { mailMensaje } = require("../4.middleware/mailNotification");

/* const mailMensaje = (remitente, destinatario, asunto, html, conCopia) => {
  transporter.sendMail({
    from: remitente, // sender address 👻
    to: destinatario, // list of receivers
    subject: asunto, // Subject line
    text: "Texto en plano", // plain text body
    html: html, // html body,
    cc: conCopia
  });
  //return sendMail;
}; */

module.exports = mailMensaje;
