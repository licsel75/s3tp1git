function Confirmacion({ nombreCliente, onVolverALaTienda }) {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full dark:bg-gray-800">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-bold text-primary mb-4 dark:text-secondary font-display">
          ¡Gracias por tu compra, {nombreCliente}!
        </h2>
        <p className="text-gray-600 mb-8 dark:text-gray-300">
          Tu pedido ha sido procesado con éxito. Pronto te contactaremos con los detalles del envío.
        </p>
        <button
          type="button"
          onClick={onVolverALaTienda}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
        >
          Volver a la tienda
        </button>
      </div>
    </main>
  );
}

export default Confirmacion;