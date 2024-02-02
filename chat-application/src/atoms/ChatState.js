// ChatState.js
import { atom, selector } from 'recoil';

export const chatsState = atom({
  key: 'chatsState',
  default: [],
});

export const selectedChatState = atom({
  key: 'selectedChatState',
  default: null,
});

export const selectedChatMessagesSelector = selector({
  key: 'selectedChatMessagesSelector',
  get: ({ get }) => {
    const selectedChat = get(selectedChatState);
    return selectedChat ? selectedChat.messages : [];
  },
});
