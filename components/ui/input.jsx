import React from "react";

export function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-[#FF007B] transition"
    />
  );
}
