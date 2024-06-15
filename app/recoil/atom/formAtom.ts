import { atom } from "recoil";

export const formAtom = atom({
  key: "formState",
  default: {
    deleteFormId: "",
  },
});
