import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { ConfirmationModal, DropdownList } from "@components";
import { useSelector } from "@hooks";
import { useState } from "react";
import { mapTravelText } from "../../utils";
import { TravelState } from "@interfaces/enums/TravelState";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Importar useQueryClient
import PassengerService from "@services/passenger.service";
import QueryKeys from "@constants/queryKeys.constants";

export default function PassengerActions() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { selectedTravel, setSelectedTravel } = useSelector(
    (state) => state.travel
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (newState: TravelState) => {
      if (newState === "CANCELED")
        return PassengerService.modifyJoinRequest({
          passengerCode: user?.code!,
          travelId: selectedTravel?.id!,
          joinState: false,
        });

      return PassengerService.modifyRequest({
        travelId: selectedTravel?.id!,
        travelState: newState,
      });
    },
    onMutate: (newState) => {
      const previus = selectedTravel;
      setSelectedTravel({
        ...selectedTravel!,
        state: newState,
      });
      return {
        previusState: previus,
      };
    },
    onSuccess: (_, newState) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MY_TRAVELS],
      });
      setShowConfirmationModal(false);
      if (newState === "CANCELED") {
        toast.success("Participación cancelada");
        navigate(-1);
      } else toast.success("Estado actualizado");
    },
    onError: ({ message }, __, context) => {
      setSelectedTravel(context!.previusState);
      toast.error(message);
    },
  });

  const handleClose = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirm = () => {
    if (selectedTravel) {
      mutate("CANCELED");
    }
  };

  return (
    <div className="grid grid-cols-2 w-full">
      {selectedTravel?.ownerCode === user?.code && (
        <DropdownList
          onSelect={(value) => {
            const newState = Object.values(TravelState).find(
              (val) => mapTravelText[val] === value
            ) as TravelState;
            if (newState && selectedTravel) {
              mutate(newState);
            }
          }}
          values={Object.values(TravelState)
            .filter((state) => state !== "CANCELED" && state !== "WAITING")
            .map((state) => mapTravelText[state])}
          selectedValue={mapTravelText[selectedTravel?.state!]}
          disabled={(["CANCELED", "OFF"] as TravelState[]).includes(
            selectedTravel?.state!
          )}
        />
      )}
      {!(["CANCELED", "OFF"] as TravelState[]).includes(
        selectedTravel?.state!
      ) && (
        <button
          className="btn btn-error col-span-2 w-full"
          onClick={() => setShowConfirmationModal(true)}
        >
          Cancelar
        </button>
      )}
      <ConfirmationModal
        visible={showConfirmationModal}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      >
        <h1 className="text-2xl font-bold text-center">
          Cancelar participación
        </h1>
        <p className="text-center text-pretty">
          ¿Estás segur@ de que deseas cancelar tu participación?
        </p>
      </ConfirmationModal>
    </div>
  );
}
