import React from "react";
const Button = ({ text, onClick, flagUrl = null }) => {
  return (
    <button onClick={onClick}>
      {flagUrl && <img src={flagUrl} alt={`flag of ${text}`} />}
      {text}
    </button>
  );
};
export default Button;
