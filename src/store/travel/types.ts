import { Travel } from "@interfaces/models/travel";

interface TravelStore {
  selectedTravel: Pick<Travel, "id" | "type"> | null;
  setSelectedTravel: (travel: Pick<Travel, "id" | "type"> | null) => void;
}

export default TravelStore;
