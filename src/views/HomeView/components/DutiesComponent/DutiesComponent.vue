<script setup lang="ts">
import IDuty from "@/views/HomeView/components/DutiesComponent/model/IDuty";
import { IUserInfo } from "@/stores/UserStore/models/UserInfo";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { IAssignedDuties } from "@/views/HomeView/components/DutiesComponent/components/model/IRotationForm";

const props = defineProps<{ users: IUserInfo[]; items: IDuty[] }>();

const { t } = useI18n();

const assignedDutiesToUsers = computed<IAssignedDuties[]>(() => {
  const assignedDuties: IAssignedDuties[] = [];
  if (!props.users || props.users.length === 0) return assignedDuties;

  props.users.forEach((user: IUserInfo) => {
    const duties = props.items.filter((duty) => duty.user_id === user.user_id);
    assignedDuties.push({
      user_id: user.user_id,
      duties: duties,
      username: user!.username,
      avatar: user?.avatar_url,
    });
  });
  return assignedDuties;
});
</script>

<template>
  <v-card>
    <v-card-title>{{ t("home.duty.t") }}</v-card-title>
    <v-list lines="two">
      <v-list-item
        :prepend-avatar="item.avatar"
        v-for="item in assignedDutiesToUsers"
        :key="item.id"
      >
        <v-chip
          color="success"
          class="mx-2 cursor-default"
          :key="index"
          v-for="(duty, index) in item.duties"
          >{{ duty.title }}</v-chip
        >
      </v-list-item>
    </v-list>
  </v-card>
</template>
