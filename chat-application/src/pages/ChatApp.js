// ChatApp.tsx
import React from 'react';
import ChatList from '../components/chatList/ChatList';
import ChatWindow from '../components/chatWindow/ChatWindow';
import './ChatApp.css';

const ChatApp= () => {
  return (
    <div className="chat-app">
      <ChatList />
      <ChatWindow />
    </div>
  );
};

export default ChatApp;
