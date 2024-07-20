import { ResponseAPI } from "@interfaces/responseAPI.interface";
import { http } from "@utils/http";

class UserService {
  public static async signUp(data: {
    phone: string;
    code: string;
    zoneId: number;
  }): Promise<ResponseAPI> {
    try {
      const res = await http.post("user", data);
      console.log(res);
      return res;
    } catch (error) {
      throw new Error();
    }
  }
}

export default UserService;
