export interface ITodo {
  created_at?: string;
  creator_id?: string;
  deadline?: Date | string;
  description?: string;
  status?: TStatus;
  title?: string;
  id?: string;
}

export type TStatus = "ongoing" | "done" | "expired" | "todo";
