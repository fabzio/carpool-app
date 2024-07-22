import { Zone } from "@interfaces/models/zone.interface";
import { http } from "@utils/http";

class ZoneService {
  public static async getZones(): Promise<Zone[]> {
    try {
      const res = await http.get("zone");
      return res.data as Zone[];
    } catch (error) {
      throw new Error();
    }
  }
}

export default ZoneService;
