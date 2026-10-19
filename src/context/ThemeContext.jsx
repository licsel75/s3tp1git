import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Estado del tema persistido en localStorage
  const [tema, setTema] = useLocalStorage('catamarca-ama-leer:tema', 'light');

  // Efecto: aplicar la clase 'dark' al <html>
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

export function useThemeContext() {
  const contexto = useContext(ThemeContext);

  if (!contexto) {
    throw new Error(
      'useThemeContext() tiene que usarse adentro de <ThemeProvider>'
    );
  }

  return contexto;
}