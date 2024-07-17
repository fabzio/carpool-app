import { Zone } from "@interfaces/models/zone.interface";
import ZoneItem from "./ZoneItem";

interface Props {
  zones: Zone[];
}

export default function ZoneList({ zones }: Props) {
  return (
    <ul className="menu bg-base-200 rounded-box w-full">
      {zones.map((zone) => (
        <ZoneItem zone={zone} key={zone.id} />
      ))}
    </ul>
  );
}
