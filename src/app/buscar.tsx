// src/app/buscar.tsx
import { DondeEstoy } from "@/components/DonseEstoy";
import { Link, router, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { platosMock } from "../data/platos";

export default function Buscar() {
  const { q = "", categoria = "" } = useLocalSearchParams<{
    q: string;
    categoria: string;
  }>();

  const resultados = platosMock.filter((p) => {
    const coincideTexto = p.nombre.toLowerCase().includes(q.toLowerCase());
    const coincideCat = categoria === "" || p.categoria === categoria;
    return coincideTexto && coincideCat;
  });

  const manejarBusqueda = (texto: string) => {
    // Actualiza la URL sin empujar una nueva vista a la pila
    router.setParams({ q: texto });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Escribe para buscar..."
        value={q}
        onChangeText={manejarBusqueda}
      />

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/menu/${item.id}`} style={styles.item}>
            {item.nombre} - ${item.precio}
          </Link>
        )}
        ListEmptyComponent={<Text>No se encontraron platos.</Text>}
      />

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#F9FAFB" },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 16,
    minHeight: 48,
  },
  item: {
    minHeight: 48,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 8,
    borderRadius: 12,
    fontSize: 16,
    color: "#007AFF",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
