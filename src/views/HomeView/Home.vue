<template>
  <v-app-bar color="primary" prominent>
    <div class="d-flex align-center justify-space-between w-100">
      <div class="d-flex align-center">
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
          <div>{{ $t("home.bar.hello") }}</div>
          <div>{{ user.username }}</div>

        </div>
      </div>
      <v-btn @click="logoutProfile" class="mx-2" variant="text" icon>
        <v-icon icon="mdi-logout"></v-icon>
      </v-btn>
    </div>
  </v-app-bar>

  <v-container>
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

  <action-button @click="taskFormDialog = true"  color="primary" :disabled="!selectedDay">
    <template #body>
      <v-icon class="mr-2" icon="mdi-plus"></v-icon>
      {{ $t("home.fab.t") }}
    </template>
  </action-button>


  <task-form v-model="taskFormDialog" :creator_id="user.user_id" :deadline="formatedDate" activator="#btn" header="Nowe Zadanie"></task-form>
</template>

<script lang="ts" setup>
import { DatePicker } from "v-calendar";
import { ref, computed, onMounted } from "vue";
import { format } from "date-fns";
import DayManagement from "./components/DayManagement.vue";
import ActionButton from "@/components/ActionButton/ActionButton.vue";
import TaskForm from "./components/TaskForm/TaskForm.vue";
import { useCalendarStore } from "@/stores/CalendarStore/CalendarStore";
import { ITodo } from "@/models/ITodo";
import { mapStatus } from "@/utils/colorStatus";
import { useUserStore } from "@/stores/UserStore/UserStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import {supabase} from "@/plugins/supabase";

const userStore = useUserStore();

const todosStore = useCalendarStore();

const { todos } = storeToRefs(todosStore);
const { user } = storeToRefs(userStore);

const route = useRouter();

const selectedDay = ref<Date | number>(new Date());

const skeleton = ref(true);

const taskFormDialog = ref(false);

const formatedDate = computed(() => {
  if (!selectedDay.value) return "";
  return format(selectedDay.value, "yyyy-MM-dd");
});

const selectedDayContent = computed((): ITodo[] => {
  return selectedDay.value
    ? todos.value.filter(({ deadline }): boolean => deadline === formatedDate.value)
    : [];
});

const logoutProfile = async () => {
  await userStore.removeUserInfo();
  route.push({ path: "/browse" });
};

const attributes = computed(() => [
  ...todos.value.map((todo) => ({
    dates: todo.deadline,
    dot: {
      color: mapStatus(todo.status),
    },
    popover: {
      label: todo.title,
    },
  })),
]);

onMounted(async () => {
  await todosStore.getTask();
  supabase.channel('tasks-all-channel')
    .on(
      "postgres_changes",
      { event: '*', schema: 'public', table: 'tasks' },
      async () => {
        await todosStore.getTask();
      }
    )
    .subscribe()

  skeleton.value = false;
});
</script>
