import { http } from "@utils/http";

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
      console.log(res);
      return {
        success: res.success,
        message: res.message,
        userId: res.data?.userId,
        name: res.data?.name,
      };
    } catch (error) {
      throw new Error();
    }
  }
}

export default UserService;
