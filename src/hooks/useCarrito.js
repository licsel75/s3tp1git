import useLocalStorage from './useLocalStorage';

const STORAGE_KEY = 'catamarca-ama-leer:carrito';

function useCarrito() {
  const [carrito, setCarrito] = useLocalStorage(STORAGE_KEY, []);

  // Agregar un producto (si ya está, suma 1)
  const agregar = (producto) => {
    // Al usar (prev) => { ... }, nos aseguramos de estar trabajando siempre con la última versión del estado en el momento exacto en que React lo actualiza.
    setCarrito((prev) => {
      // priemro  buscar si existe el producto en el carrrito 
      const yaEsta = prev.find((item) => item.id === producto.id);

      // Si ya está en el carrito
      if (yaEsta) {
        // Si ya llegó al stock, no hace nada
        if (yaEsta.cantidad >= producto.stock) return prev;
        // Si no, suma 1
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      // Si no está, lo agrega con cantidad 1
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };




  // Cambiar cantidad (suma o resta)
  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id !== id) return item;

          const nuevaCantidad = item.cantidad + delta; // parametro recibido (1 o -1)

          // No puede superar el stock
          if (nuevaCantidad > item.stock) return item;

          return { ...item, cantidad: nuevaCantidad };
        })
        // Si la cantidad llegó a 0 o menos, se saca del carrito
        .filter((item) => item.cantidad > 0)
    );
  };





  // Quitar un producto del carrito
  const quitar = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // Vaciar todo el carrito
  const vaciar = () => {
    setCarrito([]);
  };

  // Dato derivado: ¿está en el carrito?
  const estaEnElCarrito = (id) => carrito.some((item) => item.id === id);

  // Dato derivado: cantidad total de items
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Dato derivado: total en pesos
  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );



  // retora un objeto con ocho propiedades
  return {
    carrito,// array con los libros que el usuario agrgegó
    cantidadTotal,// 3 por ejemplo
    total,// 47000 por ejemplo
    estaEnElCarrito,// funciones 
    agregar,// funciones
    cambiarCantidad,// funciones
    quitar,// funciones
    vaciar,// funciones
  };
}

export default useCarrito;