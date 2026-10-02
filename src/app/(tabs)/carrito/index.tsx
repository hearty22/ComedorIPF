// src/app/(tabs)/carrito/index.tsx
import { DondeEstoy } from "@/components/DonseEstoy";
import { Link } from "expo-router";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useComedor } from "../../../context/GlobalContext";

export default function CarritoPantalla() {
  const { carrito, deshacerUltimo } = useComedor();

  const total = carrito.reduce((acc, plato) => acc + plato.precio, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tu Pedido ({carrito.length} items)</Text>

      <View style={styles.botones}>
        <Button
          title="Deshacer último"
          color="#EF4444"
          onPress={deshacerUltimo}
          disabled={carrito.length === 0}
        />
      </View>

      <FlatList
        data={carrito}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre}</Text>
            <Text>${item.precio}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>El carrito está vacío.</Text>}
      />

      <Text style={styles.total}>Total: ${total}</Text>

      {carrito.length > 0 && (
        <Link href="/confirmar" asChild>
          <Button title="Ir a Confirmar Pedido" />
        </Link>
      )}

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F9FAFB" },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
  },
  botones: { marginBottom: 16 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  total: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginVertical: 24,
    textAlign: "right",
  },
});
