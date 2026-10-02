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
    padding: 24,
    backgroundColor: "#F9FAFB",
  },
  titulo: {
    fontSize: 32,
    fontWeight: "700",
    color: "#EF4444",
    marginBottom: 16,
  },
  detalle: { fontSize: 16, color: "#1F2937" },
  url: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 8,
    color: "#6B7280",
  },
  link: {
    minHeight: 48,
    padding: 16,
    marginTop: 16,
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
