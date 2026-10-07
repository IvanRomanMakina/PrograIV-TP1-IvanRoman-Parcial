// src/app/peliculas.data.ts

export interface Pelicula {
  id: number;
  titulo: string;
  genero: string;
  imagen: string;
}

export const LISTA_PELICULAS: Pelicula[] = [
  {
    id: 1,
    titulo: 'Dune: Parte Dos',
    genero: 'Ciencia Ficción / Aventura',
    imagen: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    titulo: 'Oppenheimer',
    genero: 'Drama / Histórica',
    imagen: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    titulo: 'Spider-Man: Across the Spider-Verse',
    genero: 'Animación / Acción',
    imagen: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    titulo: 'Interestelar',
    genero: 'Ciencia Ficción / Suspenso',
    imagen: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80'
  }
];