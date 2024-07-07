import { defineStore } from "pinia";
import { ICalendarState } from "./model/ICalendarState";
import { ITodo } from "@/models/ITodo";
import { getTime, closestTo, format } from "date-fns";
import { supabase } from "@/plugins/supabase";
export const useCalendarStore = defineStore("CalendarStore", {
  state: (): ICalendarState => ({
    todos: [],
  }),
  getters: {
    upcomingTasks(): ITodo[] {
      const today = new Date();
      const dates = this.todos.map(({ deadline }): number =>
        getTime(<Date>deadline),
      );
      const closestDate = closestTo(today, dates);
      if (!closestDate) return [];
      return this.todos.filter(
        ({ deadline }): boolean =>
          deadline === format(closestDate, "MM-dd-yyyy"),
      );
    },
  },
  actions: {
    addTask: async function (task: ITodo) {
      try {
        const { error } = await supabase.from("tasks").insert([task]);

        if (error) throw error;
      } catch (error) {
        console.error(error);
      }
    },

    editTask: async function (task: {
      id: string;
      title: string;
      description: string;
    }) {
      try {
        const { error } = await supabase
          .from("tasks")
          .update({ title: task.title, description: task.description })
          .eq("id", task.id);

        if (error) throw error;
      } catch (err) {
        console.error(err);
      }
    },

    removeTask: async function (id: string): Promise<void> {
      try {
        const { error } = await supabase.from("tasks").delete().eq("id", id);

        if (error) {
          throw new Error(`Error removing task: ${error.message}`);
        }
      } catch (e) {
        console.error("Error during task removal:", e);
      }
    },
    getTask: async function () {
      try {
        const { data: tasks, error } = await supabase.from("tasks").select("*");

        if (error) throw error;
        console.log("tasks", tasks);
        this.todos = tasks;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
