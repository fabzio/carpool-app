import { IconUser, IconUserFilled } from "@tabler/icons-react";
import { capitalize } from "@utils/capitalize";
import { formatCurrency } from "@utils/formatCurrency";
import moment from "moment";

export interface Props {
  travel_id: string;
  travel_type: string;
  name: string;
  direction: string;
  travel_date: string;
  fee?: number;
  seats: number;
  free_seats?: number;
}

export default function TravelCard({
  name,
  direction,
  fee,
  travel_date,
  travel_type,
  seats,
  free_seats,
}: Props) {
  const isOffer = travel_type === "offer";

  return (
    <article className="card card-compact shadow-xl bg-base-100 ">
      <div className="card-body flex flex-col">
        <div className="flex justify-end h-3 font-bold text-base">
          {fee && formatCurrency(fee)}
        </div>
        <header className="flex items-center gap-2">
          <h2 className="card-title font-bold text-2xl">
            {capitalize(name.split(" ")[0])}
          </h2>
          <span className="f">{isOffer ? "🚘" : "🙋"}</span>
        </header>
        <main className="flex flex-col">
          <span
            className={`badge ${
              direction ? "badge-primary" : "badge-secondary"
            }`}
          >
            {direction ? "Ida" : "Vuelta"}
          </span>
          <div className="flex py-1">
            {Array.from({ length: isOffer ? seats - free_seats! : seats }).map(
              (_, idx) => (
                <>
                  <IconUserFilled key={idx} />
                </>
              )
            )}
            {Array.from({ length: free_seats! }).map((_, idx) => (
              <>
                <IconUser key={idx} />
              </>
            ))}
          </div>
        </main>
        {moment(travel_date).fromNow()}
      </div>
    </article>
  );
}
