# Comedor IPF - Sistema de Pedidos

Aplicación móvil desarrollada con **React Native** y **Expo Router (SDK 57)** para la gestión de pedidos y atención en la cocina del Instituto Politécnico Formosa.

La app cubre dos flujos de uso: el **cliente** (arma su pedido desde el menú, lo confirma y recibe un turno) y la **cocina** (atiende los pedidos en orden de llegada y consulta el historial). El estado compartido se resuelve con un `Context` global y las estructuras de datos pedidas por el TP: **Pila (LIFO)** y **Cola (FIFO)**.

---

## 1. Árbol de Rutas y Navegadores

La aplicación utiliza un sistema de navegación anidado combinando `Stack`, `Tabs` y `Drawer` para mantener el estado de cada flujo aislado.

```text
src/app/
├── _layout.tsx                 (Stack Raíz - Provider global, GestureHandler y protección de rutas)
├── index.tsx                   (Pantalla raíz placeholder "/")
├── +not-found.tsx              (Pantalla de error 404)
├── pedido.tsx                  (Redirección Legacy con <Redirect> a /carrito)
├── buscar.tsx                  (Stack Raíz)
├── confirmar.tsx               (Stack Raíz - presentation: 'modal')
├── login.tsx                   (Stack Raíz - presentation: 'modal')
├── categorias/
│   └── [categoria].tsx         (Stack Raíz)
├── turno/
│   └── [numero].tsx            (Stack Raíz)
├── (tabs)/
│   ├── _layout.tsx             (Tabs Navigator principal: Inicio / Menú / Carrito)
│   ├── index.tsx               (Tab: Inicio)
│   ├── menu/
│   │   ├── _layout.tsx         (Stack anidado para mantener la barra de tabs visible)
│   │   ├── index.tsx           (Lista de categorías)
│   │   └── [id].tsx            (Detalle del plato)
│   └── carrito/
│       ├── _layout.tsx         (Stack anidado)
│       ├── index.tsx           (Resumen del carrito con botón deshacer)
│       └── nota.tsx            (Nota para la cocina)
├── cocina/
│   ├── _layout.tsx             (Drawer Navigator - Zona restringida)
│   ├── index.tsx               (Cola de pedidos activos)
│   └── atendidos.tsx           (Historial de pedidos - Pila LIFO)
└── ayuda/
    ├── index.tsx               (Stack Raíz - Índice de ayuda)
    └── [...slug].tsx           (Stack Raíz - Catch-all para artículos dinámicos)
```

**Puntos clave del árbol:**

- `menu/` y `carrito/` declaran su propio `_layout.tsx` con un `Stack`: así, al navegar al detalle de un plato o a la nota, **la barra de tabs inferior permanece visible**.
- `cocina/` usa un `Drawer` y solo se registra en el Stack raíz cuando hay sesión activa (renderizado condicional en `_layout.tsx`), lo que implementa la protección de rutas de la Parte F2.
- `ayuda/[...slug].tsx` es un **catch-all** que absorbe rutas arbitrarias como `/ayuda/pagos/tarjeta`.
- `pedido.tsx` es una ruta legacy que redirige a `/carrito` con `<Redirect>` (equivale a un `replace`, evita bucles al pulsar "atrás").

## 2. Justificación Arquitectónica: `replace` vs `push` en Confirmación

En el flujo de confirmación de pedido (`/confirmar`), se utilizó estrictamente `router.replace('/turno/[numero]')` en lugar de `router.push()`.

**Motivo:** Si utilizáramos `push`, la pantalla de confirmación permanecería en el historial (la Pila) de Expo Router. Si el usuario presiona el botón físico de "Atrás" en su dispositivo después de ver su turno, volvería a la pantalla de `/confirmar` y podría enviar el pedido por duplicado por error. Al usar `replace`, sobrescribimos la pantalla de confirmación en el tope de la pila por la pantalla del turno, asegurando un flujo de navegación unidireccional y seguro.

Además, `confirmarPedido()` devuelve el número de turno recién generado, de modo que la navegación se hace en un solo pasaje:

```ts
const numeroTurno = confirmarPedido("Sin nota");
router.replace(`/turno/${numeroTurno}`); // nunca push
```

## 3. Deep Link de Prueba

Para probar la apertura directa del detalle de un plato mediante un **Deep Link** en el entorno de desarrollo de Expo Go, utilizá la siguiente URL en el navegador de tu dispositivo móvil (ambos dispositivos deben estar en la misma red Wi-Fi):

**URL de Prueba:**

```
exp://192.168.1.12:8081/--/menu/4
```

> La IP `192.168.1.12` es la que imprime la consola de `npx expo start` en la red local (`Waiting on exp://…`). Si tu red cambia, reemplazala por la IP nueva que muestre Metro.

Esta URL abrirá directamente la **Milanesa con puré** (`id: "4"`, ver `src/data/platos.ts`) manteniendo la estructura de pestañas inferior gracias a la configuración `anchor: '(tabs)'` definida en `unstable_settings` del layout raíz:

```ts
export const unstable_settings = {
  initialRouteName: "(tabs)",
  anchor: "(tabs)",
};
```

## 4. Esquema de Navegación: los tres niveles

| Nivel | Navigator       | Dónde                                                    | Por qué                                                                                                                          |
| ----- | --------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 1     | `Stack`         | `src/app/_layout.tsx`                                    | Pila raíz que aísla los flujos globales (tabs, modales de `confirmar`/`login`, rutas dinámicas) y aplica la protección de rutas. |
| 2     | `Tabs`          | `src/app/(tabs)/_layout.tsx`                             | Tres pestañas principales (Inicio, Menú, Carrito) con `tabBarActiveTintColor: #007AFF`.                                          |
| 3     | `Stack` anidado | `(tabs)/menu/_layout.tsx` y `(tabs)/carrito/_layout.tsx` | Mantiene visible la barra de tabs al profundizar dentro de un flujo.                                                             |
| —     | `Drawer`        | `src/app/cocina/_layout.tsx`                             | Zona restringida de cocina con dos vistas: Cola de Pedidos y Historial. Requiere `GestureHandlerRootView` en la raíz.            |

**Aislamiento de estado:** cada anidamiento conserva su propio historial. El usuario puede entrar y salir del detalle de un plato sin perder la lista de categorías, y la pestaña Carrito conserva su scroll y su pila interna al cambiar de tab.

## 5. Estado Global: Context, Pila y Cola

`src/context/GlobalContext.tsx` exporta `ComedorProvider` (que envuelve toda la app en el layout raíz) y el hook `useComedor()`.

| Estructura      | Tipo            | Implementación            | Uso en la app                                                                                      |
| --------------- | --------------- | ------------------------- | -------------------------------------------------------------------------------------------------- |
| `pilaCarrito`   | **Pila — LIFO** | `src/estructuras/Pila.ts` | El carrito se apila; `deshacerUltimo()` hace `pop()` (deshacer el último plato agregado).          |
| `colaPedidos`   | **Cola — FIFO** | `src/estructuras/Cola.ts` | Los pedidos se encolan al confirmar; la cocina hace `desencolar()` → atiende siempre el más viejo. |
| `pilaAtendidos` | **Pila — LIFO** | `src/estructuras/Pila.ts` | Historial de atendidos; `atendidos.tsx` lo invierte para mostrar lo más reciente primero.          |

**Flujo del pedido:**

1. Cliente agrega platos (`push` a la pila del carrito).
2. `confirmarPedido()` encola el pedido, limpia el carrito y devuelve el número de turno.
3. La pantalla `/turno/[numero]` muestra la posición en la cola y el tiempo estimado (3 min por pedido adelante).
4. La cocina llama `atenderSiguiente()` → `desencolar()` + `push` al historial.

## 6. Requisitos, Arranque y Acceso Restringido

**Requisitos:** Node.js 20+ y [Expo Go](https://expo.dev/go) en tu teléfono. El gestor de paquetes del repo es **pnpm** (`pnpm-lock.yaml`).

```bash
pnpm install       # instalar dependencias
npx expo start     # levantar Metro (imprime QR y la URL exp:// con tu IP local)
```

Escaneá el QR con Expo Go o abrí la URL `exp://<tu-ip>:8081` en el navegador del dispositivo.

**Acceso a la zona de cocina (Parte F2):**

- Ruta: `/login` (modal). Credenciales hardcodeadas según el TP → usuario `cocina`, contraseña `1234`.
- Al iniciar sesión, el layout raíz registra la ruta `cocina` en el Stack; al cerrar sesión, la ruta `cocina` deja de existir y se registra `login` en su lugar. Esto hace que la protección no dependa de guards manuales en cada pantalla.
- Desde `cocina/` se accede al Drawer con la cola de pedidos activos y el historial LIFO.

**Comandos útiles:**

```bash
pnpm start        # desarrollo
pnpm start --web  # probar en navegador
pnpm tsc --noEmit      # chequeo de tipos
```
