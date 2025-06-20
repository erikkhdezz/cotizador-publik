import React from "react";

export default function WidgetProductoExpandible({ dark, producto }) {
  if (!producto) {
    return null; // Or some placeholder for when no product is selected
  }

  return (
    <div className={\`p-4 mt-4 rounded-lg border \${dark ? "border-white text-white" : "border-black text-black"}\`}>
      <h5 className="text-lg font-semibold">{producto.name}</h5>
      <p className="text-md">{producto.price}</p>
      <p className="text-sm mt-2">Aquí irían los detalles del producto, opciones, acabados, etc.</p>
    </div>
  );
}