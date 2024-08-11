import { ConfirmationModal } from "@components";
import { useSelector } from "@hooks";
import type { Passenger } from "@interfaces/models/passenger";
import PassengerService from "@services/passenger.service";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface Props {
  passengerCode: Passenger["code"];
}

export default function PassengerActions({ passengerCode }: Props) {
  const navigate = useNavigate();
  const { selectedTravel } = useSelector((state) => state.travel);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { mutate, isSuccess } = useMutation({
    mutationFn: () =>
      PassengerService.modifyJoinRequest({
        travelId: selectedTravel?.id!,
        passengerCode: passengerCode,
        joinState: false,
      }),
    onSuccess: () => {
      navigate(-1);
      setShowConfirmationModal(false);
      toast.success("Participación cancelada");
    },
  });
  const handleClose = () => {
    setShowConfirmationModal(false);
  };
  const handleConfirm = () => {
    mutate();
  };

  return (
    <div className="grid grid-cols-2">
      {selectedTravel?.state === "CREATED" && (
        <button
          className="btn btn-error col-span-2"
          onClick={() => setShowConfirmationModal(true)}
        >
          Cancelar participación
        </button>
      )}
      {
        selectedTravel?.state ==="CANCELED"&&(
          <button className="btn"></button>
        )
      }
      <ConfirmationModal
        visible={showConfirmationModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      >
        <h1 className="text-2xl font-bold">Cancelar participación</h1>
        <p className="text-center text-pretty">
          ¿Estás segur@ de que deseas cancelar tu participación?
        </p>
      </ConfirmationModal>
    </div>
  );
}
