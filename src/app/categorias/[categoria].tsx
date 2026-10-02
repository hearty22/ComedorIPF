// src/app/categorias/[categoria].tsx
import { DondeEstoy } from "@/components/DonseEstoy";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Categoria, platosMock } from "../../data/platos";

const categoriasValidas: Categoria[] = [
  "desayuno",
  "almuerzo",
  "bebidas",
  "kiosco",
];

export default function CategoriaPantalla() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  // Validación requerida por el TP
  if (!categoriasValidas.includes(categoria as Categoria)) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Error" }} />
        <Text style={styles.error}>La categoría "{categoria}" no existe.</Text>
        <DondeEstoy />
      </View>
    );
  }

  const platosFiltrados = platosMock.filter((p) => p.categoria === categoria);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: categoria.toUpperCase() }} />

      <FlatList
        data={platosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/menu/${item.id}`} style={styles.item}>
            {item.nombre} - ${item.precio}
          </Link>
        )}
      />
      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
  },
  error: { color: "red", fontSize: 18, fontWeight: "bold" },
});
