import { Error, Loading, TravelCard } from "@components";
import { useSelector } from "@hooks";
import { useQuery } from "@tanstack/react-query";
import { http } from "@utils/http";
import { Props } from "./TravelCard";

export default function TravelList() {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["travels", user?.zoneId],
    queryFn: ({ queryKey }) => {
      return http.get(`travel/zone/${queryKey[1]}`);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <ul className="grid grid-cols-2 gap-2 p-2">
      {data?.data.map((travel: Props) => (
        <li className="col-span-1">
          <TravelCard key={travel.travel_id} {...travel} />
        </li>
      ))}
    </ul>
  );
}
