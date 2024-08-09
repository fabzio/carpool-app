import { SeatsStatus } from "@components";
import QueryKeys from "@constants/queryKeys.constants";
import { useQueryStore, useSelector } from "@hooks";
import type { Driver } from "@interfaces/models/driver.d.ts";
import DriverService from "@services/driver.service";
import PassengerService from "@services/passenger.service";
import TravelService from "@services/travel.service";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { capitalize } from "@utils/capitalize";
import { formatCurrency } from "@utils/formatCurrency";
import moment from "moment";

interface Props {
  handleClose: () => void;
}

export default function RequestDriverView({ handleClose }: Props) {
  const { user } = useSelector((state) => state.user);
  const { data: storedTravels } = useQueryStore<GenericTravel[]>(
    QueryKeys.TRAVELS
  );
  const travelSelected = storedTravels?.find((item) => item.selected);
  const travelId = travelSelected?.travelId;
  const passengerCode = travelSelected?.userCode;
  const [{ data: passengerDetail }, { data: travelPassengers }] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.PASSENGER_DETAIL, passengerCode],
        queryFn: () => PassengerService.getPassengerByCode(passengerCode!),
        enabled: !!travelSelected,
      },
      {
        queryKey: [QueryKeys.TRAVEL_PASSENGERS, travelId],
        queryFn: () => TravelService.getTravelPassengers(travelId!),
        enabled: !!travelId,
      },
    ],
  });
  const queryClient = useQueryClient();
  const { data, setQueryStore } = useQueryStore<GenericTravel[]>(
    QueryKeys.TRAVELS
  );
  const { mutate } = useMutation({
    mutationFn: (travelId: string) =>
      DriverService.takeTravelRequest({
        customFee: (user as Driver).fee,
        travelId,
      }),
    onMutate: () => {
      const previus = data;
      setQueryStore((curr) =>
        curr?.filter((travel) => travel.travelId !== travelId)
      );
      return { previus };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.TRAVELS],
      });

      handleClose();
    },
    onError: (_, __, context) => {
      setQueryStore(() => context?.previus!);
    },
  });
  const handleTakeRequest = () => {
    mutate(travelSelected?.travelId!);
  };
  const totalPassengers = travelSelected?.seats!;
  const otherPassengers = travelPassengers?.filter(
    (passenger) => passenger.name != passengerDetail?.name
  );
  const unkwonPassengers = totalPassengers - travelPassengers?.length!;

  return (
    <article>
      <header className="flex flex-col py-2">
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl">
            {capitalize(passengerDetail?.name.split(" ")[0]) + " 🤚"}
          </h2>
          <span className="text-2xl font-bold">
            {formatCurrency(travelSelected?.fee)}{" "}
          </span>
        </div>

        <span
          className={`badge ${
            travelSelected?.direction ? "badge-primary" : "badge-secondary"
          }`}
        >
          {travelSelected?.direction ? "Ida" : "Vuelta"}
        </span>
      </header>
      <main>
        <section>
          <p className="text-xl text-accent font-bold text-pretty">
            {`${
              travelSelected?.direction
                ? "Quiere llegar a la universidad "
                : "Quiere salir de la universidad "
            }${moment(travelSelected?.travelDate).calendar()}`}
          </p>

          <SeatsStatus
            maxSeats={totalPassengers}
            reservedSeats={totalPassengers}
          />
        </section>
        <section className="py-1">
          <p className="text-lg text-balance">{travelSelected?.customPoint}</p>
        </section>
        <section>
          {totalPassengers - 1 > 0 && (
            <p className="text-base-content text-opacity-70">
              {`Nos acompaña${totalPassengers - 1 > 1 ? "n" : ""}`}{" "}
            </p>
          )}
          <ul className="flex gap-2">
            {otherPassengers?.map((passenger, idx) => (
              <li key={idx} className="font-bold">
                {capitalize(passenger.name.split(" ")[0])}
              </li>
            ))}
          </ul>
          {unkwonPassengers > 0 && (
            <p className="text-base-content text-opacity-70">{`${
              otherPassengers?.length! > 0 ? "y" : ""
            } ${unkwonPassengers} persona${
              unkwonPassengers > 1 ? "s" : ""
            } más`}</p>
          )}
        </section>
        <section className="flex justify-end">
          <button
            className="btn btn-primary animate-pulse"
            onClick={handleTakeRequest}
          >
            Tomar viaje
          </button>
        </section>
      </main>
    </article>
  );
}
