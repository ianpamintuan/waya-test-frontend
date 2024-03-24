import React from "react";

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <div
      onClick={onClose}
      className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full
            ${open ? "visible bg-black/20" : "hidden"}
          `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
              bg-white rounded-xl shadow p-6 m-8 transition-all
              ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
            `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
