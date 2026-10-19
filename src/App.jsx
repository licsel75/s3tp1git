import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import CarritoModal from './components/CarritoModal';
import Tienda from './views/Tienda';
import Checkout from './views/Checkout';
import Confirmacion from './views/Confirmacion';
import { VISTAS } from './data/vistas';
import { useCarritoContext } from './context/CarritoContext';
import Footer from './components/layout/Footer';

function App() {
  const { vaciar, carrito } = useCarritoContext();
  
  // Estados para la UI de App
  const [modalAbierto, setModalAbierto] = useState(false);
  const [vistaActual, setVistaActual] = useState(VISTAS.TIENDA);
  const [nombreCliente, setNombreCliente] = useState('');

  // Función que se pasa al Checkout cuando se confirma el pedido
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

  return (
    <div className="min-h-screen bg-surface dark:bg-gray-900 transition-colors flex flex-col">
      <Navbar onAbrirCarrito={() => setModalAbierto(true)} />
      
      {/* Renderizado condicional de la vista */}
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