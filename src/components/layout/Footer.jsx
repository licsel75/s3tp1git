function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Catamarca Ama Leer - Tienda Oficial
        </p>
        <p className="text-sm text-gray-500 mt-1 dark:text-gray-500">
          © {anioActual} - Hecho con React y Tailwind
        </p>
      </div>
    </footer>
  );
}

export default Footer;