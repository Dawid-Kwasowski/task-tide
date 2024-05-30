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
      <v-btn @click="logoutProfile" class="mx-2" icon>
        <v-icon icon="mdi-logout"></v-icon>
      </v-btn>
    </div>
  </v-app-bar>

  <v-container>
    <v-row>
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
    </v-row>
  </v-container>

  <action-button id="btn" color="primary" :disabled="!selectedDay">
    <template #body>
      <v-icon class="mr-2" icon="mdi-plus"></v-icon>
      {{ $t("home.fab.t") }}
    </template>
  </action-button>

  <task-form date="22/04/24" activator="#btn" title="Nowe Zadanie"></task-form>
</template>

<script lang="ts" setup>
import { DatePicker } from "v-calendar";
import { ref, computed } from "vue";
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

const store = useUserStore();

const { todos } = useCalendarStore();

const { user } = storeToRefs(store);
const route = useRouter();

const selectedDay = ref<Date | number>(new Date());

const formatedDate = computed(() => {
  if (!selectedDay.value) return "";
  return format(selectedDay.value, "MM/dd/yyyy");
});

const selectedDayContent = computed((): ITodo[] => {
  return selectedDay.value
    ? todos.filter(({ date }): boolean => date === formatedDate.value)
    : [];
});

const logoutProfile = async () => {
  await store.removeUserInfo();
  route.push({ path: "/browse" });
};

const attributes = computed(() => [
  ...todos.map((todo) => ({
    dates: todo.date,
    dot: {
      color: mapStatus(todo.status),
    },
    popover: {
      label: todo.title,
    },
  })),
]);
</script>

<style>
.position-absolute {
  position: absolute;
}
</style>
