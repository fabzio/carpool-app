import { Error, Loading } from "@components";
import { useSelector } from "@hooks";
import { useQuery } from "@tanstack/react-query";
import TravelCard from "./TravelCard";
import TravelService from "@services/travel.service";

export default function TravelList() {
  const { user } = useSelector((state) => state.user);
  const zoneId = user?.zoneId!;
  const {
    data: travelListResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["travels", zoneId],
    queryFn: TravelService.getTravelList,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <ul className="grid grid-cols-2 gap-2 p-2">
      {travelListResponse?.data.map((travel: GenericTravel) => (
        <li className="col-span-1" key={travel.travelId}>
          <TravelCard {...travel} />
        </li>
      ))}
    </ul>
  );
}
