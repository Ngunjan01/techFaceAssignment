// ChatList.js
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatsState, selectedChatState } from '../../atoms/ChatState';
import './ChatList.css';

const ChatList = () => {
  const [chats, setChats] = useRecoilState(chatsState);
  const [selectedChat,setChatState] = useRecoilState(selectedChatState);


  const createChat = () => {
    const newChat = { id: chats.length + 1, messages: [] };
    setChats([...chats, newChat]);
    selectChat(newChat);
  };

  const selectChat = (chat) => {
    setChats((prevChats) => prevChats.map((c) => (c.id === chat.id ? { ...c, selected: true } : { ...c, selected: false })));
    setChatState(chat);
  };

  const deleteChat = (chatId) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    setChatState(null);
  };

  return (
    <div className="chat-list">
      <h2>
        <i className="fas fa-comment"></i> Chats
      </h2>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => selectChat(chat)}>
            {chat.selected ? <strong>{`Chat ${chat.id}`}</strong> : `Chat ${chat.id}`}
            <button onClick={() => deleteChat(chat.id)}>
              <i className="fas fa-trash-alt"></i> Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={createChat}>
        <i className="fas fa-plus"></i> Create Chat
      </button>
    </div>
  );
};

export default ChatList;
