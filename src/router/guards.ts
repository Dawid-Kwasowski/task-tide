import { RouteLocationNormalizedGeneric, Router } from "vue-router";
import { supabase } from "@/plugins/supabase";
import { IUserInfo } from "@/stores/UserStore/models/UserInfo";

export const guards = (router: Router) => {
  const publicRoutes = ["Auth", "ResetPassword"];
  const profileRoutesExceptions = [
    "Browse",
    "UpdatePassword",
    "Account",
    ...publicRoutes,
  ];
  const authGuard = async (to: RouteLocationNormalizedGeneric) => {
    // Redirect unauthenticated users to Auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (
      !publicRoutes.includes(to.name as string) &&
      user?.aud !== "authenticated"
    ) {
      return { name: "Auth" };
    }
    return true;
  };

  const profileGuard = async (to: RouteLocationNormalizedGeneric) => {
    const userInfo = localStorage.getItem("pinia/user/user-info");
    const parsedUserInfo: IUserInfo | null = userInfo
      ? JSON.parse(userInfo)
      : null;

    if (
      !profileRoutesExceptions.includes(to.name as string) &&
      !parsedUserInfo?.user_id
    ) {
      return { name: "Browse" };
    }
    return true;
  };

  router.beforeEach(async (to, from) => {
    try {
      const authResult = await authGuard(to);
      if (authResult !== true) return authResult;

      const profileResult = await profileGuard(to);
      if (profileResult !== true) return profileResult;

      return true;
    } catch (error) {
      console.error("Router guard error:", error);
      return false; // Cancel navigation on error
    }
  });
};
