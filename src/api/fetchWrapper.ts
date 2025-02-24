import { ApiResponse } from "./types/apiTypes";

export class FetchWrapper {
  private static getAuthToken(): string | null {
    return localStorage.getItem("authToken");
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
    return {
      isOk: true,
      data: await response.json(),
      statusCode: response.status,
    };
  }

  static async get(url: string): Promise<ApiResponse> {
    const response = await fetch(url, { method: "GET", headers: this.authHeader() });
    return this.handleResponse(response);
  }

  static async post(url: string, body: any): Promise<ApiResponse> {
    const response = await fetch(url, {
      method: "POST",
      headers: this.authHeader(),
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  static async put(url: string, body: any): Promise<ApiResponse> {
    const response = await fetch(url, {
      method: "PUT",
      headers: this.authHeader(),
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  static async delete(url: string): Promise<ApiResponse> {
    const response = await fetch(url, { method: "DELETE", headers: this.authHeader() });
    return this.handleResponse(response);
  }
}
