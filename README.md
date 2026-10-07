# PrograIV-TP1-IvanRoman-Parcial

# 🎬 Cine Prisma - Sistema Integral de Gestión y Venta de Entradas para Cine

Cine Prisma es una aplicación web progresiva (PWA) desarrollada como trabajo práctico integrador para la materia **Programación IV**[cite: 5, 8]. La plataforma ofrece una solución completa para la gestión de salas, cartelera, venta de entradas, confitería y programas de fidelización, con control de roles diferenciados[cite: 4].

---

## 🚀 Stack Tecnológico

* **Frontend:** Angular (con componentes *standalone* de última generación)[cite: 5, 8] y TypeScript[cite: 5].
* **Estilos y UI:** CSS moderno adaptado a diseño único y responsivo[cite: 6].
* **Backend y Base de Datos (BaaS):** Supabase (Autenticación, Base de Datos en tiempo real y almacenamiento)[cite: 5].
* **Arquitectura:** Progressive Web App (PWA)[cite: 5, 8].

---

## 📋 Módulos y Funcionalidades Principales

1. **Cartelera y Catálogo Inteligente:**
   * Visualización destacada de las películas más vendidas en la pantalla principal[cite: 6, 11].
   * Buscador dinámico con filtros avanzados por género[cite: 11].
   * Fichas con metadatos completos: duración, sinopsis, imagen oficial, formatos (2D, 3D, 4D, 5D), idioma y restricciones etarias (ATP, +13, +18) con advertencias de acompañamiento adulto[cite: 6, 9, 14].
   * Sección de *Próximamente* y sistema de preventa configurable (hasta 7 días antes del estreno)[cite: 6].

2. **Mapa de Salas y Selección en Tiempo Real:**
   * Distribución estructurada en 20 filas (A a T) con columnas adaptadas[cite: 6, 9, 14].
   * Zonas especiales: Filas intermedias **J y K adaptadas para personas con discapacidad** y últimas filas (**R, S y T) de categoría VIP** con sobreprecio[cite: 6, 14].
   * Selección interactiva de butacas con sincronización de ocupación en tiempo real[cite: 6, 14].

3. **Autenticación y Perfil de Usuario:**
   * Registro con campos específicos requeridos por la administración (incluyendo datos de perfil y preferencias)[cite: 7, 9].
   * Sistema de beneficios que incluye cupones dinámicos de primera compra y descuentos especiales para mayores de 50 años[cite: 7, 12].
   * Historial visual *"Mis películas"* con calificaciones, comentarios y puntuación promedio[cite: 7, 11].
   * Política de cancelaciones (hasta 2 horas antes de la función) con acreditación de saldo a favor en cuenta[cite: 7].

4. **Confitería (Candy Bar) y Combos:**
   * Catálogo categorizado de productos (pochoclos, bebidas, etc.)[cite: 7, 12].
   * Combos destacados a precio fijo configurable que se integran al flujo de compra y comparten el mismo código QR de retiro[cite: 7, 12].

5. **Fidelización (Puntos):**
   * Acumulación automática de 1 punto por cada peso gastado en entradas o confitería[cite: 7, 15].
   * Canje de recompensas por entradas gratuitas o productos del Candy Bar[cite: 7, 15].

6. **Panel de Administración, Operaciones y Validación:**
   * Gestión centralizada de salas, funciones, precios y configuraciones del sistema[cite: 7, 13].
   * Interfaz operativa para empleados destinada al **escaneo y validación de códigos QR** (tanto para acceso a salas como retiro de confitería) con opción de ingreso manual ante fallas y autoinvalidación tras su uso[cite: 7, 13].
   * Reportes de facturación diarios con capacidad de **exportación a PDF y Excel**, gráficos estadísticos de visualización y **log de actividad de auditoría** con marca de tiempo[cite: 7].

---

## 🛠️ Decisiones Técnicas y Arquitectura

* **Componentes Standalone:** Se optó por la arquitectura moderna de Angular sin módulos (`NgModule`), lo que optimiza el rendimiento general, simplifica la carga de dependencias y acelera los tiempos de compilación.
* **Integración con Supabase:** Se utiliza Supabase como un BaaS robusto para desacoplar la lógica de persistencia, garantizando la seguridad mediante políticas de acceso a datos (*Row Level Security*) y autenticación rápida por tokens.
* **Gestión de Estados y Datos:** Estructuración modular mediante servicios dedicados y archivos de datos estáticos/dinámicos (`peliculas.data.ts`) para mantener la separación de incumbencias y facilitar las pruebas locales.
