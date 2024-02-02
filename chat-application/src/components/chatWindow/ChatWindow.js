// ChatWindow.js
import React, { useState,useRef,useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedChatState, selectedChatMessagesSelector } from '../../atoms/ChatState';
import './ChatWindow.css';

const ChatWindow = () => {
  const selectedChat = useRecoilValue(selectedChatState);
  const messages = useRecoilValue(selectedChatMessagesSelector);
  const [newMessage, setNewMessage] = useState('');
  const [chatState, setChatState] = useRecoilState(selectedChatState);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const sendMessage = () => {
    if (newMessage.trim() === '' || !chatState) return;

    const updatedChat = {
      ...chatState,
      messages: [...chatState.messages, { user: 'You', timestamp: new Date(), content: newMessage }],
    };

    setChatState(updatedChat);
    setNewMessage('');
  };
  
  useEffect(() => {
    const receiveMessage = () => {
      const receivedMessage = {
        user: 'Other User',
        timestamp: new Date(),
        content: 'This is a received message.',
      };

      setChatState((prevChat) => ({
        ...prevChat,
        messages: [receivedMessage, ...prevChat?.messages.filter(message => message.user === 'You')],
      }));
    };

    const receiveMessageTimeout = setTimeout(receiveMessage, 3000);

    return () => clearTimeout(receiveMessageTimeout);
  }, [setChatState]);

  // Reset the message state when switching between chats
  useEffect(() => {
    setNewMessage('');
  }, [chatState]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior (e.g., newline in the text area)
      sendMessage();
    }
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
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="input-container">
        {selectedChat && (
          <div className='input-button'>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={handleKeyDown}
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
