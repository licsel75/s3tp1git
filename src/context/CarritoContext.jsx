//  Importamos las funciones necesarias de React.
// createContext: crea el "canal" de comunicación.
// useContext: permite a los componentes "sintonizar" ese canal.
import { createContext, useContext } from 'react';
//  Importamos nuestro hook personalizado.
// Acá no escribimos la lógica del carrito (agregar, quitar, etc.), 
// solo la importamos. Esto mantiene el Context limpio
import useCarrito from '../hooks/useCarrito';

// Creamos el contexto con un valor inicial de null.
// IMPORTANTE: Esta variable NO tiene la palabra "export".
// Si la exportáramos, cualquiera podría usar useContext(CarritoContext) 
// y saltearse el guardia de seguridad que creamos más abajo.
const CarritoContext = createContext(null);






// Creamos el componente "Proveedor" (Provider).
// Recibe "children" (que es todo lo que envuelve en main.jsx, o sea, <App />).
export function CarritoProvider({ children }) {
  // Ejecutamos nuestro hook personalizado.
  // useCarrito() nos devuelve un objeto con { carrito, total, agregar, quitar, etc. }
  const valor = useCarrito();
  // Retornamos el Provider inyectando ese objeto.
  // Todo lo que esté adentro de <CarritoContext.Provider> va a tener acceso a "valor".
  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
}







//  Creamos nuestro Custom Hook Consumidor (el que van a usar los componentes).
export function useCarritoContext() {
   //  "Sintonizamos" el canal.
  // useContext busca el Provider más cercano hacia arriba en el árbol de componentes.
  const contexto = useContext(CarritoContext);
  //  EL GUARDIA (Pattern de seguridad).
  // Si un componente intenta usar este hook pero no está envuelto por el Provider,
  // "contexto" va a ser null. Si es null, tiramos un error claro.
  if (!contexto) {
    throw new Error(
      'useCarritoContext() tiene que usarse adentro de <CarritoProvider>'
    );
  }
  //  Si pasó el guardia, significa que hay un Provider.
  // Devolvemos el objeto con el carrito y todas las funciones.
  return contexto;
}