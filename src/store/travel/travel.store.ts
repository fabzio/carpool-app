import { SliceStore } from "@store/types";
import TravelStore from "./types";

const createTravelSlice: SliceStore<TravelStore> = (set) => ({
  selectedTravel: null,
  setSelectedTravel: (travel) => set({ selectedTravel: travel }),
});

export default createTravelSlice;
