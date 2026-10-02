import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function AyudaArticulo() {
  // slug es un array de strings en un catch-all
  const { slug } = useLocalSearchParams<{ slug: string[] }>();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Artículo de Soporte</Text>
      <Text style={styles.ruta}>
        Estás leyendo sobre: {slug ? slug.join(" > ") : "General"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold" },
  ruta: { fontSize: 16, marginTop: 10, color: "#555" },
});
