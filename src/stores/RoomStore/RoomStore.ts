import { defineStore } from "pinia";
import { supabase } from "@/plugins/supabase";
import {
  IRooms,
  TEditRoomPayload,
  TRoomPayload,
} from "@/stores/RoomStore/model/IRooms";
import { IDuty } from "@/stores/RoomStore/model/IDuty";
import handleDatabaseAction from "@/utils/handleDatabaseAction";

export const useRoomStore = defineStore("RoomStore", {
  state: (): {
    rooms: IRooms[];
  } => ({
    rooms: [],
  }),

  actions: {
    async getRooms() {
      const { data } = await supabase
        .from("rooms")
        .select(
          "*, duties (title, description, id, state, exp_time), profiles (username, avatar_url)",
        );
      this.rooms = <IRooms[]>data;
    },

    async addRoom(payload: TRoomPayload) {
      await handleDatabaseAction(async () => {
        const { error } = await supabase.from("rooms").insert([payload]);
        if (error) throw error;
      }, "home.room.notification.created");
    },

    async editRoom(payload: TEditRoomPayload) {
      await handleDatabaseAction(async () => {
        const { error } = await supabase
          .from("rooms")
          .update({ user_id: payload.user_id, name: payload.name })
          .eq("room_id", payload.room_id);
        if (error) throw error;
      }, "home.room.notification.edited");
    },

    async removeRoom(room_id: string) {
      await handleDatabaseAction(async () => {
        const { error } = await supabase
          .from("rooms")
          .delete()
          .eq("room_id", room_id);
        if (error) throw error;
      }, "home.room.notification.deleted");
    },

    async rotateUsers() {
      await handleDatabaseAction(async () => {
        const { error } = await supabase.rpc("rotate_user_assignments");
        if (error) throw error;
      }, "home.room.notification.usersRotated");
    },

    async addDutyToRoom(payload: IDuty) {
      await handleDatabaseAction(async () => {
        const { error } = await supabase.from("duties").insert([
          {
            title: payload.title,
            description: payload.description,
            room_id: payload.room_id,
          },
        ]);
        if (error) throw error;
      }, "home.duty.notification.created");
    },

    async editDuty(payload: IDuty) {
      await handleDatabaseAction(async () => {
        const { error } = await supabase
          .from("duties")
          .update({
            title: payload.title,
            description: payload.description,
          })
          .eq("id", payload.id);
        if (error) throw error;
      }, "home.duty.notification.edited");
    },

    async removeDuty(id: string) {
      await handleDatabaseAction(async () => {
        const { error } = await supabase.from("duties").delete().eq("id", id);
        if (error) throw error;
      }, "home.duty.notification.deleted");
    },
  },
});
