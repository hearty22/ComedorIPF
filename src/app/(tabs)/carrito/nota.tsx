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
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 20,
  },
});
