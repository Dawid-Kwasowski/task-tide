<template>
   <v-container>
      <v-row>
         <DatePicker is-dark="system" v-model="selectedDay" :attributes="attributes" expanded>
            <template #footer>
               <day-management :selected-date="formatedDate" :data="selectedDayContent"></day-management>
            </template>
         </DatePicker>
      </v-row>
   </v-container>
   
   <action-button id="btn" color="primary" :disabled="!selectedDay">
      <template #body>
         <v-icon class="mr-2" icon="mdi-plus"></v-icon>
         {{ $t('home.fab.t') }}
      </template>
   </action-button>

   <task-form date="22/04/24" activator="#btn" title="Nowe Zadanie"></task-form>
</template>


<script lang="ts" setup>

import { DatePicker } from 'v-calendar'
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import DayManagement from './components/DayManagement.vue'
import ActionButton from '@/components/ActionButton/ActionButton.vue'
import TaskForm from './components/TaskForm/TaskForm.vue'
import { useCalendarStore } from '@/stores/CalendarStore/CalendarStore'
import { ITodo } from '@/models/ITodo'
import { mapStatus } from '@/utils/colorStatus'

const { todos } = useCalendarStore()

const selectedDay = ref<Date | number>(new Date)

const formatedDate = computed(() => {
   if (!selectedDay.value) return ""
   return format(selectedDay.value, 'MM/dd/yyyy')
})

const selectedDayContent = computed((): ITodo[]  => {
return selectedDay.value
   ? todos.filter(({date}): boolean => date === formatedDate.value)
   : [] 
})

const attributes = computed(() => [
   ...todos.map((todo => ({
      dates: todo.date,
      dot: {
         color: mapStatus(todo.status),
      },
      popover: {
         label: todo.title,
      }
   }))),
])

</script>

<style>
   .position-absolute {
      position: absolute;
   }
</style>
