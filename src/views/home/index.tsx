import { AddButton, Error, Loading, TravelModal } from "@components";

import { useEffect, useState } from "react";
import TravelList from "./TravelList";
import { useQueryStore, useSelector } from "@hooks";
import OfferModal from "./offer-modal";
import { useQuery } from "@tanstack/react-query";
import TravelService from "@services/travel.service";
import OfferDetail from "./offer-detail";
import QueryKeys from "@constants/queryKeys.constants";

export default function Home() {
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const { switchBlur } = useSelector((state) => state.theme);
  const { type } = useSelector((state) => state.user);

  const {
    data: travelListResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryKeys.TRAVELS],
    queryFn: TravelService.getTravelList,
  });

  const { data: storedTravels, setQueryStore } =
    useQueryStore<GenericTravel[]>("travels");

  const handleOpen = (type: "detail" | "new") => () => {
    switchBlur();
    if (type === "detail") setVisibleDetail(true);
    if (type === "new") setVisibleNew(true);
  };
  const handleClose = (type: "detail" | "new") => () => {
    switchBlur();
    if (type === "detail") {
      setVisibleDetail(false);
      setQueryStore((current) => {
        return current.map((item) => ({ ...item, selected: false }));
      });
    }

    if (type === "new") setVisibleNew(false);
  };

  useEffect(() => {
    if (storedTravels?.some((item) => item.selected)) {
      handleOpen("detail")();
    }
  }, [storedTravels]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <div className="h-full">
      <TravelList travels={travelListResponse?.data} />
      <AddButton onClick={handleOpen("new")} />
      <TravelModal visible={visibleNew} handleClose={handleClose("new")}>
        {type === "driver" && <OfferModal handleClose={handleClose("new")} />}
      </TravelModal>
      <TravelModal visible={visibleDetail} handleClose={handleClose("detail")}>
        {type === "driver" && <OfferDetail />}
      </TravelModal>
    </div>
  );
}
