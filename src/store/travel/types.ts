import { Travel } from "@interfaces/models/travel";

interface TravelStore {
  selectedTravel: Pick<
    Travel,
    "id" | "type" | "ownerCode" | "direction" | "state" | "travelDate"
  > | null;
  setSelectedTravel: (
    travel: Pick<
      Travel,
      "id" | "type" | "ownerCode" | "direction" | "state" | "travelDate"
    > | null
  ) => void;
}

export default TravelStore;
