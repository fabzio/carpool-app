import { useEffect } from "react";
import { Error, Loading } from "@components";
import { useInfiniteQuery } from "@tanstack/react-query";
import HistoryList from "./HistoryList";
import PassengerService from "@services/passenger.service";
import { useScrollPosition, useSelector } from "@hooks";
import QueryKeys from "@constants/queryKeys.constants";
import DriverService from "@services/driver.service";

export default function History() {
  const { type } = useSelector((state) => state.user);
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: [QueryKeys.MY_TRAVELS],
    queryFn:
      type === "passenger"
        ? PassengerService.travelHistory
        : DriverService.travelHistory,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    getPreviousPageParam: (firstPage) => firstPage.page - 1,
  });

  const { scrollPosition, isFull } = useScrollPosition();

  useEffect(() => {
    if (
      (scrollPosition > 0.9 || isFull) &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isPending
    ) {
      fetchNextPage();
    }
  }, [
    scrollPosition,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFull,
    isPending,
  ]);

  const pagintedTravels = data?.pages.flatMap((page) => page.data);

  if (isLoading) return <Loading elem />;
  if (isError) return <Error />;

  return (
    <div>
      <HistoryList travelHistory={pagintedTravels} />
      {isFetchingNextPage && (
        <div className="w-full flex justify-center items-center my-10">
          <span className="loading loading-dots"></span>
        </div>
      )}
    </div>
  );
}
