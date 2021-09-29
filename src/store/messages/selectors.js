export const selectMessages = (state) => state.messages.messages;
export const selectMessagesByChatId = (chatId) => (state) =>
  state.messages.messages[chatId];
