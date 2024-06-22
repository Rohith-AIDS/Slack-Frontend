const MessageData = [
  {
      "messageId": "abc123",
      "senderId": "user123",
      "senderName": "Alice",
      "timestamp": "2024-06-22T10:00:00Z",
      "message": "Hello, how are you?",
      "chatId": "chat456",
      "status": "sent"
  },
  // Other initial messages...
];
// src/components/Auth/sidebar/Chat/utils/messageData.js

const getMessageData = (channelName) => {
  const storedMessages = localStorage.getItem(`messages_${channelName}`);
  return storedMessages ? JSON.parse(storedMessages) : [];
};

const setMessageData = (channelName, messages) => {
  localStorage.setItem(`messages_${channelName}`, JSON.stringify(messages));
};

export { getMessageData, setMessageData };

