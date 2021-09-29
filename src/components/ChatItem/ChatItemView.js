import React from "react";
import { Link } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import { Button } from "@material-ui/core";

export const ChatItemView = ({ name, id, onDelete }) => (
  <ListItem>
    <Link to={`/chats/${id}`}>{name}</Link>
    <Button variant="contained" type="submit" onClick={onDelete}>
      delete
    </Button>
  </ListItem>
);
