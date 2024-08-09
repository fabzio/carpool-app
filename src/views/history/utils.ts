import { TravelDirection } from "@interfaces/enums/TravelDirection";
import { TravelState } from "@interfaces/enums/TravelState";

export const mapDirectionBadge = {
  [TravelDirection.INBOUND]: "badge-primary",
  [TravelDirection.OUTBOUND]: "badge-secondary",
};

export const mapTravelStyle = {
  [TravelState.CREATED]: "text-accent",
  [TravelState.CANCELLED]: "text-error",
  [TravelState.OFF]: "text-success",
  [TravelState.WAITING]: "text-warning",
};

export const mapTravelText = {
  [TravelState.CREATED]: "Por salir",
  [TravelState.CANCELLED]: "Cancelado",
  [TravelState.OFF]: "Finalizado",
  [TravelState.WAITING]: "Esperando pasajeros",
};
