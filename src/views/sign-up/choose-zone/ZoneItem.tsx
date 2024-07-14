import { Zone } from "@interfaces/zone.interface";

interface Props {
  zone: Zone;
}

export default function ZoneItem({ zone }: Props) {
  return (
    <li>
      <div className="flex justify-between">
        <p>{zone.name}</p>
        <span>❯</span>
      </div>
    </li>
  );
}
