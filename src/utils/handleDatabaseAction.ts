import { useToastStore } from "@/stores/components/ToastStore/ToastStore";

export default async function handleDatabaseAction(
  action: () => Promise<void>,
  successMessage: string,
) {
  const toast = useToastStore();
  try {
    await action();
    await toast.show({
      message: successMessage,
      color: "success",
    });
  } catch (error) {
    await toast.show({
      message: error?.message,
      color: "red",
    });
  }
}
