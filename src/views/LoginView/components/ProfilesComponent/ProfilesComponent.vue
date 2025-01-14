<template>
  <v-row>
    <v-col>
      <h1 class="text-center text-h2 my-5">
        {{ t("accounts.chooseProfile") }}
      </h1>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="2" class="d-flex justify-center">
      <div class="d-flex align-center flex-column">
        <v-btn
          elevation="5"
          @click="emit('createProfile')"
          variant="tonal"
          class="text-h4"
          color="primary"
          size="100"
          icon="$plus"
        ></v-btn>
        <span class="text-center mt-5">{{ t("accounts.createProfile") }}</span>
      </div>
    </v-col>
    <template v-if="userList.length > 0">
      <v-col
        cols="12"
        md="2"
        class="align-center justify-space-between d-flex flex-column"
        :key="user_id"
        v-for="{ username, avatar_url, user_id } in userList"
      >
        <v-avatar
          @click="selectProfile({ username, avatar_url, user_id })"
          :id="`menu-activator-${user_id}`"
          class="cursor-pointer position-relative"
          color="surface-variant"
          size="100"
        >
          <template v-if="editMode">
            <div class="index-10 position-absolute">
              <v-icon class="text-white" icon="mdi-pencil"></v-icon>
            </div>

            <UserManagamentMenu
              :index="user_id"
              :user_id="user_id"
              :username="username"
              :avatar_url="avatar_url"
            >
            </UserManagamentMenu>

            <div
              class="position-absolute bg-black opacity-70 h-100 w-100"
            ></div>
          </template>
          <template v-if="avatar_url">
            <v-img :src="avatar_url"></v-img>
          </template>
          <template v-else>
            <span class="text-h5">
              {{ username.charAt(0).toUpperCase() }}
            </span>
          </template>
        </v-avatar>
        <span>{{ username }}</span>
      </v-col>
    </template>
  </v-row>

  <v-row v-if="userList.length > 0" justify="center">
    <v-col cols="auto">
      <v-btn @click="toggleEditMode" prepend-icon="mdi-pencil">{{
        t("auth.editProfiles.management")
      }}</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/UserStore/UserStore";
import { onBeforeMount, ref } from "vue";
import { storeToRefs } from "pinia";
import UserManagamentMenu from "../UserManagamentMenu/UserManagamentMenu.vue";
import { IUserInfo } from "@/stores/UserStore/models/UserInfo";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
const store = useUserStore();

const { userList } = storeToRefs(store);

const router = useRouter();
const { t } = useI18n();

const editMode = ref(false);

const toggleEditMode = (): void => {
  editMode.value = !editMode.value;
};

const selectProfile = async (profile: IUserInfo): Promise<void> => {
  if (editMode.value) return;
  await store.saveUserInfo(profile);
  router.push({ path: "/" });
};

onBeforeMount(async (): Promise<void> => {
  await store.getProfiles();
});

const emit = defineEmits(["createProfile"]);
</script>
<style>
.index-10 {
  z-index: 100;
}
</style>
