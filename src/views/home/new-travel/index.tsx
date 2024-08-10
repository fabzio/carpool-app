import styles from "./index.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryStore, useSelector } from "@hooks";
import DriverService, { InsertTravelOffer } from "@services/driver.service";

import SimpleForm from "./SimpleForm";
import DriverFullForm from "./DriverFullForm";
import PassengerFullForm from "./PassengerFullForm";
import QueryKeys from "@constants/queryKeys.constants";

import PassengerService, {
  InsertTravelRequest,
} from "@services/passenger.service";
import {
  getDriverTravelData,
  getPassengerTravelData,
  optimisticUpdate,
} from "./utils";
import { useForm } from "react-hook-form";

interface Props {
  handleClose: () => void;
}

export default function NewTravel({ handleClose }: Props) {
  const travelForm = useForm({});
  const { user, type } = useSelector((state) => state.user);
  const [simpleForm, setSimpleForm] = useState(true);
  const { data, setQueryStore } = useQueryStore<GenericTravel[]>(
    QueryKeys.TRAVELS
  );
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["new-travel"],
    mutationFn: (travelData) =>
      type === "driver"
        ? DriverService.newOffer(travelData as InsertTravelOffer)
        : PassengerService.newRequest(travelData as InsertTravelRequest),
    onMutate: async (travelData: GenericTravel) => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.TRAVELS] });
      const context = optimisticUpdate(data, setQueryStore)(travelData);
      handleClose();
      return context;
    },
    onSuccess: () => {
      setSimpleForm(true);
      toast.success("Viaje publicado");
    },
    onError: (error, __, context) => {
      if (context?.previousTravels) {
        setQueryStore(() => context.previousTravels!);
      }
      toast.error(error.message);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: [QueryKeys.TRAVELS] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const travelData =
      type === "driver"
        ? getDriverTravelData(data, user!)
        : getPassengerTravelData(data, user!);
    mutate(travelData as GenericTravel);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Nuevo viaje 🚀 </h2>
      <form
        className={"grid grid-cols-4 gap-2 items-stretch"}
        onSubmit={handleSubmit}
      >
        {simpleForm ? (
          <SimpleForm />
        ) : type === "driver" ? (
          <DriverFullForm />
        ) : (
          <PassengerFullForm formController={travelForm} />
        )}
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
