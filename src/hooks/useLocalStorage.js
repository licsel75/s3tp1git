import { useState, useEffect } from 'react';





function useLocalStorage(key, initialValue) {




  //forma incorrecta, borra el localstorage cada vez que carga
//const [carrito, setCarrito] = useState([]); // Arranca vacío

// Efecto 1: Carga del disco al montar
//useEffect(() => {
  //const saved = localStorage.getItem('carrito');
  //if (saved) setCarrito(JSON.parse(saved));
//}, []);
// Efecto 2: Guarda en el disco cuando cambia
//useEffect(() => {
  //localStorage.setItem('carrito', JSON.stringify(carrito));
//}, [carrito]); 



//forma correcta
//lee al cargar la página

//  Declaramos el estado 'value' y su función modificadora 'setValue'.
  // Pasamos una función al useState (Lazy Initialization) para que este código 
  // se ejecute ÚNICAMENTE en el primer render y no en cada actualización.
  const [value, setValue] = useState(() => {
    
    //  Usamos 'try' para intentar leer localStorage sin que la app falle si algo sale mal.
    try {
      // Buscamos en el almacenamiento local del navegador si existe un valor bajo esa 'key'.
      const saved = localStorage.getItem(key);
      
      // Si existe algo guardado ('saved' no es null), lo convertimos de texto a formato JS (JSON.parse).
      // Si no existe nada guardado, devolvemos el valor por defecto ('initialValue').
      return saved ? JSON.parse(saved) : initialValue;
      
    } catch (error) {
      //  Si ocurre un fallo (ej: el JSON está corrupto o el navegador bloquea cookies/storage),
      // capturamos el error y lo mostramos en la consola para depuración.
      console.error(`Error al leer localStorage (${key}):`, error);
      
      //  En caso de error, aseguramos que la app no se rompa devolviendo el 'initialValue'.
      return initialValue;
    }
  });







  //guarda cada vez que hay una actualización.

// Declaramos el efecto para sincronizar los cambios de React con una fuente externa (localStorage).
  useEffect(() => {

    //  Usamos 'try' para capturar posibles errores que puedan ocurrir al intentar escribir en disco.
    try {
      //  Convertimos 'value' (objeto, array, número, etc.) a texto plano mediante JSON.stringify,
      // ya que localStorage solo permite almacenar cadenas de texto, y lo guardamos bajo esa 'key'.
      localStorage.setItem(key, JSON.stringify(value));

    } catch (error) {
      //  Si falla la escritura (ej: se superó la cuota de almacenamiento permitida por el navegador
      // o el usuario navega en un modo privado muy restrictivo), capturamos el fallo.
      console.error(`Error al guardar en localStorage (${key}):`, error);
    }

  //   Array de dependencias: este efecto se ejecutará al montarse el componente
  // y CADA VEZ que el identificador 'key' o el dato 'value' cambien.
  }, [key, value]);






  // Función para borrar la clave de localStorage
  const removeFromStorage = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error al borrar localStorage (${key}):`, error);
    }
  };

  return [value, setValue, removeFromStorage];
}

export default useLocalStorage;