import { ResponseAPI } from "@interfaces/responseAPI.interface";
import { http } from "@utils/http";
import { getCookie } from "react-use-cookie";

class TravelService {
  public static async getTravelList(): Promise<ResponseAPI> {
    const token = getCookie("tkn");
    console.log(token);
    try {
      const res = await http.get(`travel`, {
        Authorization: `Bearer ${token}`,
      });
      return res;
    } catch (error) {
      throw new Error();
    }
  }
}

export default TravelService;
