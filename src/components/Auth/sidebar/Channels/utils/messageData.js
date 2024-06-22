// MessageData.js

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
    {
      "messageId": "def456",
      "senderId": "user456",
      "senderName": "Bob",
      "timestamp": "2024-06-22T11:15:00Z",
      "message": "Hey there! What's up?",
      "chatId": "chat789",
      "status": "sent"
    },
    {
      "messageId": "ghi789",
      "senderId": "user123",
      "senderName": "Alice",
      "timestamp": "2024-06-22T12:00:00Z",
      "message": "😊 Sure thing!",
      "chatId": "chat456",
      "status": "sent"
    },
    {
      "messageId": "jkl012",
      "senderId": "user789",
      "senderName": "Charlie",
      "timestamp": "2024-06-22T12:30:00Z",
      "message": "Check out these photos from our trip!",
      "chatId": "chat123",
      "status": "delivered",
      "attachments": [
        {
          "type": "image",
          "url": "https://example.com/photo1.jpg"
        },
        {
          "type": "image",
          "url": "https://example.com/photo2.jpg"
        }
      ]
    },
    {
      "messageId": "mno345",
      "senderId": "user456",
      "senderName": "Bob",
      "timestamp": "2024-06-22T13:00:00Z",
      "message": "Here's the report for last quarter.",
      "chatId": "chat789",
      "status": "sent",
      "attachments": [
        {
          "type": "file",
          "url": "https://example.com/report.pdf",
          "filename": "quarterly_report.pdf",
          "size": "1.5 MB"
        }
      ]
    },
    {
      "messageId": "pqr678",
      "senderId": "user123",
      "senderName": "Alice",
      "timestamp": "2024-06-22T13:30:00Z",
      "message": "Check out this amazing video!",
      "chatId": "chat456",
      "status": "sent",
      "attachments": [
        {
          "type": "video",
          "url": "https://example.com/video.mp4",
          "duration": "2:30"
        }
      ]
    },
    {
      "messageId": "stu901",
      "senderId": "user789",
      "senderName": "Charlie",
      "timestamp": "2024-06-22T14:00:00Z",
      "message": "Let's meet here tomorrow!",
      "chatId": "chat123",
      "status": "sent",
      "attachments": [
        {
          "type": "location",
          "latitude": 37.7749,
          "longitude": -122.4194,
          "name": "San Francisco, CA"
        }
      ]
    },
    {
      "messageId": "vwx345",
      "senderId": "system",
      "senderName": "System",
      "timestamp": "2024-06-22T14:30:00Z",
      "message": "You have a new follower!",
      "chatId": "chat456",
      "status": "sent"
    },
    {
      "messageId": "yza678",
      "senderId": "user123",
      "senderName": "Alice",
      "timestamp": "2024-06-22T15:00:00Z",
      "message": "Check out this article: How to Write Better Messages.",
      "chatId": "chat789",
      "status": "sent",
      "attachments": [
        {
          "type": "link",
          "url": "https://example.com/article",
          "title": "How to Write Better Messages"
        }
      ]
    },
    {
      "messageId": "bcd901",
      "senderId": "user789",
      "senderName": "Charlie",
      "timestamp": "2024-06-22T15:30:00Z",
      "message": "That sounds great!",
      "chatId": "chat123",
      "status": "sent",
      "replyTo": {
        "messageId": "mno345",
        "senderId": "user456",
        "senderName": "Bob",
        "timestamp": "2024-06-22T13:00:00Z",
        "message": "Here's the report for last quarter."
      }
    },
    {
      "messageId": "efg567",
      "senderId": "user123",
      "senderName": "Alice",
      "timestamp": "2024-06-22T16:00:00Z",
      "message": "Which movie should we watch this weekend?",
      "chatId": "chat456",
      "status": "sent",
      "poll": {
        "question": "Which movie should we watch this weekend?",
        "options": [
          "Avengers: Endgame",
          "Spider-Man: No Way Home",
          "Black Widow"
        ]
      }
    }
  ];
  
  module.exports = MessageData;
  