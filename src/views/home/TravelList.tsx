import TravelCard from "./TravelCard";

interface Props {
  travels?: GenericTravel[];
}

export default function TravelList({ travels = [] }: Props) {
  if (travels.length === 0) {
    return (
      <article className="w-full h-full grid place-items-center">
        <main>
          <h2 className="text-center font-bold text-3xl">
            No se encontraron viajes
          </h2>
          <p className="text-center text-balance">
            No hay propuestas de viaje por tu zona, crea una y aparecerá aquí
          </p>
        </main>
      </article>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-2 p-2">
      {travels.map((travel) => (
        <li className="col-span-1" key={travel.travelId}>
          <TravelCard {...travel} />
        </li>
      ))}
    </ul>
  );
}
