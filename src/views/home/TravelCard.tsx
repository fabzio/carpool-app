import { SeatsStatus } from "@components";
import { SetQueryStoreAction, useQueryStore, useSelector } from "@hooks";
import { IconClock } from "@tabler/icons-react";
import { capitalize } from "@utils/capitalize";
import { formatCurrency } from "@utils/formatCurrency";
import moment from "moment";

export default function TravelCard({
  travelId,
  name,
  direction,
  fee,
  travelDate,
  travelType,
  seats,
  freeSeats,
  preview,
}: GenericTravel) {
  const { theme } = useSelector((state) => state.theme);
  const { setQueryStore } = useQueryStore<GenericTravel[]>("travels");
  const isLight = theme === "light";
  const isOffer = travelType === "offer";

  return (
    <article
      className={`card card-compact shadow-xl bg-gradient-to-b from-transparent ${
        preview
          ? "blur-xs animate-pulse"
          : ` ${isLight ? "to-base-200" : "to-base-300"}`
      }`}
      onClick={selectTravel(travelId, setQueryStore)}
    >
      <div className="card-body">
        <header className="flex flex-col">
          <div className="flex justify-between h-4 items-center">
            <time
              className="text-accent font-bold"
              dateTime={moment(travelDate).format()}
            >
              {moment(travelDate).isSame(moment(), "day")
                ? "Hoy"
                : moment(travelDate).isSame(moment().add(1, "day"), "day")
                ? "Mañana"
                : moment(travelDate).format("DD/MM/YYYY")}
            </time>
            <span className="font-bold text-base">
              {fee && formatCurrency(fee)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="card-title font-bold text-2xl">
              {capitalize(name.split(" ")[0])}
            </h2>
            <span aria-label={isOffer ? "offer" : "request"}>
              {isOffer ? "🚘" : "🙋"}
            </span>
          </div>
        </header>
        <main className="flex flex-col">
          <section>
            <span
              className={`badge ${
                direction ? "badge-primary" : "badge-secondary"
              }`}
            >
              {direction ? "Ida" : "Vuelta"}
            </span>
          </section>
          <section>
            <SeatsStatus
              maxSeats={seats}
              reservedSeats={isOffer ? seats - freeSeats! : seats}
            />
          </section>
          <section className="flex flex-col text-base-content text-opacity-70 items-end">
            <span className="">
              {isOffer
                ? direction
                  ? landsOfferText
                  : offOfferText
                : direction
                ? landsRequestText
                : offRequestText}
            </span>
            <time className="flex justify-end gap-1 font-bold">
              <IconClock size={16} strokeWidth={3} />
              {moment(travelDate).format("hh:mm a")}
            </time>
          </section>
        </main>
      </div>
    </article>
  );
}

const offOfferText = "Sale";
const landsOfferText = "Llega";
const offRequestText = "Quiere salir";
const landsRequestText = "Quiere llegar";

const selectTravel =
  (
    travelId: GenericTravel["travelId"],
    setQueryStore: SetQueryStoreAction<GenericTravel[]>
  ) =>
  () => {
    setQueryStore((current) => {
      return current.map((travel) => ({
        ...travel,
        selected: travel.travelId === travelId,
      }));
    });
  };
