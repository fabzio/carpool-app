import QueryKeys from "@constants/queryKeys.constants";
import { useSelector } from "@hooks";
import { TravelOffer } from "@interfaces/models/travel";
import DriverService from "@services/driver.service";
import TravelService from "@services/travel.service";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useQueries } from "@tanstack/react-query";
import moment from "moment";
import { mapTravelText } from "../../utils";
import DriverActions from "./DriverActions";
import PassengerActions from "./PassengerActions";
import { capitalize } from "@utils/capitalize";

interface Props {
  offer: Partial<TravelOffer>;
}

export default function OfferDetail({ offer }: Props) {
  const { type, user } = useSelector((state) => state.user);
  const [{ data: driverDetail }, { data: travelPassengers }] = useQueries({
    queries: [
      {
        queryKey: [QueryKeys.DRIVER_DETAIL, offer.ownerCode],
        queryFn: () => DriverService.getDriverByCode(offer.ownerCode!),
      },
      {
        queryKey: [QueryKeys.TRAVEL_PASSENGERS, offer.id],
        queryFn: () => TravelService.getTravelPassengers(offer.id!),
      },
    ],
  });

  const totalPassengers = driverDetail?.seats! - offer.freeSeats!;
  const unknownPassengers = totalPassengers - travelPassengers?.length!;

  return (
    <article className="px-4 py-2 flex flex-col  h-full">
      <header className="flex flex-col py-2">
        <div className="flex justify-between">
          <h2 className="font-bold text-3xl text-nowrap">
            {capitalize(driverDetail?.name.split(" ")[0]) + " 🚘"}
          </h2>
          <span className="text-2xl font-bold text-right">
            {mapTravelText[offer.state!]}
          </span>
        </div>

        <span
          className={`badge ${
            offer.direction ? "badge-primary" : "badge-secondary"
          }`}
        >
          {offer.direction ? "Ida" : "Vuelta"}
        </span>
      </header>
      <main className="flex-grow">
        <section>
          <p className="text-xl text-accent font-bold text-pretty">
            {`${
              offer.direction
                ? "Llega a la universidad "
                : "Sale de la universidad "
            }${moment(offer.travelDate).calendar()}`}
          </p>
        </section>
        <section className="py-1">
          <p className="text-lg text-balance">{driverDetail?.route}</p>
        </section>

        <section className="py-2 flex justify-between">
          <div>
            <p className="text-lg badge badge-outline">{driverDetail?.plate}</p>
            <p>{driverDetail?.vehicleDescription}</p>
          </div>
          <div className="flex items-center">
            <a
              href={`https://wa.me/51${driverDetail?.phone}`}
              target="_blank"
              className="btn btn-circle"
            >
              <IconBrandWhatsapp color={"green"} />
            </a>
          </div>
        </section>
        <section>
          {travelPassengers?.length! > 0 && (
            <p className="text-base-content text-opacity-70">
              {`Nos acompaña${totalPassengers > 1 ? "n" : ""}`}{" "}
            </p>
          )}
          <ul className="flex flex-col gap-2">
            {travelPassengers?.map((passenger, idx) => (
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
          {unknownPassengers > 0 && (
            <p className="text-base-content text-opacity-70">{`y ${unknownPassengers} persona${
              unknownPassengers > 1 ? "s" : ""
            } más`}</p>
          )}
          {offer.freeSeats! > 0 && (
            <p className="text-base-content text-opacity-70">{`Queda espacio para ${
              offer.freeSeats
            } persona${offer.freeSeats! > 1 ? "s" : ""} `}</p>
          )}
        </section>
      </main>
      <footer className="">
        {type === "driver" ? (
          <DriverActions driverCode={user?.code!} />
        ) : (
          <PassengerActions passengerCode={user?.code!} />
        )}
      </footer>
    </article>
  );
}
