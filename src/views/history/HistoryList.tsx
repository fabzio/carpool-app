import { Travel } from "@interfaces/models/travel";
import HistoryItem from "./HistoryItem";

interface Props {
  travelHistory?: Travel[];
}
export default function HistoryList({ travelHistory = [] }: Props) {
  if (travelHistory.length === 0)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h2> ¿Nuev@ por aquí? </h2>
        <br />
        <strong>
          No tienes viajes aún, ¿Que tal si te animas ahora?
        </strong>
      </div>
    );
  return (
    <ul>
      {travelHistory.map((travel, index) => (
        <li key={travel.id}>
          <HistoryItem key={index} {...travel} />
        </li>
      ))}
    </ul>
  );
}
