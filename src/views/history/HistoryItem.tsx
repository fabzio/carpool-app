import Paths from "@constants/paths.constants";
import { useSelector } from "@hooks";
import { TravelDirection } from "@interfaces/enums/TravelDirection";
import { Travel } from "@interfaces/models/travel";
import { capitalize } from "@utils/capitalize";

import moment from "moment";
import { useNavigate } from "react-router-dom";
import { mapDirectionBadge, mapTravelStyle, mapTravelText } from "./utils";

interface Props extends Travel {}

export default function HistoryItem({
  id,
  ownerCode,
  name,
  direction,
  state,
  travelDate,
  type,
}: Props) {
  const navigate = useNavigate();
  const { setSelectedTravel } = useSelector((state) => state.travel);
  const handleClick = () => {
    setSelectedTravel({
      id,
      ownerCode,
      direction,
      state,
      travelDate,
      type,
    });
    navigate(Paths.HISTORY_DETAIL);
  };

  return (
    <>
      <article
        className="card card-compact shadow-xl cursor-pointer"
        role="listitem"
        onClick={handleClick}
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
