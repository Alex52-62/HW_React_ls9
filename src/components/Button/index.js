import React, { useContext } from "react";
import { ThemeContext } from "../../utils/ThemeContext";
import "./styles.css";

export const Button = ({ children }) => {
  const contextValue = useContext(ThemeContext);
  return (
    <div
      className={`my-button ${
        contextValue.theme === "light" ? "button-light" : "button-dark"
      }`}
      role="button"
    >
      {children("text from child")}
    </div>
  );
};
