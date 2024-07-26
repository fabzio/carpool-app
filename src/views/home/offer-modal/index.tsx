import styles from "./index.module.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "@hooks";
import DriverService from "@services/driver.service";
import { getTravelData, optimisticUpdate } from "./utils";
import SimpleForm from "./SimpleForm";
import FullForm from "./FullForm";
import QueryKeys from "@constants/queryKeys.constants";

interface Props {
  handleClose: () => void;
}

export default function OfferModal({ handleClose }: Props) {
  const { user } = useSelector((state) => state.user);
  const [simpleForm, setSimpleForm] = useState(true);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (travelData) => DriverService.newOffer(travelData),
    onMutate: optimisticUpdate(queryClient, handleClose),
    onSuccess: () => {
      setSimpleForm(true);
    },
    onError: (_, __, context) => {
      if (context?.previousTravels) {
        queryClient.setQueryData(["travels"], context.previousTravels);
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.TRAVELS] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const travelData = getTravelData(data, user!);
    mutate(travelData);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Nuevo viaje 🚀 </h2>
      <form className={"grid grid-cols-4 gap-2"} onSubmit={handleSubmit}>
        {simpleForm ? <SimpleForm /> : <FullForm />}
        <section className={styles.formActions}>
          <label htmlFor="simple" className="flex flex-col w-17">
            <span
              className={`${styles.expressText} ${
                simpleForm ? styles.expressTextOn : styles.expressTextOff
              }`}
            >
              Express ⚡
            </span>
            <input
              id="simple"
              className="toggle toggle-accent"
              type="checkbox"
              onChange={() => {
                setSimpleForm((simple) => !simple);
              }}
              checked={simpleForm}
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary w-24"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Publicar"
            )}
          </button>
        </section>
      </form>
    </div>
  );
}
