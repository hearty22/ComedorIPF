// src/components/DondeEstoy.tsx
import { useLocalSearchParams, usePathname, useSegments } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const DEBUG = true; // Cambiar a false en producción

export function DondeEstoy() {
  if (!DEBUG) return null;

  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  return (
    <View style={styles.caja}>
      <Text style={styles.titulo}> ¿Dónde estoy?</Text>
      <Text>Pathname: {pathname}</Text>
      <Text>Segments: {JSON.stringify(segments)}</Text>
      <Text>Params: {JSON.stringify(params)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  titulo: { fontWeight: "bold", marginBottom: 5 },
});
