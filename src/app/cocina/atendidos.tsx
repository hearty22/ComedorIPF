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
  container: { flex: 1, padding: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: "#ccc" },
  turno: { fontSize: 18, fontWeight: "bold", color: "green" },
  vacio: { textAlign: "center", marginTop: 20, color: "#666" },
});
