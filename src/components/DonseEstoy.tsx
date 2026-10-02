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
    marginTop: 24,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  titulo: {
    fontWeight: "700",
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 8,
  },
});
