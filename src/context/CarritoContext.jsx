import { createContext, useContext } from 'react';
import useCarrito from '../hooks/useCarrito';

// 1. Creamos el contexto (NO se exporta)
const CarritoContext = createContext(null);

// 2. Creamos el Provider
export function CarritoProvider({ children }) {
  // Usamos nuestro hook por dentro
  const valor = useCarrito();

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
}

// 3. Creamos el hook consumidor (con guardia)
export function useCarritoContext() {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error(
      'useCarritoContext() tiene que usarse adentro de <CarritoProvider>'
    );
  }

  return contexto;
}