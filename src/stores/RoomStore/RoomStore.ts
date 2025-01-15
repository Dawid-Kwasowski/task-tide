import { defineStore } from "pinia";
import { supabase } from "@/plugins/supabase";
import { IRooms } from "@/stores/RoomStore/model/IRooms";
import { IDuty } from "@/stores/RoomStore/model/IDuty";

export const useRoomStore = defineStore("RoomStore", {
  state: (): {
    rooms: IRooms[];
  } => ({
    rooms: [],
  }),
  actions: {
    getRooms: async function () {
      const { data, error } = await supabase
        .from("rooms")
        .select(
          "*, duties (title, description, id, state, exp_time), profiles (username, avatar_url)",
        );
      console.log(error);
      this.rooms = <IRooms[]>data;
    },

    rotateUsers: async function () {
      const { data, error } = await supabase.rpc("rotate_user_assignments");
      if (error) console.error(error);
      else console.log(data);
    },

    addDutyToRoom: async function (payload: IDuty) {
      try {
        const { error } = await supabase
          .from("duties")
          .insert([
            {
              title: payload.title,
              description: payload.description,
              room_id: payload.room_id,
            },
          ])
          .select();

        console.log(error);
      } catch (err) {
        console.error(err);
      }
    },
    editDuty: async function (payload: IDuty) {
      try {
        console.log("payload", payload);
        const { error } = await supabase
          .from("duties")
          .update({
            title: payload.title,
            description: payload.description,
          })
          .eq("id", payload.id)
          .select();
        console.log(error);
      } catch (err) {
        console.error(err);
      }
    },
    removeDuty: async function (id: string) {
      try {
        const { error } = await supabase.from("duties").delete().eq("id", id);
        console.log(error);
      } catch (err) {
        console.error(err);
      }
    },
  },
});
