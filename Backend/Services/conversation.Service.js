import Conversation from "../Models/conversation.model.js";

export const createConversation = async (userId) => {
  const conversation = await Conversation.create({
    user: userId,
  });

  return conversation;
};

export const getUserConversations = async (userId) => {
  return await Conversation.find({
    user: userId,
  })
    .sort({ updatedAt: -1 })
    .select("title createdAt updatedAt");
};

export const getConversation = async (
  conversationId,
  userId
) => {
  return await Conversation.findOne({
    _id: conversationId,
    user: userId,
  });
};

export const addMessage = async (
  conversationId,
  userId,
  role,
  content
) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    user: userId,
  });

  if (!conversation) {
    throw new Error("Conversation not found.");
  }

  conversation.messages.push({
    role,
    content,
  });

  await conversation.save();

  return conversation;
};