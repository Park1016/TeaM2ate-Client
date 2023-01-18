import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({ storage: sessionStorage });

export const modalState = atom({
  key: "modalState",
  default: { login: false, signup: false, find: false },
  effects_UNSTABLE: [persistAtom],
});
