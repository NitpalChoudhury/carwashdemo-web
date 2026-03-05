const ContactMessage = require("../models/ContactMessage");
const { sendTelegramContactAlert } = require("../utils/telegram");

const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());

const createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "name, email and message are required." });
    }

    if (!isEmailValid(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const contactMessage = await ContactMessage.create({
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      message: String(message).trim(),
    });

    // Notification is best-effort; contact save should not fail when Telegram is down.
    sendTelegramContactAlert({
      name: contactMessage.name,
      email: contactMessage.email,
      message: contactMessage.message,
    }).catch((error) => {
      console.error("Failed to send Telegram contact alert:", error.message);
    });

    return res.status(201).json({
      message: "Your message has been received. We will get back to you shortly.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to submit contact form." });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const contactMessages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json(contactMessages);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch contact messages." });
  }
};

const markContactMessageAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const contactMessage = await ContactMessage.findByIdAndUpdate(
      id,
      {
        status: "read",
        readAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!contactMessage) {
      return res.status(404).json({ message: "Contact message not found." });
    }

    return res.json(contactMessage);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update contact message." });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const contactMessage = await ContactMessage.findByIdAndDelete(id);

    if (!contactMessage) {
      return res.status(404).json({ message: "Contact message not found." });
    }

    return res.json({ message: "Contact message deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete contact message." });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  deleteContactMessage,
};
