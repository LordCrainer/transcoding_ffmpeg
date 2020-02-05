const telegramBot = require('node-telegram-bot-api');
const token_Tele = "1024055573:AAF-vPCIFtMpqivvEr2uUW7AFw05oJExpBk";
const bot = new telegramBot(token_Tele, {
  polling: true
});

bot.onText(/^\/start/, function(msg) {
  console.log("MENSAJE: ", msg.text);
  var chatId = msg.chat.id;
  var username = msg.from.username;
  var firstName = msg.from.first_name;
  console.log("DATA: ", chatId, ' ', username, ' ', firstName);

  bot.sendMessage(chatId, `Hola,  ${firstName} soy un bot y mi nombre es LNTV_BOT`)
})
bot.on('message', function(msg) {

  var Hola = "hola bot";
  var Gracias = "gracias"
  var firstnameuser = msg.from.first_name;
  if (msg.text.toString().toLowerCase().includes(Gracias)) {
      console.log("MENSAJE: ", msg.text);
    bot.sendMessage(msg.chat.id, "De nada, " + firstnameuser);
  }
  if (msg.text.toString().toLowerCase().includes(Hola)) {
      console.log("MENSAJE: ", msg.text);
    bot.sendMessage(msg.chat.id, "Hola " + firstnameuser + ", como estás? ");
  }

});

module.exports.bot = bot;
