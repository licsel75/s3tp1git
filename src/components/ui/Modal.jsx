import { useEffect } from 'react';

function Modal({ isOpen, onClose, children }) {
  // Bonus: Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    
    // Limpieza del efecto (¡muy importante!)
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      {/* Clic en el fondo oscuro para cerrar */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      
      {/* Contenido del modal */}
      <div className="relative bg-white w-full max-w-md h-full flex flex-col shadow-xl dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}

export default Modal;