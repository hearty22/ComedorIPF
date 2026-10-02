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
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  item: {
    padding: 20,
    backgroundColor: "#e0f7fa",
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 18,
    textAlign: "center",
  },
});
