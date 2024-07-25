interface Props {
  elem?: boolean;
}

export default function Loading({ elem }: Props) {
  return (
    <div
      className={`${
        elem ? "min-h-full" : "min-h-svh"
      } w-full flex justify-center items-center"`}
    >
      <span className="loading loading-infinity loading-lg"></span>
    </div>
  );
}
