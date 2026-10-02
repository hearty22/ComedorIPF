import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Categoria } from "../../../data/platos";

const categorias: Categoria[] = ["desayuno", "almuerzo", "bebidas", "kiosco"];

export default function MenuIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Categorías del Menú</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Link href={`/categorias/${item}`} style={styles.item}>
            {item.toUpperCase()}
          </Link>
        )}
      />
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
  item: {
    minHeight: 48,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    borderRadius: 12,
    fontSize: 18,
    textAlign: "center",
    color: "#007AFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
