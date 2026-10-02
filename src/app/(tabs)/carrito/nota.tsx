import { router } from "expo-router";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function CarritoNota() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Añadir nota a la cocina</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Sin sal, pan tostado..."
        multiline
        numberOfLines={4}
      />
      <Button title="Guardar nota" onPress={() => router.back()} />
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
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#1F2937",
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 24,
  },
});
