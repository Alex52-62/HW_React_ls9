import React, { useState } from "react";
import { ChatListView } from "./ChatListView";
import { useSelector, useDispatch } from "react-redux";

import { selectChats } from "../../store/chats/selectors";
import { addChatFb } from "../../store/chats/actions";

export const ChatListContainer = () => {
  const chats = useSelector(selectChats);
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleAddChat = (e) => {
    e.preventDefault();
    dispatch(addChatFb(value));
    setValue("");
  };

  return (
    <ChatListView
      chats={chats}
      value={value}
      handleChange={handleChange}
      handleAddChat={handleAddChat}
    />
  );
};
