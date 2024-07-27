import QueryKeys from "@constants/queryKeys.constants";
import { SetQueryStoreAction } from "@hooks";
import { TravelDirection } from "@interfaces/enums/TravelDirection";
import type { Driver } from "@interfaces/models/driver.d.ts";
import moment from "moment";

export const getNextIntervalTime = () => {
  const now = moment();

  // Redondear al próximo intervalo de 30 minutos
  const minutes = now.minute();
  const nextInterval =
    minutes < 30
      ? now.clone().startOf("hour").add(30, "minutes") // Redondear a hh:30
      : now.clone().startOf("hour").add(1, "hour"); // Redondear a hh+1:00

  // Asegurarse de que el intervalo esté dentro del rango permitido
  return nextInterval.format("HH:mm");
};

export const getNextMultipleOf10Minutes = () => {
  const now = moment();
  const minutes = now.minute();
  const nextMultipleOf5 = Math.ceil(minutes / 10) * 10;
  const nextTime = now
    .clone()
    .minute(nextMultipleOf5)
    .second(0)
    .format("HH:mm");
  return nextTime;
};

export const getDefaultDirectionValue = () => {
  if (
    moment(moment().format("HH:mm"), "HH:mm").isBefore(moment("12:00", "HH:mm"))
  ) {
    return TravelDirection.INBOUND;
  } else {
    return TravelDirection.OUTBOUND;
  }
};

export const optimisticUpdate =
  (
    queryClient: any,
    handleClose: () => void,
    data?: GenericTravel[],
    setData?: SetQueryStoreAction<GenericTravel[]>
  ) =>
  async (newtravel: GenericTravel) => {
    await queryClient.cancelQueries({ queryKey: [QueryKeys.TRAVELS] });
    const previousTravels = data;
    await setData?.((prev) => {
      if (prev) return [newtravel, ...prev];
      else return [newtravel];
    });

    handleClose();
    return { previousTravels };
  };

export const getTravelData = (
  data: FormData,
  user: Partial<Driver>
): GenericTravel => {
  const direction: GenericTravel["direction"] = !!parseInt(
    data.get("direction") as string
  );
  const bookedSeats = data.get("bookedSeats")
    ? parseInt(data.get("bookedSeats") as string)
    : 0;
  const freeSeats = user?.seats! - bookedSeats;
  const fee: GenericTravel["fee"] = data.get("fee")
    ? parseFloat(data.get("fee") as string)
    : user?.fee!;
  const travelDay = data.get("travelDay") ?? moment().format("YYYY-MM-DD");
  const travelTime = data.get("travelTime");

  const travelDate: GenericTravel["travelDate"] = `${travelDay}T${travelTime}:00`;
  const temporalId: GenericTravel["travelId"] = Math.random().toString(36);

  return {
    travelId: temporalId,
    fee,
    travelDate,
    direction,
    travelType: "offer",
    name: user?.name!,
    seats: user?.seats!,
    freeSeats: freeSeats,
    preview: true,
  };
};
