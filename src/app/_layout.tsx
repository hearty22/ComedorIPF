// src/app/_layout.tsx
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ComedorProvider, useComedor } from "../context/GlobalContext";

// Configuración de anclaje para los deep links requerida por el TP
export const unstable_settings = {
  initialRouteName: "(tabs)",
  anchor: "(tabs)",
};

function NavegacionRaiz() {
  const { usuario } = useComedor();
  const conSesion = usuario !== null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Grupo principal de pestañas */}
      <Stack.Screen name="(tabs)" />

      {/* Rutas dinámicas en el root */}
      <Stack.Screen
        name="categorias/[categoria]"
        options={{ title: "Categoría", headerShown: true }}
      />
      <Stack.Screen
        name="buscar"
        options={{ title: "Buscar", headerShown: true }}
      />
      <Stack.Screen
        name="turno/[numero]"
        options={{
          title: "Tu Turno",
          headerShown: true,
          headerBackVisible: false,
        }}
      />

      {/* Modales */}
      <Stack.Screen
        name="confirmar"
        options={{
          presentation: "modal",
          title: "Confirmar Pedido",
          headerShown: true,
        }}
      />

      {/* Protección de Rutas (Lógica de la Parte F2) */}
      {conSesion ? (
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="login" options={{ presentation: "modal" }} />
      )}

      {/* 404 */}
      <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
    </Stack>
  );
}

export default function LayoutRaiz() {
  return (
    // GestureHandlerRootView es obligatorio en la raíz para que funcione el Drawer
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ComedorProvider>
        <NavegacionRaiz />
      </ComedorProvider>
    </GestureHandlerRootView>
  );
}
