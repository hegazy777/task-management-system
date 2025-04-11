import React from "react";
import "./DarkMode.css";

interface DarkModeProps {
  handleChange: () => void;
  isChecked: boolean;
}

export default function DarkMode({ handleChange, isChecked }: DarkModeProps) {
  return (
    <div className="toggleContainer d-flex align-items-center me-4">
      <input
        type="checkbox"
        id="check"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="check">Dark Mode</label>
    </div>
  );
}
