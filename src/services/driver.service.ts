import type { Driver } from "@interfaces/models/driver.d.ts";
import { http } from "@utils/http";
import { getCookie } from "react-use-cookie";

class DriverService {
  public static async getDriverByCode(code: Driver["code"]): Promise<Driver> {
    const token = getCookie("tkn");
    try {
      const res = await http.get(`driver/${code}`, {
        Authorization: `Bearer ${token}`,
      });
      return res.data;
    } catch (error) {
      throw new Error();
    }
  }

  public static async newOffer(data: any): Promise<any> {
    const token = getCookie("tkn");
    try {
      const res = await http.post("driver/new-offer", data, {
        Authorization: `Bearer ${token}`,
      });
      return res;
    } catch (error) {
      throw new Error();
    }
  }
}

export default DriverService;
