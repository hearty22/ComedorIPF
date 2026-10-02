// src/data/platos.ts
export type Categoria = "desayuno" | "almuerzo" | "bebidas" | "kiosco";

export interface Plato {
  id: string;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
}

export const platosMock: Plato[] = [
  {
    id: "1",
    nombre: "Café con leche",
    precio: 1500,
    descripcion: "Taza grande",
    categoria: "desayuno",
  },
  {
    id: "2",
    nombre: "Medialunas (3)",
    precio: 1200,
    descripcion: "De manteca",
    categoria: "desayuno",
  },
  {
    id: "3",
    nombre: "Tostado de jamón y queso",
    precio: 2500,
    descripcion: "En pan de miga",
    categoria: "desayuno",
  },
  {
    id: "4",
    nombre: "Milanesa con puré",
    precio: 4500,
    descripcion: "De carne o pollo",
    categoria: "almuerzo",
  },
  {
    id: "5",
    nombre: "Fideos con tuco",
    precio: 3800,
    descripcion: "Tallarines caseros",
    categoria: "almuerzo",
  },
  {
    id: "6",
    nombre: "Ensalada César",
    precio: 4000,
    descripcion: "Con pollo crocante",
    categoria: "almuerzo",
  },
  {
    id: "7",
    nombre: "Agua mineral 500ml",
    precio: 800,
    descripcion: "Sin gas",
    categoria: "bebidas",
  },
  {
    id: "8",
    nombre: "Coca Cola 500ml",
    precio: 1200,
    descripcion: "Sabor original",
    categoria: "bebidas",
  },
  {
    id: "9",
    nombre: "Jugo de naranja",
    precio: 1000,
    descripcion: "Exprimido natural",
    categoria: "bebidas",
  },
  {
    id: "10",
    nombre: "Alfajor de maicena",
    precio: 900,
    descripcion: "Relleno abudante",
    categoria: "kiosco",
  },
  {
    id: "11",
    nombre: "Barrita de cereal",
    precio: 600,
    descripcion: "Manzana y avena",
    categoria: "kiosco",
  },
  {
    id: "12",
    nombre: "Paquete de galletitas",
    precio: 1100,
    descripcion: "Surtidas dulces",
    categoria: "kiosco",
  },
];
