<script setup lang="ts">
import { useRoomStore } from "@/stores/RoomStore/RoomStore";
import { useI18n } from "vue-i18n";
import Room from "@/views/HomeView/views/DutiesView/components/Room/Room.vue";
import ActionButton from "@/components/ActionButton/ActionButton.vue";
import Dialog from "@/components/Dialog/Dialog.vue";
import { computed, ref } from "vue";
import RoomForm from "@/views/HomeView/views/DutiesView/components/RoomForm/RoomForm.vue";
const { t } = useI18n();

const roomsStore = useRoomStore();

const makeRotation = async () => {
  await roomsStore.rotateUsers();
};

const roomFormDialog = ref(false);
const editMode = ref(false);

const editButtonVariant = computed(() => (editMode.value ? "flat" : "text"));

const atLeastOneRoom = computed(() => roomsStore.rooms.length > 0);

const draggable = computed(() => editMode.value);
</script>

<template>
  <v-container>
    <v-row justify="space-between">
      <v-col>
        <h1>{{ t("home.duty.t") }}</h1>
      </v-col>
      <template v-if="atLeastOneRoom">
        <v-col class="d-flex justify-end ga-2" align-self="center">
          <v-btn
            @click="editMode = !editMode"
            prepend-icon="mdi-pencil"
            color="warning"
            :variant="editButtonVariant"
          >
            {{
              editMode ? t("home.duty.editModeOff") : t("home.duty.editModeOn")
            }}
          </v-btn>
          <v-btn prepend-icon="mdi-restore" @click="makeRotation">{{
            t("home.duty.rotation")
          }}</v-btn>
        </v-col>
      </template>
    </v-row>
    <v-row>
      <template v-if="atLeastOneRoom">
        <v-col v-for="(value, key) in roomsStore.rooms" :key>
          <room :draggable :edit-mode="editMode" :room="value" :name="key" />
        </v-col>
      </template>
      <template v-else>
        <v-col>
          <v-alert type="info" color="primary" variant="tonal">
            {{ t("home.duty.roomList.empty") }}
          </v-alert>
        </v-col>
      </template>
    </v-row>
  </v-container>

  <action-button @click="roomFormDialog = true" color="primary">
    <template #body>
      <v-icon class="mr-2" icon="mdi-plus"></v-icon>
      {{ t("home.duty.addRoom") }}
    </template>
  </action-button>

  <Dialog v-model="roomFormDialog">
    <template #header>
      {{ t("home.duty.roomForm.newRoom") }}
    </template>
    <template #content>
      <room-form />
    </template>
  </Dialog>
</template>
