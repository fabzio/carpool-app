import { ConfirmationModal, DropdownList } from "@components";
import { useSelector } from "@hooks";
import { useEffect, useState } from "react";
import { mapTravelText } from "../../utils";
import { TravelState } from "@interfaces/enums/TravelState";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Importar useQueryClient
import PassengerService from "@services/passenger.service";
import QueryKeys from "@constants/queryKeys.constants";

export default function PassengerActions() {
  const { user } = useSelector((state) => state.user);
  const { selectedTravel, setSelectedTravel } = useSelector(
    (state) => state.travel
  );
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const queryClient = useQueryClient(); // Obtener el query client

  const { mutate, isSuccess } = useMutation({
    mutationFn: (newState: TravelState) =>
      PassengerService.modifyRequest({
        travelId: selectedTravel?.id!,
        travelState: newState,
      }),
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.MY_TRAVELS],
      });
      setShowConfirmationModal(false);
    },
    onError: (_, __, context) => {
      setSelectedTravel(context!.previusState);
    },
  });

  const handleClose = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirm = () => {
    if (selectedTravel) {
      mutate("CANCELED"); // Pasar el nuevo estado como argumento
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowConfirmationModal(false);
    }
  }, [isSuccess]);

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
          disabled={selectedTravel?.state === "CANCELED"}
        />
      )}
      {selectedTravel?.state !== "CANCELED" && (
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
        <h1 className="text-2xl font-bold">Cancelar participación</h1>
        <p>¿Estás segur@ de que deseas cancelar tu participación?</p>
      </ConfirmationModal>
    </div>
  );
}
