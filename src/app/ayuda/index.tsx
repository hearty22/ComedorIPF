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
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  link: { fontSize: 18, color: "#007AFF", marginVertical: 10 },
});
