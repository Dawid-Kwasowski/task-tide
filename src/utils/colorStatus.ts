import { TStatus } from "@/models/ITodo";

export const mapStatus = (taskStatus: TStatus): string => {
  const statusMap = {
    ongoing: "red",
    todo: "blue",
    done: "green",
    expired: "yellow",
  };

  return statusMap[taskStatus];
};
