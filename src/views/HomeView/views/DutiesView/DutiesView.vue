<script setup lang="ts">
import { useRoomStore } from "@/stores/RoomStore/RoomStore";
import { useI18n } from "vue-i18n";
import Room from "@/views/HomeView/views/DutiesView/components/Room/Room.vue";
import ActionButton from "@/components/ActionButton/ActionButton.vue";
const { t } = useI18n();

const roomsStore = useRoomStore();

const makeRotation = async () => {
  await roomsStore.rotateUsers();
};
</script>

<template>
  <v-container>
    <v-row justify="space-between">
      <v-col>
        <h1>{{ t("home.duty.t") }}</h1>
      </v-col>
      <v-col class="d-flex justify-end" align-self="center">
        <v-btn @click="makeRotation">{{ t("home.duty.rotation") }}</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(value, key) in roomsStore.rooms" :key>
        <room :room="value" :name="key" />
      </v-col>
    </v-row>
  </v-container>

  <action-button color="primary">
    <template #body>
      <v-icon class="mr-2" icon="mdi-plus"></v-icon>
      {{ t("home.duty.addRoom") }}
    </template>
  </action-button>
</template>
