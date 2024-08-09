import { useQueries } from "@tanstack/react-query";
import moment from "moment";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { TravelRequest } from "@interfaces/models/travel";
import { SeatsStatus } from "@components";
import QueryKeys from "@constants/queryKeys.constants";
import PassengerService from "@services/passenger.service";
import TravelService from "@services/travel.service";
import { capitalize } from "@utils/capitalize";
import PassengerActions from "./PassengerActions";

interface Props {
  request: Partial<TravelRequest>;
}

export default function RequestPassengerView({ request }: Props) {
  const travelId = request?.id;
  const passengerCode = request?.ownerCode;
  const [{ data: passengerDetail }, { data: travelPassengers }] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.PASSENGER_DETAIL, passengerCode],
        queryFn: () => PassengerService.getPassengerByCode(passengerCode!),
      },
      {
        queryKey: [QueryKeys.TRAVEL_PASSENGERS, travelId],
        queryFn: () => TravelService.getTravelPassengers(travelId!),
        enabled: !!travelId,
      },
    ],
  });
  const totalPassengers = travelPassengers?.length!;
  const otherPassengers = travelPassengers?.filter(
    (passenger) => passenger.name != passengerDetail?.name
  );
  const unkwonPassengers = totalPassengers - travelPassengers?.length!;

  return (
    <article className="px-4 py-1 flex flex-col h-full">
      <header className="flex flex-col py-2">
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl">
            {capitalize(passengerDetail?.name) + " 🤚"}
          </h2>
          <a
            className="btn btn-circle"
            href={`https://wa.me/51${passengerDetail?.phone}`}
            target="_blank"
          >
            <IconBrandWhatsapp color="green" />
          </a>
        </div>

        <span
          className={`badge ${
            request?.direction ? "badge-primary" : "badge-secondary"
          }`}
        >
          {request?.direction ? "Ida" : "Vuelta"}
        </span>
      </header>
      <main className="flex-grow">
        <section>
          <p className="text-xl text-accent font-bold text-pretty">
            {`${
              request?.direction
                ? "Quiere llegar a la universidad "
                : "Quiere salir de la universidad "
            }${moment(request?.travelDate).calendar()}`}
          </p>

          <SeatsStatus
            maxSeats={totalPassengers}
            reservedSeats={totalPassengers}
          />
        </section>
        <section className="py-1"></section>
        <section>
          {totalPassengers - 1 > 0 && (
            <p className="text-base-content text-opacity-70">
              {`Nos acompaña${totalPassengers - 1 > 1 ? "n" : ""}`}{" "}
            </p>
          )}
          <ul className="flex gap-2">
            {otherPassengers?.map((passenger, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <strong>{capitalize(passenger.name.split(" ")[0])}</strong>
                <a
                  className="btn btn-circle"
                  href={`https://wa.me/51${passenger.phone}`}
                  target="_blank"
                >
                  <IconBrandWhatsapp color="green" />
                </a>
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
      </main>
      <footer>
        <PassengerActions />
      </footer>
    </article>
  );
}
