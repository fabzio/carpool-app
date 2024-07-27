import { SeatsStatus } from "@components";
import QueryKeys from "@constants/queryKeys.constants";
import { useQueryStore } from "@hooks";
import DriverService from "@services/driver.service";
import TravelService from "@services/travel.service";
import { useQueries } from "@tanstack/react-query";
import { capitalize } from "@utils/capitalize";
import { formatCurrency } from "@utils/formatCurrency";
import moment from "moment";

export default function PassengerView() {
  const { data: storedTravels } = useQueryStore<GenericTravel[]>(
    QueryKeys.TRAVELS
  );
  const travelSelected = storedTravels?.find((item) => item.selected);
  const travelId = travelSelected?.travelId;
  const driverCode = travelSelected?.userCode;
  const [{ data: driverDetail }, { data: travelPassengers }] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.DRIVER_DETAIL, driverCode],
        queryFn: () => DriverService.getDriverByCode(driverCode!),
        enabled: !!travelSelected,
      },
      {
        queryKey: [QueryKeys.TRAVEL_DETAIL, travelId],
        queryFn: () => TravelService.getTravelPassengers(travelId!),
        enabled: !!travelId,
      },
    ],
  });
  const totalPassengers = driverDetail?.seats! - travelSelected?.freeSeats!;
  const unkwonPassengers = totalPassengers - travelPassengers?.length!;

  return (
    <article>
      <header className="flex flex-col py-2">
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl ">
            {capitalize(driverDetail?.name.split(" ")[0]) + " 🚘"}
          </h2>
          <span className="text-2xl font-bold ">
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
                ? "Llega a la universidad "
                : "Sale de la universidad "
            }${moment(travelSelected?.travelDate).calendar()}`}
          </p>

          <SeatsStatus
            maxSeats={travelSelected?.seats!}
            reservedSeats={driverDetail?.seats! - travelSelected?.freeSeats!}
          />
        </section>
        <section className="py-1">
          <p className="text-lg text-balance">{driverDetail?.route}</p>
        </section>
        <section>
          {travelPassengers?.length! > 0 && (
            <p className="text-base-content text-opacity-70">
              {`Nos acompaña${totalPassengers > 1 ? "n" : ""}`}{" "}
            </p>
          )}
          <ul className="flex gap-2">
            {travelPassengers?.map((passenger, idx) => (
              <li key={idx} className="font-bold">
                {capitalize(passenger.name.split(" ")[0])}
              </li>
            ))}
          </ul>
          {unkwonPassengers > 0 && (
            <p className="text-base-content text-opacity-70">{`y ${unkwonPassengers} persona${
              unkwonPassengers > 1 ? "s" : ""
            } más`}</p>
          )}
          {travelSelected?.freeSeats! > 0 && (
            <p className="text-base-content text-opacity-70">{`Queda espacio para ${
              travelSelected?.freeSeats
            } persona${travelSelected?.freeSeats! > 1 ? "s" : ""} `}</p>
          )}
        </section>
        <section className="flex justify-end">
          <button
            className="btn btn-primary animate-pulse"
            disabled={travelSelected?.freeSeats === 0}
          >
            Vamos!
          </button>
        </section>
      </main>
    </article>
  );
}
