import { useRef } from "react";

interface Props {
  visible: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

export default function TravelModal({ visible, handleClose, children }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  if (visible) {
    modalRef.current?.showModal();
  } else {
    modalRef.current?.close();
  }

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        {children}
        <form method="dialog">
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>close</button>
      </form>
    </dialog>
  );
}
