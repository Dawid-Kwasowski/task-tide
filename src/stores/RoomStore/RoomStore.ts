import { defineStore } from "pinia";
import { supabase } from "@/plugins/supabase";
import {
  IRooms,
  TEditRoomPayload,
  TRoomPayload,
} from "@/stores/RoomStore/model/IRooms";
import { IDuty } from "@/stores/RoomStore/model/IDuty";

export const useRoomStore = defineStore("RoomStore", {
  state: (): {
    rooms: IRooms[];
  } => ({
    rooms: [],
  }),
  actions: {
    getRooms: async function () {
      const { data } = await supabase
        .from("rooms")
        .select(
          "*, duties (title, description, id, state, exp_time), profiles (username, avatar_url)",
        );
      this.rooms = <IRooms[]>data;
    },
    addRoom: async function (payload: TRoomPayload) {
      const { data, error } = await supabase
        .from("rooms")
        .insert([payload])
        .select();
    },
    editRoom: async function (payload: TEditRoomPayload) {
      const { data, error } = await supabase
        .from("rooms")
        .update({ user_id: payload.user_id, name: payload.name })
        .eq("room_id", payload.room_id)
        .select();
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
