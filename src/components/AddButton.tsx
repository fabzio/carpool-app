import { useScrollPosition } from "@hooks";
import { IconPlus } from "@tabler/icons-react";


interface Props {
  onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
  const scrollPosition = useScrollPosition();

  return (
    <button
      className={`btn btn-primary btn-lg btn-circle fixed bottom-20 right-2 transition-opacity duration-300 ${
        scrollPosition > 0.7 ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={onClick}
    >
      <IconPlus />
    </button>
  );
}
