//  Importamos las funciones necesarias de React.
// createContext: crea el "canal" de comunicación.
// useContext: permite a los componentes "sintonizar" ese canal.
import { createContext, useContext, useState } from 'react';

import { productos as productosIniciales } from '../data/productos';

//  Creamos el contexto (NO se exporta)
const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  // 1. Guardamos el catálogo en un estado para poder modificarlo
  const [productos, setProductos] = useState(productosIniciales);

  // 2. Función que se ejecuta al confirmar la compra
  const descontarStock = (itemsComprados) => {
    setProductos((prevProductos) =>
      prevProductos.map((prod) => {
        // Buscamos si el producto que se está comprando está en el carrito
        const itemComprado = itemsComprados.find((item) => item.id === prod.id);
        
        if (itemComprado) {
          // Si está, le restamos la cantidad que se lleva
          return { ...prod, stock: prod.stock - itemComprado.cantidad };
        }
        
        // Si no se compró, queda igual
        return prod; 
      })
    );
  };

  return (
    <ProductosContext.Provider value={{ productos, descontarStock }}>
      {children}
    </ProductosContext.Provider>
  );
}




//  Creamos nuestro Custom Hook Consumidor (el que van a usar los componentes).
export function useProductosContext() {
  const context = useContext(ProductosContext);
  //validación 
  if (!context) {
    throw new Error("useProductosContext debe usarse dentro de ProductosProvider");
  }
  return context;
}