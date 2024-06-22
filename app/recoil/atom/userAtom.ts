import { atom } from "recoil";

export const userAtom = atom({
  key: "userState",
  default: {
    id: "",
    name: "",
    email: "",
    showDialog: false,
  },
});
