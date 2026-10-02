import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function AyudaIndex() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Centro de Ayuda</Text>
      <Link href="/ayuda/pagos/tarjeta" style={styles.link}>
        💳 ¿Cómo pagar con tarjeta?
      </Link>
      <Link href="/ayuda/horarios" style={styles.link}>
        🕒 Horarios del comedor
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F9FAFB" },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 24,
  },
  link: {
    fontSize: 16,
    color: "#007AFF",
    minHeight: 48,
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
