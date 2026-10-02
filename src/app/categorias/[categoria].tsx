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
  container: { flex: 1, padding: 24, backgroundColor: "#F9FAFB" },
  item: {
    minHeight: 48,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    borderRadius: 12,
    fontSize: 16,
    color: "#1F2937",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  error: { color: "#EF4444", fontSize: 16, fontWeight: "700" },
});
