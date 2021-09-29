import { ref, onValue, set } from "firebase/database";
import { db } from "../../services/firebase";

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE";
export const DELETE_MESSAGE = "MESSAGES::DELETE_MESSAGE";
export const SET_MESSAGES = "MESSAGES::SET_MESSAGES";

export const addMessage = (chatId, text, author) => ({
  type: ADD_MESSAGE,
  payload: {
    chatId,
    text,
    author,
  },
});

export const deleteMessage = (chatId, id) => ({
  type: DELETE_MESSAGE,
  payload: {
    chatId,
    id,
  },
});

const setMessages = (messages) => ({
  type: SET_MESSAGES,
  payload: messages,
});

export const initMessages = () => (dispatch) => {
  const messagesDbRef = ref(db, "messages");
  onValue(messagesDbRef, (snapshot) => {
    const data = snapshot.val();
    dispatch(setMessages(data || {}));
  });
};

export const addMessageFb = (author, text, chatId) => (dispatch) => {
  const newId = `message-${Date.now()}`;
  const messagesDbRef = ref(db, `messages/${chatId}/${newId}`);
  set(messagesDbRef, {
    author,
    text,
    id: newId,
  });
};
