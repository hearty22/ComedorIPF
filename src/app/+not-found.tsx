import { Link, Stack, usePathname } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  const rutaMala = usePathname();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Ruta no encontrada" }} />

      <Text style={styles.titulo}>Error 404</Text>
      <Text style={styles.detalle}>La URL solicitada no existe:</Text>
      <Text style={styles.url}>{rutaMala}</Text>

      <Link href="/" style={styles.link}>
        Volver al Inicio
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: { fontSize: 32, fontWeight: "bold", color: "red", marginBottom: 10 },
  detalle: { fontSize: 18 },
  url: { fontSize: 18, fontWeight: "bold", marginVertical: 10, color: "#333" },
  link: {
    marginTop: 20,
    color: "#007AFF",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
