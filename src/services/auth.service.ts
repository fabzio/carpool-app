import { ResponseAPI } from "@interfaces/responseAPI.interface";
import { http } from "@utils/http";

class AuthService {
  public static async logIn(data: {
    code: string;
    password: string;
  }): Promise<ResponseAPI> {
    try {
      const res = await http.post("auth/login", data);
      return res;
    } catch (error) {
      throw new Error();
    }
  }

  public static async logOut(): Promise<ResponseAPI> {
    try {
      const res = await http.get("auth/logout");
      return res;
    } catch (error) {
      throw new Error();
    }
  }

  public static async verify(token: string): Promise<ResponseAPI> {
    console.log(this);
    try {
      const res = await http.get("auth/verify", {
        Authorization: `Bearer ${token}`,
      });
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  }
}

export default AuthService;
