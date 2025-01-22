<script setup lang="ts">
import { IRoomsProps } from "@/views/HomeView/views/DutiesView/components/Room/model/IRoomsProps";
import { useI18n } from "vue-i18n";
import Dialog from "@/components/Dialog/Dialog.vue";
import { computed, ref } from "vue";
import DutyForm from "@/views/HomeView/views/DutiesView/components/Room/components/DutyForm/DutyForm.vue";
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog.vue";
import { useRoomStore } from "@/stores/RoomStore/RoomStore";
import RoomForm from "@/views/HomeView/views/DutiesView/components/RoomForm/RoomForm.vue";

const props = defineProps<IRoomsProps>();

const room = computed(() => props.room);
const { t } = useI18n();
const roomStore = useRoomStore();

const addFormDialog = ref(false);
const editFormDialog = ref(false);
const editRoomFormDialog = ref(false);
const confirmDialog = ref(false);
const confirmRemoveRoomDialog = ref(false);

// Selected duty state
const selectedDuty = ref(undefined);

// Utility functions
const openDialog = (dialogRef: any) => {
  dialogRef.value = true;
};

const assignDuty = (id: string) => {
  return room.value.duties.find((duty: any) => duty.id === id);
};

const editDuty = (id: string) => {
  openDialog(editFormDialog);
  selectedDuty.value = assignDuty(id);
};

const prepareDutyToDelete = (id: string) => {
  openDialog(confirmDialog);
  selectedDuty.value = assignDuty(id);
};

const removeDuty = () => {
  if (selectedDuty.value) {
    roomStore.removeDuty(selectedDuty.value.id);
  }
  confirmDialog.value = false;
};

const removeRoom = () => {
  roomStore.removeRoom(props.room.room_id);
};

const makeAction = () => {
  props.editMode ? openDialog(editRoomFormDialog) : openDialog(addFormDialog);
};

// Computed properties
const actionIcon = computed(() => (props.editMode ? "mdi-pencil" : "mdi-plus"));
const actionColor = computed(() => (props.editMode ? "warning" : "primary"));
</script>

<template>
  <div class="ma-4">
    <v-card min-width="300" class="mx-2">
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="d-flex ga-3">
          <v-btn
            v-if="editMode"
            icon="mdi-trash-can"
            density="comfortable"
            color="red"
            @click="confirmRemoveRoomDialog = true"
          ></v-btn>
          <h3>{{ room.name }}</h3>
        </div>
        <div class="d-flex justify-end ma-2">
          <v-avatar
            size="42"
            color="surface-variant"
            class="pa-1 cursor-default"
          >
            <template v-if="room.profiles.avatar_url">
              <v-img :src="room.profiles.avatar_url" />
            </template>
            <template v-else>
              <span class="text-h5">
                {{ room.profiles.username.charAt(0).toUpperCase() }}
              </span>
            </template>
            <v-tooltip activator="parent" location="bottom">
              {{ room.profiles.username }}
            </v-tooltip>
          </v-avatar>
        </div>
      </v-card-title>

      <v-divider />

      <v-card-item>
        <v-list select-strategy="leaf">
          <v-list-item
            v-for="item in room.duties"
            :key="item.id"
            :title="item.title"
            :subtitle="item.description"
          >
            <template #append>
              <div>
                <v-btn
                  color="warning"
                  icon="mdi-pencil"
                  variant="text"
                  class="mx-1"
                  @click="editDuty(item.id)"
                ></v-btn>
                <v-btn
                  color="red"
                  icon="mdi-trash-can"
                  variant="text"
                  class="mx-1"
                  @click="prepareDutyToDelete(item.id)"
                ></v-btn>
              </div>
            </template>
          </v-list-item>

          <template v-if="room.duties.length < 1">
            <v-list-item-subtitle>
              {{ t("home.duty.list.empty") }}
            </v-list-item-subtitle>
          </template>
        </v-list>
      </v-card-item>

      <v-card-actions>
        <v-btn
          block
          :color="actionColor"
          :icon="actionIcon"
          @click="makeAction"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </div>

  <!-- Dialogs -->
  <Dialog v-model="addFormDialog">
    <template #header>{{ t("home.duty.dutyForm.newDuty") }}</template>
    <template #content>
      <DutyForm :room_id="room.room_id" />
    </template>
  </Dialog>

  <Dialog v-model="editRoomFormDialog">
    <template #header>{{ t("home.duty.roomForm.editRoom") }}</template>
    <template #content>
      <RoomForm :edit-mode="true" :room="room" />
    </template>
  </Dialog>

  <Dialog v-model="editFormDialog">
    <template #header>{{ t("home.duty.dutyForm.editDuty") }}</template>
    <template #content>
      <DutyForm
        :duty="selectedDuty"
        :edit_mode="editFormDialog"
        :room_id="room.room_id"
      />
    </template>
  </Dialog>

  <ConfirmDialog
    v-model="confirmDialog"
    :content="t('home.duty.confirmRemoveDuty.content')"
    :title="t('home.duty.confirmRemoveDuty.t')"
    @close="confirmDialog = false"
    @confirm="removeDuty"
  />

  <ConfirmDialog
    v-model="confirmRemoveRoomDialog"
    :content="t('home.duty.confirmRemoveRoom.content')"
    :title="t('home.duty.confirmRemoveRoom.t')"
    @close="confirmRemoveRoomDialog = false"
    @confirm="removeRoom"
  />
</template>
