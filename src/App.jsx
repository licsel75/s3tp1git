import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import CarritoModal from './components/CarritoModal';
import Tienda from './views/Tienda';

function App() {
  // Estado para el modal (UI local)
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-surface dark:bg-gray-900 transition-colors">
      <Navbar onAbrirCarrito={() => setModalAbierto(true)} />
      
      <Tienda />

      <CarritoModal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onIrAlCheckout={() => {
          setModalAbierto(false);
          alert("Próximamente: Checkout (Paso 7)");
        }}
      />
    </div>
  );
}

export default App;