import { IconPlus } from "@tabler/icons-react";

interface Props {
  onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
  return (
      <button className="btn btn-primary btn-lg btn-circle fixed bottom-20 right-2 ">
        <IconPlus onClick={onClick} />
      </button>
  );
}
