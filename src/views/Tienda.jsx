import { useState } from 'react';
// import { productos } from '../data/productos'; borrado para trabajar con context
import ProductoList from '../components/ProductoList';
import { useProductosContext } from '../context/ProductosContext';

function Tienda() {
   const { productos } = useProductosContext(); // <-- NUEVO
  const [searchTerm, setSearchTerm] = useState('');

  // Filtro derivado (el buscador NO está en el contexto)
  const productosFiltrados = productos.filter((prod) =>
    prod.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prod.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador */}
        <div className="mb-8">
          <label htmlFor="search" className="sr-only">Buscar libros</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título o autor..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-secondary dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Grilla */}
        <ProductoList productos={productosFiltrados} searchTerm={searchTerm} />
      </div>
    </main>
  );
}

export default Tienda;