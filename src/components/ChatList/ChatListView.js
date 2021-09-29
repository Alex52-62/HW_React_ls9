import React from "react";
import { List, Button } from "@material-ui/core";

import { ChatItemContainer } from "../ChatItem/ChatItemContainer";

export const ChatListView = ({
  chats,
  value,
  handleChange,
  onDeleteChat,
  handleAddChat,
}) => (
  <List>
    {chats.map((chat) => (
      <ChatItemContainer
        chat={chat}
        key={chat.id}
        id={chat.id}
        onDelete={onDeleteChat}
      />
    ))}
    <form onSubmit={handleAddChat}>
      <input type="text" value={value} onChange={handleChange} />
      <Button variant="contained" disabled={!value} type="submit">
        Add chat
      </Button>
    </form>
  </List>
);
