import { TravelDirection } from "@interfaces/enums/TravelDirection";
import { TravelState } from "@interfaces/enums/TravelState";
import { Travel } from "@interfaces/models/travel";
import { capitalize } from "@utils/capitalize";

import moment from "moment";
import { useNavigate } from "react-router-dom";

interface Props extends Travel {}

export default function HistoryItem({
  name,
  direction,
  state,
  travelDate,
  type,
}: Props) {
  const navigate = useNavigate();
  const handleClick = () => {
    
  }

  return (
    <>
      <article
        className="card card-compact shadow-xl cursor-pointer"
        role="listitem"
        onClick={() => navigate("detail")}
      >
        <div className="card-body">
          <header className="flex flex-col">
            <span
              className="font-bold text-base"
              aria-label={
                type === "offer" ? "Oferta de viaje" : "Solicitud de viaje"
              }
            >
              {capitalize(name.split(" ")[0])}
              {type === "offer" ? "🚘" : "🙋"}
            </span>
            <span
              className={`badge ${
                mapDirectionBadge[Number(direction) as TravelDirection]
              }`}
              aria-label={`Dirección del viaje: ${
                direction ? "Ida" : "Vuelta"
              }`}
            >
              {direction ? "Ida" : "Vuelta"}
            </span>
          </header>
          <main className="flex justify-between">
            <section className="flex flex-col">
              <time
                className="font-bold"
                dateTime={moment(travelDate).format()}
              >
                {capitalize(moment(travelDate).calendar())}
              </time>
              <span
                className={`${mapTravelStyle[state]}`}
                aria-label={`Estado del viaje: ${mapTravelText[state]}`}
              >
                {mapTravelText[state]}
              </span>
            </section>
          </main>
        </div>
      </article>
    </>
  );
}

const mapDirectionBadge = {
  [TravelDirection.INBOUND]: "badge-primary",
  [TravelDirection.OUTBOUND]: "badge-secondary",
};

const mapTravelStyle = {
  [TravelState.CREATED]: "text-accent",
  [TravelState.CANCELLED]: "text-error",
  [TravelState.OFF]: "text-success",
};

const mapTravelText = {
  [TravelState.CREATED]: "Por salir",
  [TravelState.CANCELLED]: "Cancelado",
  [TravelState.OFF]: "Finalizado",
};
