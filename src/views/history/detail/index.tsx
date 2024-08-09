import Paths from "@constants/paths.constants";
import { useSelector } from "@hooks";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { Navigate, useNavigate } from "react-router-dom";
import OfferDetail from "./offer-detail";
import RequestDetail from "./request-detail";

export default function HistoryTravelDetail() {
  const { selectedTravel, setSelectedTravel } = useSelector(
    (state) => state.travel
  );
  const navigate = useNavigate();
  const handleBack = () => {
    setSelectedTravel(null);
    navigate(-1);
  };
  if (!selectedTravel) return <Navigate to={Paths.HISTORY} />;
  return (
    <div className="flex flex-col">
      <a
        className={
          "flex w-fit ml-3 mt-5 items-center text-base-content text-opacity-50 cursor-pointer"
        }
        onClick={handleBack}
      >
        <IconCaretLeftFilled height={16} width={16} />
        Volver
      </a>
      {selectedTravel.type === "offer" ? (
        <OfferDetail offer={selectedTravel} />
      ) : (
        <RequestDetail request={selectedTravel} />
      )}
    </div>
  );
}
