import { useEffect } from "react";
import { Error, Loading } from "@components";
import { useInfiniteQuery } from "@tanstack/react-query";
import HistoryList from "./HistoryList";
import PassengerService from "@services/passenger.service";
import { useScrollPosition } from "@hooks";

export default function History() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["travelHistory"],
    queryFn: PassengerService.travelHistory,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.page + 1 : undefined,
    getPreviousPageParam: (firstPage) => firstPage.page - 1,
  });

  const { scrollPosition, isFull } = useScrollPosition();

  // Cargar más datos cuando el usuario se acerque al final de la página
  useEffect(() => {
    console.log(isFull);
    if (
      (scrollPosition > 0.9 || isFull) &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [scrollPosition, fetchNextPage, hasNextPage]);

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
