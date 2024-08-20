import { version } from "../../package.json";

export const { FARM_APP_API_URL: API_URL } = (import.meta as any).env;
export const APP_VERSION = version;
