import { AddButton, Error, Loading, TravelModal } from "@components";

import { useState } from "react";
import TravelList from "./TravelList";
import { useSelector } from "@hooks";
import OfferModal from "./OfferModal";
import { useQuery } from "@tanstack/react-query";
import TravelService from "@services/travel.service";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const { switchBlur } = useSelector((state) => state.theme);
  const { type,user } = useSelector((state) => state.user);
  const zoneId = user?.zoneId!;
  const {
    data: travelListResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["travels", zoneId],
    queryFn: TravelService.getTravelList,
  });

  const handleOpen = () => {
    switchBlur();
    setVisible(true);
  };
  const handleClose = () => {
    setVisible(false);
    switchBlur();
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <div className="h-full">
      <TravelList travels={travelListResponse?.data} />
      <AddButton onClick={handleOpen} />
      <TravelModal visible={visible} handleClose={handleClose}>
        {type === "driver" && <OfferModal handleClose={handleClose} />}
      </TravelModal>
    </div>
  );
}
