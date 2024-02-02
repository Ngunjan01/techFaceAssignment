// ChatWindow.js
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedChatState, selectedChatMessagesSelector } from '../../atoms/ChatState';
import './ChatWindow.css';

const ChatWindow = () => {
  const selectedChat = useRecoilValue(selectedChatState);
  const messages = useRecoilValue(selectedChatMessagesSelector);
  const [newMessage, setNewMessage] = useState('');
  const [chatState, setChatState] = useRecoilState(selectedChatState);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const updatedChat = {
      ...chatState,
      messages: [...chatState.messages, { user: 'You', timestamp: new Date(), content: newMessage }],
    };

    setChatState(updatedChat);
    setNewMessage('');
  };

  return (
    <div className="chat-window">
      <h2>
        {selectedChat ? (
          <>
            <i className="fas fa-comments"></i> Chat {selectedChat.id}
          </>
        ) : (
          'Select a chat'
        )}
      </h2>
      <div className="messages-container">
        {selectedChat && (
          <div>
            {messages.map((message, index) => (
              <div key={index} className="message">
                <strong>{`${message.user}: `}</strong>
                {`${message.content} - ${message.timestamp.toLocaleString()}`}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="input-container">
        {selectedChat && (
          <div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>
              <i className="fas fa-paper-plane"></i> Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
