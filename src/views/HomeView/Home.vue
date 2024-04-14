<template>
   <v-container>
      <v-row>
         <DatePicker is-dark="system" v-model="selectedDay" :attributes="attributes" expanded>
            <template #footer>
               <day-management :data="selectedDayContent"></day-management>
            </template>
         </DatePicker>
      </v-row>
   </v-container>
</template>


<script lang="ts" setup>
import { DatePicker } from 'v-calendar'
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import DayManagement from './components/DayManagement.vue'
import { useCalendarStore } from '@/stores/CalendarStore/CalendarStore'
import { ITodo } from '@/models/ITodo'
import { mapStatus } from '@/utils/colorStatus'
const { todos } = useCalendarStore()

const selectedDay = ref<Date | number>(new Date)

const selectedDayContent = computed((): ITodo[]  => {
   return selectedDay.value
      ? todos.filter(({date}): boolean => date === format(selectedDay.value, 'MM/dd/yyyy'))
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
