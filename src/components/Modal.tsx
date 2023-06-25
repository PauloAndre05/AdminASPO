import React, { FC, ReactNode, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 top-20 flex items-center justify-center overflow-y-auto overflow-hidden"
      onClick={handleClickOutside}
    >
      <div className="fixed inset-0 transition-opacity">
        <div className="bg-gray-900 absolute inset-0 opacity-75"></div>
      </div>
      <div
        ref={modalRef}
        className="relative mx-5 w-full max-w-lg rounded-lg bg-boxdark dark:bg-white p-6 md:mx-auto "
      >
        <button
          className="text-gray-500 hover:text-gray-700 absolute right-0 top-0 mr-4 mt-4"
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
