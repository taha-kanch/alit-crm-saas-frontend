import { ApiResponse } from "./types/apiTypes";

export class FetchWrapper {

  private static API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  private static getAuthToken(): string | null {
    return localStorage.getItem("accessToken");
  }

  private static authHeader(): HeadersInit {
    const token = this.getAuthToken();
    return token
      ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      : { "Content-Type": "application/json" };
  }

  private static async handleResponse(
    response: Response,
    noResponseData = false
  ): Promise<ApiResponse> {
    if(!response.ok) {
      return {
        isOk: false,
        data: await response.json(),
        statusCode: response.status,
      };
    } else {
    return {
      isOk: true,
      data: await response.json(),
      statusCode: response.status,
    };
  }
  }

  static async get(endpoint: string): Promise<ApiResponse> {
    const url = `${this.API_BASE_URL}/${endpoint}`;
    const response = await fetch(url, { method: "GET", headers: this.authHeader()});
    return this.handleResponse(response);
  }

  static async post(endpoint: string, body: any): Promise<ApiResponse> {
    const url = `${this.API_BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
      method: "POST",
      headers: this.authHeader(),
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  static async put(endpoint: string, body: any): Promise<ApiResponse> {
    const url = `${this.API_BASE_URL}/${endpoint}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: this.authHeader(),
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  static async delete(endpoint: string): Promise<ApiResponse> {
    const url = `${this.API_BASE_URL}/${endpoint}`;
    const response = await fetch(url, { method: "DELETE", headers: this.authHeader() });
    return this.handleResponse(response);
  }
}
