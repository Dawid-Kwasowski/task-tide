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
      console.log("response", response);
      return response;
    }
  } catch (error: any) {
    await toast.show({
      message: error?.message || error,
      color: "red",
    });
    return error;
  }
}
