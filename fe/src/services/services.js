import { ApiClient } from "../utils/ApiClient";

export class HttpService {
  static async getAllCustomers() {
    try {
      const response = await ApiClient.get("/user/get-all-customers");
      return response;
    } catch (err) {
      return err;
    }
  }

  static async makeComplain() {
    try {
      const response = await ApiClient.post("/complain");
      return response;
    } catch (err) {
      return err;
    }
  }

  static async authenticatedUser() {
    try {
      const response = await ApiClient.get("/user/active");
      return response;
    } catch (err) {
      return err;
    }
  }
  static async register(modal) {
    try {
      const response = await ApiClient.post("/user/register", modal);
      return response;
    } catch (err) {
      return err;
    }
  }
  static async login(modal) {
    try {
      const response = await ApiClient.post("/user/login", modal);
      return response;
    } catch (err) {
      return err;
    }
  }
  static async logout() {
    localStorage.removeItem("token");
  }
}
