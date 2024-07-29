import { AddButton, Error, Loading, TravelModal } from "@components";

import { useEffect, useState } from "react";
import TravelList from "./TravelList";
import { useQueryStore, useSelector } from "@hooks";
import { useQuery } from "@tanstack/react-query";
import TravelService from "@services/travel.service";
import OfferDetail from "./offer-detail";
import QueryKeys from "@constants/queryKeys.constants";
import RequestDetail from "./request-detail";
import NewTravel from "./new-travel";

export default function Home() {
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleOfferDetail, setVisibleOfferDetail] = useState(false);
  const [visibleRequestDetail, setVisibleRequestDetail] = useState(false);
  const { switchBlur } = useSelector((state) => state.theme);

  const {
    data: travelListResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QueryKeys.TRAVELS],
    queryFn: TravelService.getTravelList,
  });

  const { data: storedTravels, setQueryStore } = useQueryStore<GenericTravel[]>(
    QueryKeys.TRAVELS
  );

  const handleOpen = (type: "requestDetail" | "offerDetail" | "new") => () => {
    switchBlur();
    if (type === "offerDetail") setVisibleOfferDetail(true);
    if (type === "new") setVisibleNew(true);
    if (type === "requestDetail") setVisibleRequestDetail(true);
  };
  const handleClose = (type: "requestDetail" | "offerDetail" | "new") => () => {
    switchBlur();
    if (type === "offerDetail" || type === "requestDetail") {
      if (type === "offerDetail") setVisibleOfferDetail(false);
      if (type === "requestDetail") setVisibleRequestDetail(false);
      setQueryStore((current) => {
        return current.map((item) => ({ ...item, selected: false }));
      });
    }
    if (type === "new") setVisibleNew(false);
  };

  useEffect(() => {
    const selectedTravels = storedTravels?.find((item) => item.selected);
    if (!!selectedTravels) {
      if (selectedTravels.travelType === "offer") handleOpen("offerDetail")();
      if (selectedTravels.travelType === "request")
        handleOpen("requestDetail")();
    }
  }, [storedTravels]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <div className="h-full">
      <TravelList travels={travelListResponse} />
      <AddButton onClick={handleOpen("new")} />
      <TravelModal visible={visibleNew} handleClose={handleClose("new")}>
        <NewTravel handleClose={handleClose("new")} />
      </TravelModal>
      <TravelModal
        visible={visibleOfferDetail}
        handleClose={handleClose("offerDetail")}
      >
        {visibleOfferDetail && <OfferDetail />}
      </TravelModal>
      <TravelModal
        visible={visibleRequestDetail}
        handleClose={handleClose("requestDetail")}
      >
        {visibleRequestDetail && (
          <RequestDetail handleClose={handleClose("requestDetail")} />
        )}
      </TravelModal>
    </div>
  );
}
