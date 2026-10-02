import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>¡Hola! ¿Qué vas a pedir hoy?</Text>

      <View style={styles.grid}>
        <Link href="/menu" style={styles.card}>
          🍽️ Menú
        </Link>
        <Link href="/buscar" style={styles.card}>
          🔍 Buscar
        </Link>
        <Link href="/ayuda" style={styles.card}>
          ❓ Ayuda
        </Link>
        <Link href="/login" style={styles.card}>
          👨‍🍳 Cocina
        </Link>
      </View>
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
  grid: { gap: 16 },
  card: {
    minHeight: 48,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    fontSize: 18,
    textAlign: "center",
    color: "#1F2937",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
