import React from "react";

type ModalContainerProps = {
  children: React.ReactNode;
  open: boolean;
  closeModal?: () => void;
  tailwindClassName?: string;
  modalClassName?: string;
  showCloseIcon?: boolean;
  modalRef?: React.RefObject<HTMLDivElement>;
};

const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  open,
  closeModal,
  tailwindClassName,
  modalClassName,
  showCloseIcon,
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
      {/* {showCloseIcon && (
                <span className="material-icons text-white text-3xl absolute right-4 sm:right-9 top-6 cursor-pointer font-bold bg-opacity-100">
                    close
                </span>
            )} */}
    </div>
  ) : null;
};

export default ModalContainer;
