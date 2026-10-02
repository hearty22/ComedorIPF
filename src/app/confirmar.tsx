// src/app/confirmar.tsx
import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useComedor } from "../context/GlobalContext";

export default function ConfirmarPantalla() {
  const { carrito, confirmarPedido } = useComedor();
  const total = carrito.reduce((acc, plato) => acc + plato.precio, 0);

  const manejarConfirmacion = () => {
    // Aquí podrías leer la nota desde un estado si implementaste /carrito/nota
    const numeroTurno = confirmarPedido("Sin nota");

    // EXTREMADAMENTE IMPORTANTE: replace, no push.
    router.replace(`/turno/${numeroTurno}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumen</Text>
      <Text>Total a pagar: ${total}</Text>
      <Text>Items: {carrito.length}</Text>

      <View style={styles.boton}>
        <Button title="Confirmar Pedido" onPress={manejarConfirmacion} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 24,
  },
  boton: { marginTop: 32, width: "100%" },
});
