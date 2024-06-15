import { FormDetailsPrisma } from "@/lib/types";
import { atom } from "recoil";

export const formAtom = atom({
  key: "formRecoilState",
  default: {
    forms: [] as FormDetailsPrisma[],
    deleteFormId: "",
  },
});
