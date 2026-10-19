import { useState } from 'react';
import CarritoModal from './components/CarritoModal';
import { useCarritoContext } from './context/CarritoContext';
import { productos } from './data/productos';
import { formatearPrecio } from './utils/formato';

function App() {
  const { agregar, cantidadTotal } = useCarritoContext();
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <div className="min-h-screen bg-surface dark:bg-gray-900 p-6">
      <header className="flex justify-between items-center mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-text dark:text-white">Catamarca Ama Leer - Prueba</h1>
        <button 
          onClick={() => setModalAbierto(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold"
        >
          Carrito ({cantidadTotal})
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {productos.slice(0, 6).map((prod) => (
          <div key={prod.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="font-bold dark:text-white">{prod.nombre}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-2">{formatearPrecio(prod.precio)}</p>
            <button 
              onClick={() => agregar(prod)}
              className="bg-primary text-white px-4 py-2 rounded w-full"
            >
              + Agregar
            </button>
          </div>
        ))}
      </div>

      <CarritoModal 
        isOpen={modalAbierto} 
        onClose={() => setModalAbierto(false)} 
        onIrAlCheckout={() => alert('Próximamente: Checkout')}
      />
    </div>
  );
}

export default App;