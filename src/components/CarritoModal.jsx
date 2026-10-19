import Modal from './ui/Modal';
import CarritoItem from './CarritoItem';
import { useCarritoContext } from '../context/CarritoContext';
import { formatearPrecio } from '../utils/formato';

function CarritoModal({ isOpen, onClose, onIrAlCheckout }) {
  const { carrito, total, cambiarCantidad, quitar, vaciar } = useCarritoContext();

  const handleSumar = (id) => cambiarCantidad(id, 1);
  const handleRestar = (id) => cambiarCantidad(id, -1);

  const handleVaciar = () => {
    const confirmado = confirm("¿Seguro que querés vaciar el carrito?");
    if (confirmado) vaciar();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-text font-display dark:text-white">
          Mi Carrito ({carrito.length})
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="text-gray-500 hover:text-text text-2xl leading-none dark:text-gray-400 dark:hover:text-white"
        >
          ×
        </button>
      </header>

      {/* Lista de items */}
      <div className="flex-grow overflow-y-auto p-4">
        {carrito.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Tu carrito está vacío. ¡Buscá algo para leer! 📚
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {carrito.map((item) => (
              <CarritoItem
                key={item.id}
                item={item}
                onSumar={handleSumar}
                onRestar={handleRestar}
                onQuitar={quitar}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      {carrito.length > 0 && (
        <footer className="p-4 border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-4 text-xl font-bold dark:text-white">
            <span>Total:</span>
            <span className="text-primary dark:text-secondary">{formatearPrecio(total)}</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={onIrAlCheckout}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Ir al Checkout
            </button>
            <button
              type="button"
              onClick={handleVaciar}
              className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
            >
              Vaciar carrito
            </button>
          </div>
        </footer>
      )}
    </Modal>
  );
}

export default CarritoModal;