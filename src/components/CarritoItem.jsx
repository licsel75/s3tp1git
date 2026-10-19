import { formatearPrecio } from '../utils/formato';

function CarritoItem({ item, onSumar, onRestar, onQuitar }) {
  return (
    <li className="flex flex-col gap-2 bg-surface rounded-lg p-4 border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-text dark:text-white">{item.nombre}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{item.autor}</p>
        </div>
        <button
          type="button"
          onClick={() => onQuitar(item.id)}
          aria-label={`Quitar ${item.nombre}`}
          className="text-red-500 hover:text-red-700 font-bold text-lg px-2"
        >
          ×
        </button>
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onRestar(item.id)}
            aria-label={`Restar uno de ${item.nombre}`}
            className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            -
          </button>
          <span className="font-semibold text-text dark:text-white">{item.cantidad}</span>
          <button
            type="button"
            onClick={() => onSumar(item.id)}
            aria-label={`Sumar uno de ${item.nombre}`}
            disabled={item.cantidad >= item.stock}
            className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            +
          </button>
        </div>
        <p className="font-semibold text-primary dark:text-secondary">
          {formatearPrecio(item.precio * item.cantidad)}
        </p>
      </div>
    </li>
  );
}

export default CarritoItem;