import { SeatsStatus } from "@components";
import QueryKeys from "@constants/queryKeys.constants";
import { useQueryStore } from "@hooks";
import PassengerService from "@services/passenger.service";
import TravelService from "@services/travel.service";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { capitalize } from "@utils/capitalize";
import { formatCurrency } from "@utils/formatCurrency";
import moment from "moment";

interface Props {
  handleClose: () => void;
}
export default function RequestPassengerView({ handleClose }: Props) {
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
        queryKey: [QueryKeys.TRAVEL_DETAIL, travelId],
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
    mutationFn: (travelId: string) => PassengerService.joinRequest(travelId!),
    onMutate: () => {
      const previus = data;
      setQueryStore((curr) =>
        curr?.map((travel) => {
          if (travel.travelId === travelId) {
            return { ...travel, seats: travel.seats! + 1 };
          }
          return travel;
        })
      );
      handleClose();
      return { previus };
    },
    onSuccess: () => {
      queryClient.cancelQueries({
        queryKey: [QueryKeys.TRAVELS, travelId],
      });
    },
    onError: (_, __, context) => {
      setQueryStore(() => context?.previus!);
    },
  });
  const handleJoinRequest = () => {
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
            {capitalize(passengerDetail?.name.split(" ")[0]) + " 🙋"}
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
            onClick={handleJoinRequest}
          >
            Unirme
          </button>
        </section>
      </main>
    </article>
  );
}
