import { IconUser, IconUserFilled } from "@tabler/icons-react";

interface Props {
  maxSeats: number;
  reservedSeats: number;
}

export default function SeatsStatus({ reservedSeats, maxSeats }: Props) {
  return (
    <div>
      <div className="flex py-1" aria-label="seat availability">
        {Array.from({
          length: reservedSeats,
        }).map((_, idx) => (
          <IconUserFilled key={idx} />
        ))}
        {Array.from({ length: maxSeats - reservedSeats }).map((_, idx) => (
          <IconUser key={idx} />
        ))}
      </div>
    </div>
  );
}
