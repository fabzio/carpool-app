
interface Props {
  handleClose: () => void;
}

export default function PassengerView({ handleClose }: Props) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
  };
  return <form onSubmit={handleSubmit}>NewRequest</form>;
}
