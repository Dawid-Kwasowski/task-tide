import { useToastStore } from "@/stores/components/ToastStore/ToastStore";

export default async function handleDatabaseAction<T>(
  action: () => Promise<T>,
  successMessage?: string,
) {
  const toast = useToastStore();
  try {
    const response = await action();
    if (successMessage) {
      await toast.show({
        message: successMessage,
        color: "success",
      });

      return response;
    }
  } catch (error) {
    await toast.show({
      message: error?.message || error,
      color: "red",
    });
  }
}
