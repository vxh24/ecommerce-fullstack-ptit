require("dotenv").config();
const asyncHandler = require("express-async-handler");
const { getReceiverSocketId, io } = require("../socket/socket");
const {
  findOrCreateConversation,
  createMessage,
  getMessagesFromConversation,
} = require("../services/messageService");

const sendMessageController = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const { _id: senderId } = req.user;

  const conversation = await findOrCreateConversation(senderId, receiverId);

  const newMessage = await createMessage(senderId, receiverId, message);

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  await Promise.all([conversation.save(), newMessage.save()]);

  //SOCKET IO
  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json(newMessage);
});

const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const { _id: userId } = req.user;

  const messages = await getMessagesFromConversation(userId, userToChatId);

  res.status(200).json(messages);
});

module.exports = { sendMessageController, getMessages };
