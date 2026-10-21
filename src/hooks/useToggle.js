// Importamos el hook useState de React.
import { useState } from 'react';

// Declaramos el hook. Recibe un valor inicial (por defecto es false).
function useToggle(initialValue = false) {
  
  //  Creamos el estado. El valor inicial será el que le pasemos (true o false).
  // Usamos useState porque no necesitamos persistencia en el disco (localStorage).
  const [value, setValue] = useState(initialValue);

  // Función TOGGLE: invierte el valor actual.
  // Usamos la función de actualización (prev) para asegurarnos de que estamos
  // invirtiendo el valor más reciente, evitando problemas con múltiples clics.
  const toggle = () => setValue((prev) => !prev);

  //  Función SET TRUE: fuerza el valor a true (útil si querés abrir algo sin importar su estado).
  const setTrue = () => setValue(true);

  // Función SET FALSE: fuerza el valor a false (útil para cerrar algo).
  const setFalse = () => setValue(false);

  //  Retornamos un ARRAY (como useState) con el valor y las 3 funciones.
  return [value, toggle, setTrue, setFalse];
}

//  Exportamos el hook por defecto para usarlo en cualquier componente.
export default useToggle;