import { ResponseAPI } from "@interfaces/responseAPI.interface";


interface Headers {
  [key: string]: string;
}

class Http {
  private baseUrl: string = "http://192.168.1.94:1234/api/v1/";

  private async request(
    method: string,
    url: string,
    body?: any,
    headers?: Headers
  ) {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    try {
      const response = await fetch(`${this.baseUrl}${url}`, options);
      return await response.json();
    } catch (error) {
      throw new Error(`Fetch error: ${(error as Error).message}`);
    }
  }

  get = (url: string, headers?: Headers): Promise<ResponseAPI> =>
    this.request("GET", url, undefined, headers);
  post = (url: string, body: any, headers?: Headers): Promise<ResponseAPI> =>
    this.request("POST", url, body, headers);
  put = (url: string, body: any, headers?: Headers): Promise<ResponseAPI> =>
    this.request("PUT", url, body, headers);
  patch = (url: string, body: any, headers?: Headers): Promise<ResponseAPI> =>
    this.request("PATCH", url, body, headers);
  delete = (url: string, headers?: Headers): Promise<ResponseAPI> =>
    this.request("DELETE", url, undefined, headers);
}
export const http = new Http();
