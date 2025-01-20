import React from "react";
import { FiMoon } from "react-icons/fi";
export const ToggleStyle = () => {
  return (
    <button className="p-1 rounded-full">
      <FiMoon className="mr-5 h-9 w-9" style={{ opacity: "54%" }} />
    </button>
  );
};
