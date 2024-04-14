import { defineStore } from "pinia";
import { ICalendarState } from "./model/ICalendarState";
import { ITodo } from "@/models/ITodo";

export const useCalendarStore = defineStore('CalendarStore', {
   state: (): ICalendarState => ({
      todos: [
         {
            title: 'Make a dinner',
            status: 'ongoing',
            date: '04/10/2024',
            creator: 'Dawid',
            description: 'Lorem ipsum dolor sit amet, consectetur adip'
         },
         {
            title: 'Fix the calendar',
            status: 'todo',
            date: '04/10/2024',
            creator: 'Dawid'
         },
         {
            title: 'Add new Features to Calendar',
            status: 'done',
            date: '04/10/2024',
            creator: 'Dawid'
         },
         {
            title: 'Find new calendars',
            status: 'expired',
            date: '04/9/2024',
            creator: 'Dawid'
         },
         {
            title: 'Pay a bills',
            status: 'done',
            date: '04/13/2024',
            creator: 'Dawid'
         },
      ],
   }),
   actions: {
      async addTask(task: ITodo) {
         this.todos.push(task);
      }
   }
})