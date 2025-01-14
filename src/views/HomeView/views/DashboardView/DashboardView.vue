<script setup lang="ts">
import { useUserStore } from "@/stores/UserStore/UserStore";
import { useTaskStore } from "@/stores/TaskStore/TasksStore";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { format } from "date-fns";
import { ITodo } from "@/models/ITodo";
import { mapStatus } from "@/utils/colorStatus";
import { DatePicker } from "v-calendar";
import DayManagement from "@/views/HomeView/components/DayManagement.vue";
import TaskForm from "@/views/HomeView/components/TaskForm/TaskForm.vue";
import ActionButton from "@/components/ActionButton/ActionButton.vue";
import Dialog from "@/components/Dialog/Dialog.vue";

const userStore = useUserStore();

const todosStore = useTaskStore();

const { todos } = storeToRefs(todosStore);
const { user } = storeToRefs(userStore);

const { t } = useI18n();
const selectedDay = ref<Date | number>(new Date());

const skeleton = ref(false);

const taskFormDialog = ref(false);

const formatedDate = computed(() => {
  if (!selectedDay.value) return "";
  return format(selectedDay.value, "yyyy-MM-dd");
});

const selectedDayContent = computed((): ITodo[] => {
  return selectedDay.value
    ? todos.value.filter(
        ({ deadline }): boolean => deadline === formatedDate.value,
      )
    : [];
});

const attributes = computed(() => [
  ...todos.value.map((todo) => ({
    dates: todo.deadline,
    dot: {
      color: mapStatus(todo?.status || "todo"),
    },
    popover: {
      label: todo.title,
    },
  })),
]);
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{ t("") }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <template v-if="skeleton">
        <v-skeleton-loader width="100%" type="card"></v-skeleton-loader>
      </template>
      <template v-else>
        <DatePicker
          class="bg-primary"
          is-dark="system"
          v-model="selectedDay"
          :attributes="attributes"
          expanded
        >
          <template #footer>
            <day-management
              :selected-date="formatedDate"
              :data="selectedDayContent"
            ></day-management>
          </template>
        </DatePicker>
      </template>
    </v-row>
  </v-container>

  <action-button
    @click="taskFormDialog = true"
    color="primary"
    :disabled="!selectedDay"
  >
    <template #body>
      <v-icon class="mr-2" icon="mdi-plus"></v-icon>
      {{ t("home.fab.t") }}
    </template>
  </action-button>

  <Dialog v-model="taskFormDialog">
    <template #header> {{ t("home.task.t") }}</template>
    <template #content>
      <task-form :creator_id="user.user_id" :deadline="formatedDate" />
    </template>
  </Dialog>
</template>
