const Telegram = require("../4.middleware/telegram_chat");
const chatID = "148932275";
const telegramMessage = (chatID, message) => {
  Telegram.bot.sendMessage(chatID, message);
};

module.exports = {telegramMessage, chatID};
