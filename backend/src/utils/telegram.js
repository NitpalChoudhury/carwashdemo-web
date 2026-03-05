const TELEGRAM_BASE_URL = "https://api.telegram.org";

const escapeTelegram = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const sendTelegramContactAlert = async ({ name, email, message }) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return { sent: false, skipped: true, reason: "telegram_not_configured" };
  }

  const text = [
    "<b>New Contact Form Message</b>",
    "",
    `<b>Name:</b> ${escapeTelegram(name)}`,
    `<b>Email:</b> ${escapeTelegram(email)}`,
    `<b>Message:</b> ${escapeTelegram(message)}`,
  ].join("\n");

  const response = await fetch(`${TELEGRAM_BASE_URL}/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram API request failed with status ${response.status}`);
  }

  return { sent: true };
};

module.exports = {
  sendTelegramContactAlert,
};
