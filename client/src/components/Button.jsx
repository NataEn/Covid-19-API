import React, { useState, useEffect } from "react";
const Button = ({ text, onClick, flagUrl }) => {
  return (
    <div onClick={onClick}>
      {text}
      <img src={flagUrl} alt={`flag of ${text}`} />
    </div>
  );
};
export default Button;
