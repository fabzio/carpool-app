import { useSelector } from "@hooks";
import TravelCard from "./TravelCard";

interface Props {
  travels?: GenericTravel[];
}

export default function TravelList({ travels = [] }: Props) {
  const { type } = useSelector((state) => state.user);

  const offers = travels.filter((travel) => travel.travelType === "offer");
  const requests = travels.filter((travel) => travel.travelType === "request");
  if (
    (type === "driver" && requests.length === 0) ||
    (type === "passenger" && travels.length === 0)
  ) {
    return (
      <article className="w-full h-full grid place-items-center">
        <main>
          <h2 className="text-center font-bold text-3xl">
            No se encontraron viajes
          </h2>
          <p className="text-center text-balance">
            No hay propuestas de viaje por tu zona
            {type === "passenger" && ", crea una y aparecerá aquí"}
          </p>
        </main>
      </article>
    );
  }
  return (
    <div>
      {type === "passenger" && offers.length > 0 && (
        <TravelSection title="Ofertas de viaje" travels={offers} />
      )}
      {requests.length > 0 && (
        <TravelSection title="Solicitudes de viaje" travels={requests} />
      )}
    </div>
  );
}

const TravelSection = ({
  title,
  travels,
}: {
  title: string;
  travels: GenericTravel[];
}) => (
  <section className="mb-4">
    <header className="flex justify-between px-1">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-base-content  text-opacity-80">
        {travels.length} {travels.length === 1 ? "viaje" : "viajes"}
      </p>
    </header>
    <div className="flex px-2 gap-2 w-dvw overflow-x-scroll snap-x snap-mandatory">
      {chunkArray(travels).map((chunk, index) => (
        <div
          key={index}
          className={`flex ${
            travels.length > 2
              ? "flex-col min-w-[calc(50vw-0.5rem)]"
              : "min-w-[calc(100vw-0.5rem)]"
          } gap-2 snap-start `}
        >
          {chunk.map((travel) => (
            <TravelCard key={travel.travelId} {...travel} />
          ))}
        </div>
      ))}
    </div>
  </section>
);

const chunkArray = (array: any[], chunkSize: number = 2) => {
  const result: any[][] = [];
  let chunk: any[] = [];

  array.forEach((item, index) => {
    chunk.push(item);
    if (chunk.length === chunkSize || index === array.length - 1) {
      result.push(chunk);
      chunk = [];
    }
  });

  return result;
};
