import axios from "axios";

export default class Http {
  constructor() {
    this.http = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      credentials: "include",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "_csrf-token": "",
      },
    });
  }
}
