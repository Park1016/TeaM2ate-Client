import { createContext } from "react";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

import UserApi from "api/user";

export const httpSelector = selector({
  key: "httpSelector",
  get: async () => {
    try {
      // const data = await new UserApi().csrfToken();
      const http = {
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          // "_csrf-token": data,
        },
      };
      return http;
    } catch (err) {
      throw err;
    }
  },
});
