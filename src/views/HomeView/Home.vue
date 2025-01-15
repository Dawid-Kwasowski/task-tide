<template>
  <div>
    <v-app-bar color="primary" prominent>
      <div class="d-flex align-center justify-space-between w-100">
        <div class="d-flex align-center">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            class="mx-2"
            variant="text"
          ></v-app-bar-nav-icon>
          <v-avatar class="mx-2" color="surface-variant">
            <template v-if="user.avatar_url">
              <v-img :src="user.avatar_url"></v-img>
            </template>
            <template v-else>
              <span class="text-h5">
                {{ user.username.charAt(0).toUpperCase() }}
              </span>
            </template>
          </v-avatar>
          <div class="d-flex flex-column">
            <div>{{ t("home.bar.hello") }}</div>
            <div>{{ user.username }}</div>
          </div>
        </div>
        <v-btn @click="logoutProfile" class="mx-2" variant="text" icon>
          <v-icon icon="mdi-logout"></v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute>
      <v-list density="compact" nav>
        <v-list-item
          @click="route.push({ name: value })"
          exact
          :lines="false"
          :value="value"
          v-for="{ title, value } in items"
          :key="value"
        >
          <v-list-item-title> {{ t(title) }} </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/UserStore/UserStore";
import { useTaskStore } from "@/stores/TaskStore/TasksStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useRoomStore } from "@/stores/RoomStore/RoomStore";
import { supabase } from "@/plugins/supabase";

const route = useRouter();
const { t } = useI18n();
const userStore = useUserStore();
const todosStore = useTaskStore();
const roomsStore = useRoomStore();

const { user } = storeToRefs(userStore);

const drawer = ref(false);

const logoutProfile = async () => {
  await userStore.removeUserInfo();
  await route.push({ path: "/browse" });
};

const items = route
  .getRoutes()
  .filter((route) => {
    return route.path.startsWith("/dashboard/");
  })
  .map(({ name }) => ({
    title: `home.bar.navigation.${name as String}`,
    value: name,
  }));
onMounted(async () => {
  await todosStore.getTask();
  await roomsStore.getRooms();
  await userStore.getProfiles();
  supabase
    .channel("tasks-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "tasks" },
      async () => {
        await todosStore.getTask();
      },
    )
    .subscribe();

  supabase
    .channel("duties-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "duties" },
      async () => {
        await roomsStore.getRooms();
      },
    )
    .subscribe();

  supabase
    .channel("rooms-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "rooms" },
      async () => {
        await roomsStore.getRooms();
      },
    )
    .subscribe();
});
</script>
