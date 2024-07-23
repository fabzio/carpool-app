import TravelCard from "./TravelCard";

interface Props {
  travels: GenericTravel[];
}

export default function TravelList({ travels }: Props) {

  return (
    <ul className="grid grid-cols-2 gap-2 p-2">
      {travels.map((travel: GenericTravel) => (
        <li className="col-span-1" key={travel.travelId}>
          <TravelCard {...travel} />
        </li>
      ))}
    </ul>
  );
}
