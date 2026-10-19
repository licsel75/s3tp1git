import { useCarritoContext } from '../../context/CarritoContext';
import { useThemeContext } from '../../context/ThemeContext';

function Navbar({ onAbrirCarrito }) {
  const { cantidadTotal } = useCarritoContext();
  const { tema, toggleTema } = useThemeContext();

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md dark:bg-gray-800 dark:border-b dark:border-gray-700">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-4 py-4">
        <h1 className="text-2xl font-bold text-primary font-display dark:text-secondary">
          Catamarca Ama Leer
        </h1>

        <div className="flex items-center gap-4">
          {/* Botón de Tema */}
          <button
            type="button"
            onClick={toggleTema}
            aria-label="Cambiar tema"
            className="text-2xl p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {tema === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Botón del Carrito */}
          <button
            type="button"
            onClick={onAbrirCarrito}
            className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary transition-colors flex items-center gap-2"
          >
            Carrito
            {cantidadTotal > 0 && (
              <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                {cantidadTotal}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;