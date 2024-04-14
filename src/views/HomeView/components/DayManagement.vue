<script setup lang="ts">
import type { IDayManagement } from "./models/IDayManagement"
import { useCalendarStore } from '@/stores/CalendarStore/CalendarStore'
import { format } from "date-fns";
import { reactive } from 'vue'
import { mapStatus } from '@/utils/colorStatus'
const store = useCalendarStore()


const props = defineProps<{ data: IDayManagement[] }>()

const newTask: IDayManagement = reactive({
  creator: 'Dawid',
  date: format(new Date, 'MM/dd/yyyy'),
  status: 'todo',
  description: '',
  title: ''
})

const addTask = (): void => {

  const payload = structuredClone(newTask)
 
  store.addTask(payload)
}

</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field append-inner-icon="mdi-plus" v-model="newTask.title" 
          @click:append-inner="addTask" :label="$t('home.task.placeholder')"
            variant="solo-filled"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="text-subtitle-4 mb-2">{{ $t('home.task.todayList') }}</div>

          <template v-if="props.data.length > 0">
            <v-expansion-panels>
              <v-expansion-panel v-for="(task, index) in props.data" :key="index">
                <v-expansion-panel-title>
                <span class="mr-2"> {{ task.title }}</span>
                <v-chip
                  rounded
                  variant="tonal" 
                  :color="mapStatus(task.status)" 
                  :text="task.status"></v-chip>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ task.description }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
          <template v-else>

            <v-list density="compact" rounded>
              <v-list-item>{{ $t('home.task.emptyList') }}</v-list-item>
            </v-list>
          </template>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
