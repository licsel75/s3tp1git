# Catamarca Ama Leer - Tienda

🔗 **Demo:** [https://tu-app-12345.netlify.app](https://tu-app-12345.netlify.app)

## Qué es
Una tienda online de libros con catálogo, carrito de compras con cantidades, modo oscuro persistido y un flujo de checkout con validaciones.

## Cómo correrlo
```bash
pnpm install
pnpm run dev

Mis contextos
CarritoContext: Guarda el carrito de compras (productos y cantidades). Es global porque el Navbar (para el contador), el Modal (para ver el carrito) y el Checkout (para mostrar el resumen) lo necesitan al mismo tiempo.

ThemeContext: Guarda el tema actual ('light' o 'dark'). Es global porque el color de fondo afecta a toda la aplicación y el Navbar necesita el botón para cambiarlo.

Mis hooks
useLocalStorage: Recibe una clave y un valor inicial, y devuelve el valor y su setter. Es genérico y persiste datos.

useCarrito: Usa useLocalStorage por dentro. Devuelve el carrito, el total, la cantidad total, y las funciones agregar, cambiarCantidad, quitar y vaciar.

useToggle: Recibe un booleano inicial y devuelve el valor y funciones para cambiarlo.

Decisiones de estado
Buscador (searchTerm): Vive como useState dentro de views/Tienda.jsx. No está en un contexto porque solo lo necesita esa vista. Pasarlo a un contexto global sería excesivo.

Vista actual (vistaActual): Vive en App.jsx. Solo App necesita saber qué pantalla renderizar.

Modal abierto: Vive como useState en App.jsx porque solo controla la visibilidad de un componente visual.

Prop drilling: antes y después
Antes de usar Context, el carrito tendría que pasar por props desde App hasta el Navbar, el Modal, el Checkout y la Confirmación. Eran más de 3 niveles de props pasando de largo. Ahora, todos esos componentes consumen el CarritoContext directamente, y pasamos cero props relacionadas al carrito.

Qué generé con IA
Utilicé ChatGPT para repasar conceptos de React, estructurar el proyecto y resolver dudas con RHF. Todo el código fue escrito, adaptado y comprendido por mí.