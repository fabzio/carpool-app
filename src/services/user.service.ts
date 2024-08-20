import type { User } from "@interfaces/models/user";
import { http } from "@utils/http";
import { getCookie, setCookie } from "react-use-cookie";

class UserService {
  public static async signUp(
    data: {
      phone: string;
      code: string;
      zoneId: number;
    } | null
  ): Promise<{
    success: boolean;
    message: string;
    userId: string;
    name: string;
  }> {
    try {
      if (!data) throw new Error();
      const res = await http.post("user", data);
      if (!res.success) throw new Error(res.message);
      setCookie("tkn", res.data.token);
      return {
        success: res.success,
        message: res.message,
        userId: res.data?.userId,
        name: res.data?.name,
      };
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public static async getUserType(code: User["code"]): Promise<{
    name: string;
    userType: "INACTIVE" | "SUSPENDED" | "DRIVER" | "PASSENGER" | "BOTH";
  }> {
    try {
      const token = getCookie("tkn");
      if (!token) throw new Error();
      const res = await http.get(`user/type/${code}`, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res.data;
    } catch (error) {
      throw new Error();
    }
  }

  public static async changePassword(data: {
    password: string;
    newPassword: string;
  }): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const token = getCookie("tkn");
      const res = await http.post("user/change-password", data, {
        Authorization: `Bearer ${token}`,
      });
      if (!res.success) throw new Error(res.message);
      return res;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default UserService;
