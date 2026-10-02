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
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  grid: { gap: 15 },
  card: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    fontSize: 18,
    textAlign: "center",
  },
});
