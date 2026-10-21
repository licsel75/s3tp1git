//  Importamos las funciones necesarias de React.
// createContext: crea el "canal" de comunicación.
// useContext: permite a los componentes "sintonizar" ese canal.
import { createContext, useContext, useEffect } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

//createContext() crea un objeto de contexto en blanco.
const ThemeContext = createContext(null);


//provider
export function ThemeProvider({ children }) {
  // Estado del tema persistido en localStorage
  const [tema, setTema] = useLocalStorage('catamarca-ama-leer:tema', 'light');



  // Efecto: aplicar la clase 'dark' al <html>
  // sincronizaación con el DOM real 
  useEffect(() => {
    const root = document.documentElement;
    if (tema === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [tema]);

  // Función para alternar el tema
  const toggleTema = () => {
    setTema((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const valor = { tema, toggleTema };

  return (
    <ThemeContext.Provider value={valor}>
      {children}
    </ThemeContext.Provider>
  );
}


// custom hooks de consumo
//  Creamos nuestro Custom Hook Consumidor (el que van a usar los componentes).
export function useThemeContext() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error(
      'useThemeContext() tiene que usarse adentro de <ThemeProvider>'
    );
  }

  return contexto;
}