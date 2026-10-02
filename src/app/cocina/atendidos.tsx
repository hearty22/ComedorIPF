import { FlatList, StyleSheet, Text, View } from "react-native";
import { useComedor } from "../../context/GlobalContext";

export default function AtendidosPantalla() {
  const { pilaAtendidos } = useComedor();

  // Invertimos el array para cumplir la regla LIFO visualmente (del más reciente al más antiguo)
  const historialLIFO = pilaAtendidos.aArray().reverse();

  return (
    <View style={styles.container}>
      <FlatList
        data={historialLIFO}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.turno}>Turno #{item.id}</Text>
            <Text>Platos entregados: {item.platos.length}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.vacio}>El historial está vacío.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F9FAFB" },
  item: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  turno: {
    fontSize: 18,
    fontWeight: "700",
    color: "#10B981",
    marginBottom: 8,
  },
  vacio: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
    color: "#6B7280",
  },
});
