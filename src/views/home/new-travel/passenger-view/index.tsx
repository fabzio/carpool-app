import { useSelector } from "@hooks";
interface Props {
  handleClose: () => void;
}

export default function PassengerView({ handleClose }: Props) {
  const {} = useSelector((state) => state.user);
  return <div>passenger</div>;
}
