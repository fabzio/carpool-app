import type { Driver } from "@interfaces/models/driver.d.ts";
import { Travel, TravelOffer } from "@interfaces/models/travel";
import { PaginatedResponse } from "@interfaces/paginatedResponse.interface";
import { http } from "@utils/http";
import { getCookie } from "react-use-cookie";

export type InsertTravelOffer = {
  travelDate: TravelOffer["travelDate"];
  direction: TravelOffer["direction"];
  fee: Driver["fee"];
  freeSeats: TravelOffer["freeSeats"];
};
class DriverService {
  public static async createDriver(data: Partial<Driver>): Promise<void> {
    const token = getCookie("tkn");
    try {
      const res = await http.post("driver", data, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  public static async getDriverByCode(code: Driver["code"]): Promise<Driver> {
    const token = getCookie("tkn");
    try {
      const res = await http.get(`driver/user/${code}`, {
        Authorization: `Bearer ${token}`,
      });
      return res.data;
    } catch (error) {
      throw new Error();
    }
  }

  public static async newOffer(
    data: InsertTravelOffer
  ): Promise<TravelOffer["id"]> {
    const token = getCookie("tkn");
    try {
      const res = await http.post("driver/new-offer", data, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res.data as TravelOffer["id"];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async takeTravelRequest(data: {
    travelId: TravelOffer["id"];
    customFee: Driver["fee"];
  }): Promise<void> {
    const token = getCookie("tkn");
    try {
      const res = await http.post(`driver/take-request`, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async modifyOffer(data: {
    travelId: TravelOffer["id"];
    travelState: Travel["state"];
  }): Promise<void> {
    const token = getCookie("tkn");
    try {
      const res = await http.patch(`driver/modify-offer`, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
  public static async travelHistory({
    pageParam = 1,
  }: {
    pageParam: number;
  }): Promise<PaginatedResponse<Travel>> {
    const token = getCookie("tkn");
    try {
      const res = await http.get(`driver/history?page=${pageParam}`, {
        Authorization: `Bearer ${token}`,
      });
      return res.data;
    } catch (error) {
      throw new Error();
    }
  }
}

export default DriverService;
