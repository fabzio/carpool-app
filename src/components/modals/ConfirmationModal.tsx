import { IconAlertTriangle } from "@tabler/icons-react";
import { useRef } from "react";

interface Props {
  visible: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  children: React.ReactNode;
}

export default function ConfirmationModal({
  children,
  handleClose,
  handleConfirm,
  visible,
}: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  if (visible) {
    modalRef.current?.showModal();
  } else {
    modalRef.current?.close();
  }
  return (
    <dialog ref={modalRef} className="modal modal-middle">
      <div className="modal-box">
        <strong className="flex justify-center">
          <IconAlertTriangle size={64} />
        </strong>
        <main>{children}</main>
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <div className="modal-action justify-around">
          <button className="btn btn-warning" onClick={handleConfirm}>
            Aceptar
          </button>
          <button className="btn btn-info" onClick={handleClose}>
            Regresar
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
}
