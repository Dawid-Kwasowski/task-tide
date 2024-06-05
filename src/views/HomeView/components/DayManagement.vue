<script setup lang="ts">
import type { IDayManagement } from "./models/IDayManagement";
import { useCalendarStore } from "@/stores/CalendarStore/CalendarStore";

const store = useCalendarStore();

const props = defineProps<{
  data: IDayManagement[];
  selectedDate: Date | string | Date[] | string[];
}>();
</script>

<template>
  <div>
    <v-container>
      <v-divider></v-divider>
      <v-row class="mt-2">
        <v-col cols="12">
          <template v-if="props.data.length > 0">
            <div class="text-subtitle-4 mb-2">{{ $t("home.task.todayList") }}</div>
            <v-expansion-panels>
              <v-expansion-panel v-for="(task, index) in props.data" :key="index">
                <v-expansion-panel-title>
                  <span class="mr-2"> {{ task.title }}</span>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                  <span class="text-subtitle-2">
                    {{ task.description || $t("home.task.noDescription") }}
                  </span>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
          <template v-else-if="store.upcomingTasks.length > 0">
            <div class="text-subtitle-4 mb-2">{{ $t("home.task.closestTask") }}</div>
            <v-list density="compact" rounded>
              <v-list-item v-for="(task, index) in store.upcomingTasks" :key="index">
                <v-list-item-subtitle> {{ task.deadline }} </v-list-item-subtitle>
                <v-list-item-title> {{ task.title }} </v-list-item-title>
                <v-divider :thickness="2"></v-divider>
              </v-list-item>
            </v-list>
          </template>
          <template v-else>
            <v-list density="compact" rounded>
              <v-list-item
                ><span class="mr-2"> {{ $t("home.task.emptyList") }}</span></v-list-item
              >
            </v-list>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
