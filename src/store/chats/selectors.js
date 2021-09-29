export const selectChats = (state) => state.chats.chats;
export const selectChatsLength = (state) => state.chats.chats.length;
export const selectFirstChatId = (state) => state.chats.chats?.[0].id;
export const selectIfChatExists = (id) => (state) =>
  !!state.chats.chats.find((chat) => id === chat.id);