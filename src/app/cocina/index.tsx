// src/app/cocina/index.tsx
import { Button, StyleSheet, Text, View } from "react-native";
import { useComedor } from "../../context/GlobalContext";

export default function CocinaCola() {
  const { colaPedidos, atenderSiguiente } = useComedor();

  const pedidoActual = colaPedidos.frente();
  const totalEspera = colaPedidos.tamanio;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cola de Trabajo</Text>
      <Text style={styles.subtitulo}>Pedidos en espera: {totalEspera}</Text>

      {pedidoActual ? (
        <View style={styles.tarjeta}>
          <Text style={styles.turno}>Turno #{pedidoActual.id}</Text>
          <Text style={styles.nota}>Nota: {pedidoActual.nota}</Text>
          <Text style={styles.platos}>{pedidoActual.platos.length} platos</Text>

          <Button
            title="Atender Siguiente"
            onPress={atenderSiguiente}
            color="#10B981"
          />
        </View>
      ) : (
        <Text style={styles.vacio}>No hay pedidos pendientes.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F9FAFB" },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },
  subtitulo: { fontSize: 16, marginBottom: 24, color: "#6B7280" },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  turno: {
    fontSize: 24,
    fontWeight: "700",
    color: "#007AFF",
    marginBottom: 8,
  },
  nota: {
    fontStyle: "italic",
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  platos: { fontSize: 16, color: "#1F2937", marginBottom: 16 },
  vacio: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 32,
  },
});
