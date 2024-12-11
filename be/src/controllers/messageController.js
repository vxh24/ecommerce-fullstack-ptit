require("dotenv").config();
const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { getReceiverSocketId, io } = require("../socket/socket");

const sendMessageController = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const { _id } = req.user;

  let conversation = await Conversation.findOne({
    participants: { $all: [_id, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [_id, receiverId],
    });
  }

  const newMessage = new Message({
    senderId: _id,
    receiverId,
    message,
  });

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
  const { _id } = req.user;

  const conversation = await Conversation.findOne({
    participants: { $all: [_id, userToChatId] },
  }).populate("messages");

  if (!conversation) return res.status(200).json([]);

  const messages = conversation.messages;

  res.status(200).json(messages);
});

module.exports = { sendMessageController, getMessages };
