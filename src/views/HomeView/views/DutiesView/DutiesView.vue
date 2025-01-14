<script setup lang="ts">
import { useRoomStore } from "@/stores/RoomStore/RoomStore";
import { useI18n } from "vue-i18n";
import Room from "@/views/HomeView/views/DutiesView/components/Room/Room.vue";
const { t } = useI18n();

const roomsStore = useRoomStore();
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ t("home.duty.t") }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(value, key) in roomsStore.rooms" :key>
        <room :room="value" :name="key" />
      </v-col>
    </v-row>
  </v-container>
</template>
