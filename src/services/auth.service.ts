import { getCookie, setCookie } from "react-use-cookie";
import { ResponseAPI } from "@interfaces/responseAPI.interface";
import { http } from "@utils/http";

class AuthService {
  public static async logIn(data: {
    code: string;
    password: string;
  }): Promise<ResponseAPI> {
    try {
      const res = await http.post("auth/login", data, {
        credentials: "include",
      });
      if (!res.success) throw new Error(res.message);
      setCookie("tkn", res.data);
      return res;
    } catch (error) {
      throw new Error((error as Error).message);
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

  public static async verify(): Promise<boolean> {
    const token = getCookie("tkn");
    try {
      const res = await http.get("auth/verify", {
        Authorization: `Bearer ${token}`,
      });

      return res.success;
    } catch (error) {
      throw new Error();
    }
  }
}

export default AuthService;
