const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const validateMongodbId = require("../utils/validateMongodbId");

const findOrCreateConversation = async (userId, receiverId) => {
  validateMongodbId(userId);
  validateMongodbId(receiverId);

  let conversation = await Conversation.findOne({
    participants: { $all: [userId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [userId, receiverId],
    });
  }

  return conversation;
};

const createMessage = async (senderId, receiverId, message) => {
  validateMongodbId(senderId);
  validateMongodbId(receiverId);

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  return newMessage;
};

const getMessagesFromConversation = async (userId, userToChatId) => {
  validateMongodbId(userId);
  validateMongodbId(userToChatId);

  const conversation = await Conversation.findOne({
    participants: { $all: [userId, userToChatId] },
  }).populate("messages");

  return conversation ? conversation.messages : [];
};

module.exports = {
  findOrCreateConversation,
  createMessage,
  getMessagesFromConversation,
};
