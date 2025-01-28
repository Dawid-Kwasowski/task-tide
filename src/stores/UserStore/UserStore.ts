import { defineStore } from "pinia";
import IUserState, {
  TNewUserInfo,
  IOwnerInfo,
  IUserInfo,
} from "./models/UserInfo";
import { supabase } from "@/plugins/supabase";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@vueuse/core";
import handleDatabaseAction from "@/utils/handleDatabaseAction";

export const useUserStore = defineStore("UserStore", {
  state: (): IUserState => ({
    userList: [] as IUserInfo[],
    user: useLocalStorage("pinia/user/user-info", {
      user: {} as IUserInfo,
    }),
  }),
  actions: {
    async fetchProfiles(): Promise<void> {
      await handleDatabaseAction(async () => {
        const { data, error, status } = await supabase
          .from("profiles")
          .select("user_id, username, avatar_url");

        if (error && status !== 406) throw error;
        if (data) this.userList = data as IUserInfo[];
      });
    },

    async addUser(newUser: TNewUserInfo): Promise<void> {
      const owner = await supabase.auth.getUser();
      await handleDatabaseAction(async () => {
        if (this.userList.some((user) => user.username === newUser.username)) {
          throw new Error("Username already exists.");
        }

        const { error } = await supabase.from("profiles").insert({
          user_id: uuidv4(),
          updated_at: new Date().toISOString(),
          username: newUser.username,
          avatar_url: newUser.avatar_url,
          owner_id: owner.data.user.id,
        });

        if (error) throw error;

        await this.fetchProfiles();
      }, "User added successfully");
    },

    async deleteUser(userId: string): Promise<void> {
      await handleDatabaseAction(async () => {
        const { error } = await supabase
          .from("profiles")
          .delete()
          .eq("user_id", userId);

        if (error) throw error;

        await this.fetchProfiles();
      }, "User deleted successfully");
    },

    async updateUsername(userId: string, username: string): Promise<void> {
      await handleDatabaseAction(async () => {
        const { error } = await supabase
          .from("profiles")
          .update({ username })
          .eq("user_id", userId);

        if (error) throw error;

        await this.fetchProfiles();
      }, "Username updated successfully");
    },

    async updateAvatar(
      userId: string,
      avatarUrl: string | null,
    ): Promise<void> {
      await handleDatabaseAction(
        async () => {
          const { error } = await supabase
            .from("profiles")
            .update({ avatar_url: avatarUrl })
            .eq("user_id", userId);

          if (error) throw error;

          await this.fetchProfiles();
        },
        avatarUrl
          ? "Avatar updated successfully"
          : "Avatar deleted successfully",
      );
    },

    saveUserInfo(user: IUserInfo): void {
      this.user = user;
    },

    clearUserInfo(): void {
      this.user = {} as IUserInfo;
    },
  },
});
