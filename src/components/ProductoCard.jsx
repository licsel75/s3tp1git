import { formatearPrecio } from '../utils/formato';
import { useCarritoContext } from '../context/CarritoContext';

function ProductoCard({ producto }) {
  const { estaEnElCarrito, agregar, carrito } = useCarritoContext();

  // Buscamos si ya está en el carrito para saber cuántos hay
  const itemEnCarrito = carrito.find((item) => item.id === producto.id);
  const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;

  const enCarrito = estaEnElCarrito(producto.id);
  const sinStock = producto.stock === 0;
  const llegoAlLimite = cantidadEnCarrito >= producto.stock;

  return (
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col dark:bg-gray-800 dark:border dark:border-gray-700">
      {/* Badge Destacado */}
      {producto.destacado && (
        <span className="bg-accent text-white text-xs font-bold px-2 py-1 self-start m-3 rounded">
          DESTACADO
        </span>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-text mb-1 dark:text-white">
          {producto.nombre}
        </h3>
        <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">
          {producto.autor}
        </p>
        
        <div className="mt-auto">
          <p className="text-xl font-bold text-primary dark:text-secondary mb-1">
            {formatearPrecio(producto.precio)}
          </p>
          
          {/* Mostrar stock o mensaje de encargo */}
          {sinStock ? (
            <p className="text-sm font-semibold text-red-500 mb-4">
              Sin stock (se consigue por encargo)
            </p>
          ) : (
            <p className="text-xs text-gray-500 mb-4 dark:text-gray-400">
              Stock disponible: {producto.stock} unidades
            </p>
          )}

          {/* Botón de agregar */}
          <button
            type="button"
            onClick={() => agregar(producto)}
            disabled={sinStock || llegoAlLimite}
            className={`w-full py-2 rounded-lg font-semibold transition-colors ${
              sinStock
                ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                : llegoAlLimite
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : enCarrito
                ? "bg-secondary text-white hover:bg-primary"
                : "bg-primary text-white hover:bg-secondary"
            }`}
          >
            {sinStock
              ? "No disponible"
              : llegoAlLimite
              ? "Límite alcanzado"
              : enCarrito
              ? "✓ Agregar otro"
              : "+ Agregar al carrito"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductoCard;