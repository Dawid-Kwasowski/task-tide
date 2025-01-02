import { defineStore } from "pinia";
import { supabase } from "@/plugins/supabase";

const useRoomStore = defineStore("RoomStore", {
  state: (): {
    rooms: any[];
  } => ({
    rooms: [],
  }),
  actions: {
    getRooms: async function () {
      try {
        const { data: rooms, error } = await supabase.from("rooms").select("*");
        this.rooms = <any[]>rooms;
      } catch (e: any) {
        console.error("Error during rooms fetching:", e);
      }
    },
  },
});
