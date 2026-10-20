import { useState } from 'react'; //Importamos el hook useState para manejar los estados locales de la UI (interfaz).

//  Importamos los componentes de diseño (Layout) y el modal.
import Navbar from './components/layout/Navbar';
import CarritoModal from './components/CarritoModal';
import Footer from './components/layout/Footer';

//  Importamos las 3 vistas que se van a ir alternando en la pantalla.
import Tienda from './views/Tienda';
import Checkout from './views/Checkout';
import Confirmacion from './views/Confirmacion';

// Importamos las constantes de las vistas (para evitar errores de tipeo) y el Contexto del carrito.
import { VISTAS } from './data/vistas';
import { useCarritoContext } from './context/CarritoContext';


function App() {

   //  Traemos del contexto global solo lo que App necesita: 
   // el carrito (para validar si está vacío) y la función para vaciarlo.
  const { vaciar, carrito } = useCarritoContext();
  

  //  Estados locales de la UI: 
  //  modalAbierto: controla si se ve o no el panel del carrito.
  //  vistaActual: arranca en TIENDA y define qué pantalla se renderiza.  
  const [modalAbierto, setModalAbierto] = useState(false);// el modal no se ve
  const [vistaActual, setVistaActual] = useState(VISTAS.TIENDA);// vista principal, productos 
  // nombreCliente: guarda el nombre para pasárselo a la pantalla de Confirmación.
  const [nombreCliente, setNombreCliente] = useState('');

   // Esta función la ejecuta el Checkout cuando el usuario aprieta "Confirmar Pedido".
  // Recibe el nombre, guarda el nombre en el estado, vacía el carrito y cambia la vista a "Gracias".
  const handleConfirmarPedido = (nombre) => {
    setNombreCliente(nombre);
    vaciar(); // Vaciamos el carrito
    setVistaActual(VISTAS.CONFIRMACION); // Pasamos a la vista de gracias
  };


  // Si intentan ir al checkout con el carrito vacío, no los dejamos
  const handleIrAlCheckout = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío. Agregá algo antes de ir al checkout.");
      return;
    }
    setModalAbierto(false);
    setVistaActual(VISTAS.CHECKOUT);
  };


  //  Acá empieza el Layout. 
  // "flex flex-col" y "min-h-screen" aseguran que el Footer siempre quede abajo de todo.
  return (
    <div className="min-h-screen bg-surface dark:bg-gray-900 transition-colors flex flex-col">
      {/* 10. El Navbar recibe una prop (callback) para abrir el modal cuando tocan el botón "Carrito". */}
      <Navbar onAbrirCarrito={() => setModalAbierto(true)} />
      
  
       {/* Renderizado condicional: Si la vista actual es TIENDA, mostramos el componente <Tienda />. */}
       {/* "flex-grow" hace que este div ocupe todo el espacio central disponible. */}
      <div className="flex-grow">
        {vistaActual === VISTAS.TIENDA && <Tienda />}
        
        {vistaActual === VISTAS.CHECKOUT && (
          <Checkout 
            onVolver={() => setVistaActual(VISTAS.TIENDA)}
            onConfirmarPedido={handleConfirmarPedido}
          />
        )}
        
        {vistaActual === VISTAS.CONFIRMACION && (
          <Confirmacion 
            nombreCliente={nombreCliente}
            onVolverALaTienda={() => setVistaActual(VISTAS.TIENDA)}
          />
        )}


      </div>
          <Footer />
      {/* Modal del carrito (solo se ve en la tienda, por lógica) */}
      <CarritoModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onIrAlCheckout={handleIrAlCheckout}
      />
    </div>
  );
}

export default App;