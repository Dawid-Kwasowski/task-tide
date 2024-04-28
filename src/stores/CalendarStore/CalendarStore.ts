import { defineStore } from "pinia";
import { ICalendarState } from "./model/ICalendarState";
import { ITodo } from "@/models/ITodo";
import { getTime, closestTo, format } from 'date-fns'
export const useCalendarStore = defineStore('CalendarStore', {
   state: (): ICalendarState => ({
      todos: [
         {
            title: 'Make a dinner',
            status: 'ongoing',
            date: '04/27/2024',
            creator: 'Dawid',
            description: 'Lorem ipsum dolor sit amet, consectetur adip'
         },
         {
            title: 'Fix the calendar',
            status: 'todo',
            date: '04/27/2024',
            creator: 'Dawid'
         },
         {
            title: 'Add new Features to Calendar',
            status: 'done',
            date: '04/27/2024',
            creator: 'Dawid'
         },
         {
            title: 'Find new calendars',
            status: 'done',
            date: '04/29/2024',
            creator: 'Dawid',
            description: 'In a quaint little village nestled among the hills, a secret awaits discovery by those who dare to seek it.'
         },
         {
            title: 'Pay a bills',
            status: 'done',
            date: '04/30/2024',
            creator: 'Dawid'
         },
      ],
   }),
   getters: {
      upcomingTasks(): ITodo[] {
         const today = new Date()
         const dates = this.todos.map(({date}):number => getTime(<Date>date))
         const closestDate = closestTo(today, dates)
         if(!closestDate) return []
         return this.todos.filter(({date}):boolean => date === format(closestDate, 'MM/dd/yyyy'))
      }
   },
   actions: {
      async addTask(task: ITodo) {
         this.todos.push(task);
      }
   }
})