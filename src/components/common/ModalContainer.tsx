import React from "react";

type ModalContainerProps = {
  children: React.ReactNode;
  open: boolean;
  closeModal?: () => void;
  tailwindClassName?: string;
  modalClassName?: string;
  modalRef?: React.RefObject<HTMLDivElement>;
};

const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  open,
  closeModal,
  tailwindClassName,
  modalClassName,
  modalRef,
}) => {
  return open ? (
    <div
      id="modal"
      ref={modalRef}
      onClick={closeModal}
      className={`bg-black/20 overflow-y-scroll ${modalClassName} fixed left-0 top-0 w-full h-full flex items-center justify-center
             !z-[9000]`}
    >
      <div
        className={` ${tailwindClassName}`}
        onClick={(evt) => evt.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default ModalContainer;
