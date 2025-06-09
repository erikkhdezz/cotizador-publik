import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import WidgetProductoExpandible from "../components/WidgetProductoExpandible";
import { motion } from "framer-motion";

export default function PantallaCategoria({ dark = false, categoria = "Lonas" }) {
  const [productos, setProductos] = useState([]);
  const [vistaCuadricula, setVistaCuadricula] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [nombreCliente, setNombreCliente] = useState("");
  const [errorNombre, setErrorNombre] = useState(false);
  const [cotizacionEnviada, setCotizacionEnviada] = useState(false);

  useEffect(() => {
    setProductos([
      { id: 1, name: "Lona 13oz", price: "$100/m²", image: "/lona.png", nuevo: true },
      { id: 2, name: "Lona Mesh", price: "$120/m²", image: "/mesh.png", promo: true },
      { id: 3, name: "Lona Backlight", price: "$150/m²", image: "/backlight.png" }
    ]);
  }, []);

  const textColor = dark ? "text-white" : "text-[#1F1F1F]";
  const bgColor = dark ? "bg-[#1F1F1F]" : "bg-[#F7F3F7]";
  const cardBg = dark ? "bg-[#2A2A2A]" : "bg-white";

  const handleEnviarCotizacion = () => {
    if (nombreCliente.trim().length < 3) {
      setErrorNombre(true);
      return;
    }
    const mensaje = \`Hola, me gustaría cotizar el producto: \${productoSeleccionado.name}.\nNombre: \${nombreCliente}\`;
    const url = \`https://wa.me/527578048715?text=\${encodeURIComponent(mensaje)}\`;
    window.open(url, "_blank");
    setCotizacionEnviada(true);
    setTimeout(() => {
      setCotizacionEnviada(false);
      setMostrarConfirmacion(false);
      setProductoSeleccionado(null);
      setNombreCliente("");
    }, 3000);
  };

  return (
    <div className={\`min-h-screen p-6 font-[Poppins] \${bgColor} \${textColor}\`}>
      <div className={\`flex items-center justify-between mb-4 sticky top-0 z-10 \${bgColor}\`}>
        <button onClick={() => window.history.back()}>⬅</button>
        <h2 className="text-xl font-bold">{categoria}</h2>
        <button onClick={() => setVistaCuadricula(!vistaCuadricula)}>
          {vistaCuadricula ? "📋" : "🟦"}
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm opacity-70">Todos los productos</p>
      </div>

      <div className={\`grid \${vistaCuadricula ? "grid-cols-2" : "grid-cols-1"} gap-4\`}>
        {productos.map((item) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={item.id}
            className={\`\${cardBg} rounded-xl shadow p-3 flex \${vistaCuadricula ? "flex-col" : "flex-row items-center"} gap-3 cursor-pointer relative\`}
            onClick={() => setProductoSeleccionado(item)}
          >
            {item.nuevo && <span className="absolute top-2 right-2 text-xs bg-green-600 text-white px-2 py-1 rounded">Nuevo</span>}
            {item.promo && <span className="absolute top-2 right-2 text-xs bg-[#FF007B] text-white px-2 py-1 rounded">-20% OFF</span>}
            <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded" />
            <div>
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-[#C20074]">{item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {productoSeleccionado && !mostrarConfirmacion && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Cotizando: {productoSeleccionado.name}</h4>
          <WidgetProductoExpandible dark={dark} />
          <div className="text-right mt-2">
            <Button variant="ghost" onClick={() => setMostrarConfirmacion(true)}>Continuar</Button>
            <Button variant="ghost" onClick={() => setProductoSeleccionado(null)}>Cancelar</Button>
          </div>
        </motion.div>
      )}

      {mostrarConfirmacion && !cotizacionEnviada && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
          <h4 className="text-lg font-semibold mb-2">Confirmar cotización</h4>
          <input
            type="text"
            className="w-full p-2 rounded border"
            placeholder="Tu nombre completo"
            value={nombreCliente}
            onChange={(e) => {
              setNombreCliente(e.target.value);
              if (e.target.value.trim().length >= 3) setErrorNombre(false);
            }}
          />
          {errorNombre && <p className="text-red-500 text-sm mt-1">Por favor, ingresa tu nombre completo.</p>}
          <div className="text-right mt-3">
            <Button variant="ghost" onClick={handleEnviarCotizacion}>Enviar cotización</Button>
          </div>
        </motion.div>
      )}

      {cotizacionEnviada && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 text-center">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
            ✅
          </motion.div>
          <p className="mt-2 font-semibold">¡Cotización enviada con éxito!</p>
          <p className="text-sm opacity-70">Gracias por confiar en nosotros.</p>
        </motion.div>
      )}
    </div>
  );
}