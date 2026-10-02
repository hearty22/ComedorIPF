import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useComedor } from "../context/GlobalContext";

export default function LoginPantalla() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const { iniciarSesion } = useComedor();

  const manejarLogin = () => {
    // Hardcodeado según requerimiento del TP
    if (user.toLowerCase() === "cocina" && pass === "1234") {
      iniciarSesion();
      // El modal se cierra solo gracias al renderizado condicional en _layout.tsx
    } else {
      Alert.alert("Error", "Credenciales incorrectas");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Acceso Restringido</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        autoCapitalize="none"
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        onChangeText={setPass}
      />
      <Button title="Ingresar" onPress={manejarLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    color: "#1F2937",
    minHeight: 48,
  },
});
