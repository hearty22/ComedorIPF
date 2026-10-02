// src/app/(tabs)/menu/[id].tsx
import { DondeEstoy } from "@/components/DonseEstoy";
import { Stack, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useComedor } from "../../../context/GlobalContext";
import { platosMock } from "../../../data/platos";

export default function DetallePlato() {
  // Siempre define el tipo genérico para no lidiar con un unknown
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarAlCarrito } = useComedor();

  const plato = platosMock.find((p) => p.id === id);

  if (!plato) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Error" }} />
        <Text style={styles.error}>El plato con ID {id} no existe.</Text>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Modifica el título de la barra superior sobre la marcha */}
      <Stack.Screen options={{ title: plato.nombre }} />

      <Text style={styles.titulo}>{plato.nombre}</Text>
      <Text>{plato.descripcion}</Text>
      <Text style={styles.precio}>${plato.precio}</Text>

      <Button
        title="Agregar al carrito"
        onPress={() => agregarAlCarrito(plato)}
      />

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, fontWeight: "bold" },
  precio: { fontSize: 20, marginVertical: 15, color: "green" },
  error: { color: "red", fontSize: 18 },
});
