// src/app/cocina/_layout.tsx
import { Drawer } from "expo-router/drawer";

export default function CocinaLayout() {
  return (
    <Drawer screenOptions={{ headerShown: true }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Cola de Pedidos",
          title: "Atendiendo",
        }}
      />
      <Drawer.Screen
        name="atendidos"
        options={{
          drawerLabel: "Historial",
          title: "Ya Atendidos",
        }}
      />
    </Drawer>
  );
}
