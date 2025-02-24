import { AnyAaaaRecord } from "dns";
import { FetchWrapper } from "../fetchWrapper";

export class AuthService {
  private API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  async login(data: any) {
    return FetchWrapper.post(`${this.API_BASE_URL}/auth/login`, data);
  }

  async signup(data: any) {
    return FetchWrapper.post(`${this.API_BASE_URL}/auth/signup`, data);
  }

  async logout() {
    localStorage.removeItem("authToken");
    window.location.replace("/");
  }
}
