// src/context/GlobalContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";
import { Plato } from "../data/platos";
import { Cola } from "../estructuras/Cola";
import { Pila } from "../estructuras/Pila";

export interface Pedido {
  id: number;
  platos: Plato[];
  nota: string;
}

interface ComedorContextType {
  usuario: string | null;
  iniciarSesion: () => void;
  cerrarSesion: () => void;

  carrito: Plato[];
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  limpiarCarrito: () => void;

  colaPedidos: Cola<Pedido>;
  pilaAtendidos: Pila<Pedido>;
  confirmarPedido: (nota: string) => number;
  atenderSiguiente: () => void;
}

const ComedorContext = createContext<ComedorContextType | null>(null);

export function ComedorProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);

  // React State para la UI del carrito
  const [carrito, setCarrito] = useState<Plato[]>([]);

  // Instancias de estructuras de datos persistentes
  const [pilaCarrito] = useState(() => new Pila<Plato>());
  const [colaPedidos] = useState(() => new Cola<Pedido>());
  const [pilaAtendidos] = useState(() => new Pila<Pedido>());
  const [contadorTurnos, setContadorTurnos] = useState(1);

  const iniciarSesion = () => setUsuario("cocina");
  const cerrarSesion = () => setUsuario(null);

  const agregarAlCarrito = (plato: Plato) => {
    pilaCarrito.push(plato);
    setCarrito(pilaCarrito.aArray()); // Forzamos re-render pasando un nuevo array
  };

  const deshacerUltimo = () => {
    pilaCarrito.pop();
    setCarrito(pilaCarrito.aArray());
  };

  const limpiarCarrito = () => {
    while (!pilaCarrito.vacia) pilaCarrito.pop();
    setCarrito([]);
  };

  const confirmarPedido = (nota: string) => {
    const nuevoPedido: Pedido = {
      id: contadorTurnos,
      platos: [...carrito],
      nota,
    };
    colaPedidos.encolar(nuevoPedido);
    setContadorTurnos((prev) => prev + 1);
    limpiarCarrito();
    return nuevoPedido.id; // Devuelve el número de turno para navegar a /turno/[numero]
  };

  const atenderSiguiente = () => {
    const pedidoAtendido = colaPedidos.desencolar();
    if (pedidoAtendido) {
      pilaAtendidos.push(pedidoAtendido);
    }
  };

  return (
    <ComedorContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        carrito,
        agregarAlCarrito,
        deshacerUltimo,
        limpiarCarrito,
        colaPedidos,
        pilaAtendidos,
        confirmarPedido,
        atenderSiguiente,
      }}
    >
      {children}
    </ComedorContext.Provider>
  );
}

export function useComedor() {
  const context = useContext(ComedorContext);
  if (!context)
    throw new Error("useComedor debe usarse dentro de un ComedorProvider");
  return context;
}
