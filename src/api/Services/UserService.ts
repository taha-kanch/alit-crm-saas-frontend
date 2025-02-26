import { FetchWrapper } from "../fetchWrapper";

export class UserService {

  async update(userID: number, data: any) {
    return FetchWrapper.put(`users/${userID}`, data);
  }

  async get(userID: number) {
    return FetchWrapper.get(`users/${userID}`);
  }
}
