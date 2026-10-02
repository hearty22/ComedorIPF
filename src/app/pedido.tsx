// src/app/pedido.tsx
import { Redirect } from "expo-router";

export default function LegacyPedido() {
  // El Redirect ejecuta un router.replace() por debajo.
  // Nunca usa push, porque si no, al darle "atrás", el usuario caería en un bucle.
  return <Redirect href="/carrito" />;
}
