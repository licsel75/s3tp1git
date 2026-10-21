import { StrictMode } from 'react'; // evitar malas prácticas, se muestran errorres en consola
import { createRoot } from 'react-dom/client'; // permite enganchar App con el HTML real
import App from './App.jsx'; // importamos el componenten principal


// importamos los contextos para envolver la App , todos los hiojs pueden acceder a estados globlales
import { CarritoProvider } from './context/CarritoContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { ProductosProvider } from './context/ProductosContext.jsx';

import './index.css';// importamos css global (tailwind ,variables @theme)


//  Buscamos el <div id="root"> que está en el index.html y creamos la raíz de React ahí.
// Montamos toda la aplicación dentro de StrictMode.
// ThemeProvider va arriba de todo porque el tema (modo claro/oscuro) afecta a TODA la app. 
// CarritoProvider  provee el carrito, el total, y las funciones de agregar/quitar a todos los componentes.
//renderizamos App. Como está adentro de los dos Provider, puede leer el contexto sin problemas.
createRoot(document.getElementById('root')).render(
  <StrictMode>  
    <ThemeProvider>  
      <CarritoProvider> 
          <ProductosProvider>  {/* <-- NUEVO */}
          <App />
        </ProductosProvider>
      </CarritoProvider>
    </ThemeProvider>
  </StrictMode>
);