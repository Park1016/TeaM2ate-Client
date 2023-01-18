import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const authState = atom({
  key: "authState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const getAuthState = selector({
  key: "auth/get",
  get: () => {
    return authState;
  },
});
