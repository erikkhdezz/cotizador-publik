import React from "react";

export function Button({ children, onClick, variant = "default" }) {
  const style = variant === "ghost"
    ? "px-4 py-2 rounded text-[#FF007B] border border-[#FF007B] hover:bg-[#FF007B] hover:text-white transition"
    : "px-4 py-2 rounded bg-[#FF007B] text-white hover:bg-[#C20074] transition";

  return (
    <button onClick={onClick} className={style}>
      {children}
    </button>
  );
}