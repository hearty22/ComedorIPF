// src/app/turno/[numero].tsx
import { DondeEstoy } from "@/components/DonseEstoy";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { useComedor } from "../../context/GlobalContext";

export default function TurnoPantalla() {
  // 1. Extraemos el parámetro dinámico de la URL
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { colaPedidos } = useComedor();

  // 2. Calculamos la posición en la cola
  const pedidos = colaPedidos.aArray();
  const posicion = pedidos.findIndex((p) => p.id === Number(numero));

  // Si es el primero en la cola (índice 0), tiene 0 adelante.
  // Si no se encuentra (índice -1, ej: ya fue atendido), mostramos 0.
  const pedidosAdelante = posicion > 0 ? posicion : 0;

  // 3. Desafío opcional: 3 minutos por cada pedido adelante
  const tiempoEstimado = pedidosAdelante * 3;

  return (
    <View style={styles.container}>
      {/* Ocultamos el botón "atrás" del header nativo por seguridad */}
      <Stack.Screen options={{ title: "Tu Turno", headerBackVisible: false }} />

      <Text style={styles.titulo}>Tu número de pedido es</Text>
      <Text style={styles.numeroTurno}>#{numero}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTexto}>
          Pedidos adelante: {pedidosAdelante}
        </Text>
        {pedidosAdelante > 0 ? (
          <Text style={styles.tiempo}>
            Tiempo estimado: {tiempoEstimado} minutos
          </Text>
        ) : (
          <Text style={styles.tiempoExito}>
            ¡Tu pedido es el próximo en prepararse!
          </Text>
        )}
      </View>

      {/* Usamos navigate('/') para volver limpiamente a la pestaña de Inicio */}
      <View style={styles.botonContainer}>
        <Button title="Volver al Inicio" onPress={() => router.navigate("/")} />
      </View>

      <DondeEstoy />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: { fontSize: 20, color: "#555" },
  numeroTurno: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 20,
  },
  infoBox: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  infoTexto: { fontSize: 18, marginBottom: 10 },
  tiempo: { fontSize: 18, fontWeight: "bold", color: "#E67E22" },
  tiempoExito: { fontSize: 18, fontWeight: "bold", color: "#27AE60" },
  botonContainer: { width: "100%", paddingHorizontal: 20 },
});
