import axios from "axios";
import { URLS, HTTP } from "../constant/constant";

export class ApiClient {
  static async request(method, url, body) {
    const BaseURL = URLS.BASE_URL + url;
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `${token}`;
    }

    const BodyRequest = body ? body : undefined;

    const request = await axios({
      method: method,
      url: BaseURL,
      headers: headers,
      data: BodyRequest,
    });

    return request;
  }

  static async get(url, body) {
    return await this.request(HTTP.GET, url, body);
  }
  static async post(url, body) {
    return await this.request(HTTP.POST, url, body);
  }
  static async put(url, body) {
    return await this.request(HTTP.PUT, url, body);
  }

  static async delete(url, body) {
    return await this.request(HTTP.DELETE, url, body);
  }

  static async patch(url, body) {
    return await this.request(HTTP.PATCH, url, body);
  }
  static async setToken(token) {
    await localStorage.setItem("token", token);
    return true;
  }

  static async unsetToken() {
    await localStorage.removeItem("token");
    return true;
  }
}
