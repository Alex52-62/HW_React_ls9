import React from "react";

export const Message = ({ text, onClick, id }) => {
  console.log({ text });
  return <div className="msg">{text}</div>;
};
