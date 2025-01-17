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
const confirmDialogTitle = t("home.duty.confirmDialogTitle");
const confirmDialogContent = t("home.duty.confirmDialogContent");

const addFormDialog = ref(false);
const editFormDialog = ref(false);
const editRoomFormDialog = ref(false);
const confirmDialog = ref(false);

const selectedDuty = ref(undefined);

const openEditDialog = () => {
  editFormDialog.value = true;
};

const openConfirmDialog = () => {
  confirmDialog.value = true;
};

const assignDuty = (id: string) => {
  return room.value.duties.find((duty: any) => duty.id === id);
};

const editDuty = (id: string) => {
  openEditDialog();
  selectedDuty.value = assignDuty(id);
};

const prepareDutyToDelete = (id: string) => {
  openConfirmDialog();
  selectedDuty.value = assignDuty(id);
};

const removeDuty = () => {
  roomStore.removeDuty(selectedDuty.value.id);
  confirmDialog.value = false;
};

const openDutyDialog = () => {
  addFormDialog.value = true;
};

const openRoomEditDialog = () => {
  editRoomFormDialog.value = true;
};

const makeAction = () => {
  props.editMode ? openRoomEditDialog() : openDutyDialog();
};

const actionIcon = computed(() => (props.editMode ? "mdi-pencil" : "mdi-plus"));
const actionColor = computed(() => (props.editMode ? "warning" : "primary"));
</script>

<template>
  <div class="ma-4">
    <v-card min-width="300" class="mx-2">
      <v-card-title class="d-flex align-center justify-space-between">
        <h3>{{ room.name }}</h3>
        <div class="d-flex justify-end ma-2">
          <v-avatar v-for="key in room.profiles" :key>
            <v-img :src="key"></v-img>
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
                  @click="editDuty(item.id)"
                  color="warning"
                  icon="mdi-pencil"
                  variant="text"
                  class="mx-1"
                ></v-btn>
                <v-btn
                  @click="prepareDutyToDelete(item.id)"
                  color="red"
                  icon="mdi-trash-can"
                  variant="text"
                  class="mx-1"
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
          :color="actionColor"
          @click="makeAction"
          block
          :icon="actionIcon"
        >
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <!--  Dialogs -->
  <Dialog v-model="addFormDialog">
    <template #header>
      {{ t("home.duty.dutyForm.newDuty") }}
    </template>
    <template #content>
      <duty-form :room_id="room.room_id" />
    </template>
  </Dialog>

  <Dialog v-model="editRoomFormDialog">
    <template #header>
      {{ t("home.duty.roomForm.editRoom") }}
    </template>
    <template #content>
      <room-form :edit-mode="true" :room />
    </template>
  </Dialog>

  <Dialog v-model="editFormDialog">
    <template #header>
      {{ t("home.duty.dutyForm.editDuty") }}
    </template>
    <template #content>
      <duty-form
        :duty="selectedDuty"
        :edit_mode="editFormDialog"
        :room_id="room.room_id"
      />
    </template>
  </Dialog>

  <confirm-dialog
    @confirm="removeDuty()"
    @close="confirmDialog = false"
    :content="confirmDialogContent"
    :title="confirmDialogTitle"
    v-model="confirmDialog"
  ></confirm-dialog>
</template>
