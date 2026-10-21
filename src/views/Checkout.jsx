import { useForm } from 'react-hook-form';
import { useCarritoContext } from '../context/CarritoContext';
import { formatearPrecio } from '../utils/formato';
import { useProductosContext } from '../context/ProductosContext'; // nuevo importar productos desde el context



function Checkout({ onVolver, onConfirmarPedido }) {
  const { carrito, total } = useCarritoContext();
  const { descontarStock } = useProductosContext(); // <-- NUEVO

  // 1. Inicializamos RHF con defaultValues (para el radio)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },  } = useForm({
    defaultValues: {
      metodoEnvio: 'domicilio',
    },
  });

  // 2. watch para el campo condicional
  const metodoEnvio = watch('metodoEnvio');





  // 3. onSubmit: armamos el pedido a mano, solo se ejecuta si pasaron todas las validaciones RHF
  const onSubmit = (datos) => {
    const pedido = {
      cliente: {
        nombre: datos.nombre,
        email: datos.email,
        telefono: datos.telefono,
        // Trampa de RHF: si es retiro, forzamos null
        direccion: datos.metodoEnvio === 'domicilio' ? datos.direccion : null,
      },
      envio: datos.metodoEnvio,
      notas: datos.notas,
      items: carrito, // Traído del CarritoContext
      total, // Traído del CarritoContext

    };




    // DESCONTAMOS EL STOCK ACÁ
    descontarStock(carrito);


    console.log('Pedido confirmado:', pedido);
    onConfirmarPedido(datos.nombre);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-text dark:text-white font-display">
        Finalizar Compra
      </h2>

      <div className="max-w-xl mx-auto flex flex-col gap-8">
        {/*  Resumen , antes izqierga, ahora central*/}
        <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-800 h-fit">
          <h3 className="text-xl font-bold mb-4 text-text dark:text-white">Resumen del pedido</h3>

          <ul className="flex flex-col gap-4 mb-6">
            {carrito.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-2 dark:border-gray-700">
                <div>
                  <p className="font-semibold text-text dark:text-white">{item.nombre}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cant: {item.cantidad}</p>
                </div>
                <p className="font-semibold text-text dark:text-white">
                  {formatearPrecio(item.precio * item.cantidad)}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center text-xl font-bold pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-text dark:text-white">Total:</span>
            <span className="text-primary dark:text-secondary">{formatearPrecio(total)}</span>
          </div>
        </div>








        {/* DATOS DE ENVIO : Formulario RHFahora central también */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-800 flex flex-col gap-4">
          <h3 className="text-xl font-bold mb-2 text-text dark:text-white">Datos de envío</h3>

          {/* Campo 1: Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold mb-1 dark:text-gray-300">Nombre completo *</label>
            <input
              id="nombre"
              type="text"
              aria-invalid={errors.nombre ? "true" : "false"}
              aria-describedby={errors.nombre ? "error-nombre" : undefined}
              {...register('nombre', {
                required: 'El nombre es obligatorio',
                minLength: { value: 3, message: 'Mínimo 3 caracteres' }
              })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.nombre && <p id="error-nombre" className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>}
          </div>

          {/* Campo 2: Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1 dark:text-gray-300">Email *</label>
            <input
              id="email"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "error-email" : undefined}
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }
              })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.email && <p id="error-email" className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Campo 3: Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-semibold mb-1 dark:text-gray-300">Teléfono *</label>
            <input
              id="telefono"
              type="tel"
              {...register('telefono', {
                required: 'El teléfono es obligatorio',
                pattern: { value: /^[0-9]+$/, message: 'Solo se permiten números' },
                minLength: { value: 8, message: 'Mínimo 8 dígitos' }
              })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>}
          </div>

          {/* Campo 4: Método de envío */}
          <div>
            <span className="block text-sm font-semibold mb-1 dark:text-gray-300">Método de envío *</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 dark:text-white">
                <input type="radio" value="domicilio" {...register('metodoEnvio')} />
                A domicilio
              </label>
              <label className="flex items-center gap-2 dark:text-white">
                <input type="radio" value="retiro" {...register('metodoEnvio')} />
                Retiro en el local
              </label>
            </div>
          </div>

          {/* Campo 5: Dirección (Condicional) */}
          {metodoEnvio === 'domicilio' && (
            <div>
              <label htmlFor="direccion" className="block text-sm font-semibold mb-1 dark:text-gray-300">Dirección *</label>
              <input
                id="direccion"
                type="text"
                {...register('direccion', { required: 'La dirección es obligatoria si es a domicilio' })}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion.message}</p>}
            </div>
          )}

          {/* Campo 6: Notas */}
          <div>
            <label htmlFor="notas" className="block text-sm font-semibold mb-1 dark:text-gray-300">Notas (opcional)</label>
            <textarea
              id="notas"
              rows="2"
              {...register('notas', { maxLength: { value: 200, message: 'Máximo 200 caracteres' } })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
            ></textarea>
            {errors.notas && <p className="text-red-500 text-sm mt-1">{errors.notas.message}</p>}
          </div>

          {/* Campo 7: Términos */}
          <div>
            <label className="flex items-center gap-2 dark:text-white">
              <input
                type="checkbox"
                {...register('aceptaTerminos', { required: 'Debés aceptar los términos' })}
              />
              Acepto los términos y condiciones
            </label>
            {errors.aceptaTerminos && <p className="text-red-500 text-sm mt-1">{errors.aceptaTerminos.message}</p>}
          </div>

          {/* Botones */}
          <div className="flex flex-col gap-3 mt-4">





            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-secondary transition-colors"
            >
              Confirmar Pedido
            </button>





            <button
              type="button"
              onClick={onVolver}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Volver a la tienda
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Checkout;