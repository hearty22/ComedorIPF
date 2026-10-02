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
            color="green"
          />
        </View>
      ) : (
        <Text style={styles.vacio}>No hay pedidos pendientes.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, fontWeight: "bold" },
  subtitulo: { fontSize: 16, marginBottom: 20, color: "#666" },
  tarjeta: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  turno: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
  nota: { fontStyle: "italic", marginBottom: 10 },
  platos: { marginBottom: 20 },
  vacio: { fontSize: 18, color: "#999", textAlign: "center", marginTop: 50 },
});
