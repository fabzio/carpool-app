import { useSelector } from "@hooks";
import { IconClock, IconUser, IconUserFilled } from "@tabler/icons-react";
import { capitalize } from "@utils/capitalize";
import { formatCurrency } from "@utils/formatCurrency";
import moment from "moment";

export default function TravelCard({
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
  const isLight = theme === "light";
  const isOffer = travelType === "offer";
  const offOfferText = "Sale";
  const landsOfferText = "Llega";
  const offRequestText = "Quiere salir";
  const landsRequestText = "Quiere llegar";
  return (
    <article
      className={`card card-compact shadow-xl bg-gradient-to-b from-transparent  ${
        preview
          ? "blur-xs animate-pulse"
          : ` ${isLight ? "to-base-200" : "to-base-300"}`
      }`}
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
            <div className="flex py-1" aria-label="seat availability">
              {Array.from({ length: isOffer ? seats - freeSeats! : seats }).map(
                (_, idx) => (
                  <IconUserFilled key={idx} />
                )
              )}
              {Array.from({ length: freeSeats! }).map((_, idx) => (
                <IconUser key={idx} />
              ))}
            </div>
          </section>
          <section className="flex flex-col text-base-content text-opacity-70 items-end">
            <span className="">
              {isOffer
                ? direction
                  ? offOfferText
                  : landsOfferText
                : direction
                ? offRequestText
                : landsRequestText}
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
