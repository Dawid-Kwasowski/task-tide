<script setup lang="ts">
import type { IDayManagement } from "./models/IDayManagement";
import { useTaskStore } from "@/stores/TaskStore/TasksStore";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ConfirmDialog from "@/components/ConfirmDialog/ConfirmDialog.vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import TaskForm from "@/views/HomeView/components/TaskForm/TaskForm.vue";
import { ITodo } from "@/models/ITodo";
import Dialog from "@/components/Dialog/Dialog.vue";
const { t } = useI18n();
const store = useTaskStore();

const confirmDialog = ref(false);
const selectedTask = ref<ITodo>();
const taskFormEditDialog = ref(false);

const confirmDialogTitle = t("home.task.confirmDialogTitle");
const confirmDialogContent = t("home.task.confirmDialogContent");

const deleteTask = (): void => {
  store.removeTask(selectedTask.value?.id!);
  confirmDialog.value = false;
};

const props = defineProps<{
  data: IDayManagement[];
  selectedDate: string;
}>();
</script>

<template>
  <div>
    <v-container>
      <v-divider></v-divider>
      <v-row class="mt-2">
        <v-col cols="12">
          <template v-if="props.data.length > 0">
            <div class="text-subtitle-4 mb-2">
              {{ t("home.task.todayList") }}
            </div>
            <v-list rounded>
              <v-list-item v-for="(task, index) in props.data" :key="index">
                <v-list-item-title> {{ task.title }} </v-list-item-title>
                <v-list-item-subtitle>{{
                  task.description
                }}</v-list-item-subtitle>
                <template #append>
                  <v-btn
                    @click="
                      taskFormEditDialog = true;
                      selectedTask = task;
                    "
                    color="warning"
                    icon="mdi-pencil"
                    variant="text"
                    class="mx-1"
                  ></v-btn>
                  <v-btn
                    @click="
                      confirmDialog = true;
                      selectedTask = task;
                    "
                    color="error"
                    icon="mdi-trash-can"
                    variant="text"
                    class="mx-1"
                  ></v-btn>
                </template>
                <v-divider class="my-1" :thickness="2"></v-divider>
              </v-list-item>
            </v-list>
          </template>
          <template v-else-if="store.upcomingTasks.length > 0">
            <div class="text-subtitle-4 mb-2">
              {{ $t("home.task.closestTask") }}
            </div>
            <v-list density="compact" rounded>
              <v-list-item
                v-for="(task, index) in store.upcomingTasks"
                :key="index"
              >
                <v-list-item-subtitle>
                  {{ task.deadline }}
                </v-list-item-subtitle>
                <v-list-item-title> {{ task.title }} </v-list-item-title>
                <v-divider :thickness="2"></v-divider>
              </v-list-item>
            </v-list>
          </template>
          <template v-else>
            <v-list density="compact" rounded>
              <v-list-item
                ><span class="mr-2">
                  {{ t("home.task.emptyList") }}</span
                ></v-list-item
              >
            </v-list>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!--  Modals -->
  <confirm-dialog
    @confirm="deleteTask()"
    @close="confirmDialog = false"
    :content="confirmDialogContent"
    :title="confirmDialogTitle"
    v-model="confirmDialog"
  ></confirm-dialog>

  <Dialog v-model="taskFormEditDialog">
    <template #header>
      {{ t("home.task.editMode") }}
    </template>
    <template #content>
      <task-form
        @edit="taskFormEditDialog = false"
        :edit-mode="true"
        :title="selectedTask?.title"
        :creator_id="selectedTask?.creator_id"
        :deadline="selectedTask!.deadline"
        :id="selectedTask?.id"
        :description="selectedTask?.description"
      ></task-form>
    </template>
  </Dialog>
</template>
