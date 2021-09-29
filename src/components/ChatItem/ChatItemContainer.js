import React from "react";
import { ChatItemView } from "./ChatItemView";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteChat } from "../../store/chats/actions";

export const ChatItemContainer = ({ chat, id }) => {
  const { chatId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const chats = useSelector((state) => state.chats.chats);

  const handleDelete = () => {
    dispatch(deleteChat(id));

    if (chatId !== id) {
      return;
    }

    if (chats.length === 1) {
      history.push(`/chats/${chats[0].id}`);
    } else {
      history.push(`/chats`);
    }
  };
  return <ChatItemView name={chat.name} id={chat.id} onDelete={handleDelete} />;
};
