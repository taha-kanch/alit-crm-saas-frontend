import { FetchWrapper } from "../fetchWrapper";

export class AuthService {

  async login(data: any) {
    return FetchWrapper.post(`auth/login`, data);
  }

  async signup(data: any) {
    return FetchWrapper.post(`auth/signup`, data);
  }

  async logout() {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
  }
}
