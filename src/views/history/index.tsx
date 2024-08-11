import { useEffect } from "react";
import { Error } from "@components";
import { useInfiniteQuery } from "@tanstack/react-query";
import HistoryList from "./HistoryList";
import PassengerService from "@services/passenger.service";
import { useIntersectionObserver, useSelector } from "@hooks";
import QueryKeys from "@constants/queryKeys.constants";
import DriverService from "@services/driver.service";

export default function History() {
  const { type } = useSelector((state) => state.user);
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
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

  const { elementRef, isVisible } = useIntersectionObserver();

  useEffect(() => {
    if (isVisible && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isVisible, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const paginatedTravels = data?.pages.flatMap((page) => page.data);

  if (isLoading)
    return Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="skeleton h-28 w-full  my-10 " />
    ));
  if (isError) return <Error />;

  return (
    <div className="px-1">
      <HistoryList travelHistory={paginatedTravels} />
      <div
        ref={elementRef}
        className="h-10 w-full flex justify-center items-center"
      >
        {isFetchingNextPage && <span className="loading loading-dots "></span>}
      </div>
    </div>
  );
}
