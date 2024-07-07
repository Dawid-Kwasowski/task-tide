import { defineStore } from "pinia";
import IToast from "./models/IToast";

export const useToastStore = defineStore("toastStore", {
  state: (): IToast => ({
    color: "success",
    message: "",
    showToast: false,
    timeout: undefined,
  }),

  actions: {
    async show(data: IToast): Promise<void> {
      this.message = data.message || "";
      this.color = data.color || "success";
      this.timeout = data.timeout || 2000;
      this.showToast = true;
    },
  },
});
