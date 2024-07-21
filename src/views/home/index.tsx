import { AddButton, TravelModal } from "@components";

import { useState } from "react";
import TravelList from "./TravelList";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);
  return (
    <div className="h-full relative">
      <TravelList />
      <AddButton onClick={handleOpen} />
      <TravelModal visible={visible} handleClose={handleClose} />
    </div>
  );
}
