import { useSelector } from "@hooks";

interface Props {
  zone: Zone;
}

export default function ZoneItem({ zone }: Props) {
  const { setZone } = useSelector((state) => state.signUp);
  return (
    <li onClick={() => setZone(zone.id)}>
      <div className="flex justify-between">
        <p>{zone.name}</p>
        <span>❯</span>
      </div>
    </li>
  );
}
