import { createContext, useContext, useState } from 'react';
import { productos as productosIniciales } from '../data/productos';

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

export function useProductosContext() {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error("useProductosContext debe usarse dentro de ProductosProvider");
  }
  return context;
}