import { defineStore } from "pinia";
import { ITaskStore } from "./model/ITaskStore";
import { ITodo } from "@/models/ITodo";
import { getTime, closestTo, format } from "date-fns";
import { supabase } from "@/plugins/supabase";
import { useToastStore } from "@/stores/components/ToastStore/ToastStore";
import handleDatabaseAction from "@/utils/handleDatabaseAction";
export const useTaskStore = defineStore("TaskStore", {
  state: (): ITaskStore => ({
    todos: [],
  }),

  getters: {
    upcomingTasks(): ITodo[] {
      const today = new Date();
      const deadlines = this.todos.map(({ deadline }) =>
        getTime(<Date>deadline),
      );
      const closestDate = closestTo(today, deadlines);

      if (!closestDate) return [];

      return this.todos.filter(
        ({ deadline }) =>
          format(<Date>deadline, "MM-dd-yyyy") ===
          format(closestDate, "MM-dd-yyyy"),
      );
    },
  },

  actions: {
    async addTask(task: ITodo) {
      await handleDatabaseAction(async () => {
        const { error } = await supabase.from("tasks").insert([task]);
        if (error) throw error;
      }, "home.task.notification.created");
    },

    async editTask(task: { id: string; title: string; description: string }) {
      await handleDatabaseAction(async () => {
        const { error } = await supabase
          .from("tasks")
          .update({ title: task.title, description: task.description })
          .eq("id", task.id);

        if (error) throw error;
      }, "home.task.notification.edited");
    },

    async removeTask(id: string) {
      await handleDatabaseAction(async () => {
        const { error } = await supabase.from("tasks").delete().eq("id", id);
        if (error) throw error;
      }, "home.task.notification.deleted");
    },

    async getTask() {
      const toast = useToastStore();
      try {
        const { data: tasks, error } = await supabase.from("tasks").select("*");

        if (error) throw error;
        this.todos = tasks;
      } catch (error) {
        await toast.show({
          message: error.message,
          color: "red",
        });
      }
    },
  },
});
