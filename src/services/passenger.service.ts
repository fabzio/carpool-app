import type { Passenger } from "@interfaces/models/passenger.d.ts";
import { http } from "@utils/http";
import { getCookie } from "react-use-cookie";

export type InsertTravelRequest = {
  travelDate: string;
  direction: boolean;
  customPoint: string;
  numPassengers: number;
  forSelf: boolean;
};

class PassengerService {
  public static async getPassengerByCode(
    code: Passenger["code"]
  ): Promise<Passenger> {
    const token = getCookie("tkn");
    try {
      const res = await http.get(`passenger/${code}`, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res.data;
    } catch (error) {
      throw new Error();
    }
  }

  public static async newRequest(
    data: InsertTravelRequest
  ): Promise<TravelRequest["id"]> {
    const token = getCookie("tkn");
    try {
      const res = await http.post("passenger/new-request", data, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res.data as TravelRequest["id"];
    } catch (error) {
      throw new Error();
    }
  }

  public static async joinRequest(
    travelId: Travel["id"]
  ): Promise<TravelRequest["id"]> {
    const token = getCookie("tkn");
    try {
      const res = await http.post("passenger/join-request", { travelId }, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res.data as TravelRequest["id"];
    } catch (error) {
      throw new Error();
    }
  }
}

export default PassengerService;
