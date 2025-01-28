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
    await handleDatabaseAction(async () => {
      const { error } = await supabase.auth.signUp(owner);

      if (error) throw error;
    }, "Signed up successfully");
  };

  const signIn = async (owner: IOwnerInfo) => {
    return await handleDatabaseAction<any>(async () => {
      const { error } = await supabase.auth.signInWithPassword(owner);

      if (error) throw "app.errors.invalidCredential";

      const { data } = await supabase.auth.getUser();

      return data?.user?.aud;
    }, "Signed in successfully");
  };

  const passwordReset = async (email: string) => {
    await handleDatabaseAction(async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/update-password",
      });

      if (error) throw "app.errors.smthGoesWrong";
    }, "resetPassword.notification.checkEmail");
  };

  const updatePassword = async (new_password: string) => {
    return await handleDatabaseAction(async () => {
      const { error } = await supabase.auth.updateUser({
        password: new_password,
      });

      if (error) throw "app.errors.smthGoesWrong";
    }, "updatePassword.notification.updated");
  };

  return {
    signUp,
    signIn,
    signOut,
    passwordReset,
    updatePassword,
  };
};
