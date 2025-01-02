import { defineStore } from "pinia";
import IDuty from "@/views/HomeView/components/DutiesComponent/model/IDuty";
import { supabase } from "@/plugins/supabase";

export const useDutyStore = defineStore("DutyStore", {
  state: (): { duties: IDuty[] } => ({
    duties: [],
  }),
  actions: {
    getDuties: async function () {
      try {
        const { data: duties, error } = await supabase
          .from("duties")
          .select("*");

        if (error) throw error;
        this.duties = <any>duties;
      } catch (e) {
        console.error("Error during duties fetching:", e);
      }
    },

    updateDuties: async function (user_id: string, id: string): Promise<void> {
      const { data, error } = await supabase
        .from("duties")
        .update({ id })
        .eq("user_id", user_id)
        .select();
    },
  },
});
