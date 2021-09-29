import { useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ref, onValue } from "firebase/database";

import { Message } from "../Message";
import { Form } from "../Form";
import { ChatListContainer } from "../ChatList/ChatListContainer.js";
import { initChats } from "../../store/chats/actions";
import { addMessageFb, initMessages } from "../../store/messages/actions";
import { selectIfChatExists } from "../../store/chats/selectors";
import { db } from "../../services/firebase";
import "./style.css";

function Chats() {
  const { chatId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initChats());
    dispatch(initMessages());
  }, [dispatch]);

  const messages = useSelector((state) => state.messages.messages);

  const selectChatExists = useMemo(() => selectIfChatExists(chatId), [chatId]);
  const chatExists = useSelector(selectChatExists);

  const sendMessage = useCallback(
    (text, author) => {
      dispatch(addMessageFb(chatId, text, author));
    },
    [chatId, dispatch]
  );

  const handleAddMessage = useCallback(
    (text) => {
      sendMessage(text, chatId);
    },
    [sendMessage, chatId]
  );

  useEffect(() => {
    const profileDbRef = ref(db, "profile/username");
    const unsubscribe = onValue(profileDbRef, (snapshot) => {
      const data = snapshot.val();
      const username = document.querySelector(".username");
      const div = document.createElement("div");
      div.innerHTML = "Username:" + data.username;
      document.body.append(div);
      div.classList.add("user");
      username.before(div);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <div className="username" />
      <ChatListContainer />
      {!!chatId && chatExists && (
        <>
          {(Object.values(messages[chatId] || {}) || []).map((message) => (
            <Message key={message.id} text={message.text} id={message.id} />
          ))}
          <Form onSubmit={handleAddMessage} />
        </>
      )}
    </div>
  );
}

export default Chats;
