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
          color="red"
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
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  botones: { marginBottom: 15 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "right",
  },
});
