import handleDatabaseAction from "@/utils/handleDatabaseAction";
import { supabase } from "@/plugins/supabase";
import { IOwnerInfo } from "@/stores/UserStore/models/UserInfo";

export const useAuthUser = () => {
  const signOut = async () => {
    await handleDatabaseAction(async () => {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;
    }, "Signed out successfully");
  };

  const signUp = async (owner: IOwnerInfo) => {
    return await handleDatabaseAction(async () => {
      const { error } = await supabase.auth.signUp(owner);
      if (error) throw "app.errors.conflict";
      return error;
    });
  };

  const signIn = async (owner: IOwnerInfo) => {
    return await handleDatabaseAction<any>(async () => {
      const { data: userExist, error: existenceError } = await supabase.rpc(
        "user_exists",
        {
          user_email: owner.email,
        },
      );

      if (!userExist || existenceError) throw "app.errors.invalidCredential";

      const { error } = await supabase.auth.signInWithPassword(owner);

      if (error) throw "app.errors.invalidCredential";

      const { data } = await supabase.auth.getUser();

      return data?.user?.aud;
    }, "Signed in successfully");
  };

  const passwordReset = async (email: string) => {
    await handleDatabaseAction(async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL,
      });

      if (error) throw "app.errors.smthGoesWrong";
    }, "resetPassword.notification.checkEmail");
  };

  const updateUser = async (attr: any, msg?: string) => {
    return await handleDatabaseAction(
      async () => {
        const { error } = await supabase.auth.updateUser(attr);
        console.log(error);
        if (error) throw "app.errors.smthGoesWrong";
      },
      msg ? msg : "updatePassword.notification.updated",
    );
  };

  const getUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
  };

  const deleteUser = async () => {
    await handleDatabaseAction(async () => {
      const id = JSON.parse(localStorage.getItem("auth_key") || "").user?.id;

      const { data, error } = await supabase
        .from("users")
        .update({ deleted_at: new Date() })
        .eq("id", id);
    });
  };

  return {
    signUp,
    signIn,
    signOut,
    passwordReset,
    updateUser,
    getUser,
    deleteUser,
  };
};
