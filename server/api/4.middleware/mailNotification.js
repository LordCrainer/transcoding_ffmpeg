const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
  auth: {
    user: "carlosgarcia.cagm@gmail.com",
    pass: "Carlosolrac3011"
  },
  auth: {
    type: 'OAuth2',
    user: 'carlosgarcia.cagm@gmail.com',
    clientId: '82158887426-9gra6e10gf2p9o852oa8q46b8b3prr5l.apps.googleusercontent.com',
    clientSecret: '_w_ouIMzS4sCJtjibO2M-Wzk',
    refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
    accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
    expires: 1484314697598
},
  //authMethod:'NTLM',
  //secure:false,
  tls: {
    rejectUnauthorized: false
  },
  debug: true
});

module.exports.mailMensaje = async (
  remitente,
  destinatario,
  asunto,
  html,
  conCopia
) => {
  await transporter
    .sendMail({
      from: remitente, // sender address 👻
      to: destinatario, // list of receivers
      subject: asunto, // Subject line
      text: "Texto en plano", // plain text body
      html: html, // html body,
      cc: conCopia
    })
    .then(exito => console.log("Exito_Mail: ", exito))
    .catch(error => console.log("Error_Mail: ", error));
};
