import React from "react";

export default function WidgetProductoExpandible({ dark }) {
  return (
    <div className={\`p-4 mt-4 rounded-lg border \${dark ? "border-white text-white" : "border-black text-black"}\`}>
      <p className="text-sm">Aquí irían los detalles del producto, opciones, acabados, etc.</p>
    </div>
  );
}