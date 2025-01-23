import { supabase } from "@/plugins/supabase";
import { createRouter, createWebHistory } from "vue-router";
import { IUserInfo } from "@/stores/UserStore/models/UserInfo";
const routes = [
  {
    path: "",
    redirect: "/dashboard",
  },
  {
    path: "/dashboard",
    redirect: "/duty-dashboard",
    children: [
      {
        path: "",
        redirect: "/dashboard/general",
      },
      {
        path: "general",
        name: "general",
        component: () =>
          import("@/views/HomeView/views/DashboardView/DashboardView.vue"),
      },
      {
        path: "duties",
        name: "duties",
        component: () =>
          import("@/views/HomeView/views/DutiesView/DutiesView.vue"),
      },
    ],
    component: () =>
      import(/* webpackChunkName: "home" */ "@/views/HomeView/Home.vue"),
  },
  {
    path: "/recovery-password",
    name: "RecoveryPassword",
    component: () => import("@/views/RecoveryPasswordView/RecoveryPasswordView.vue")
  },
  {
    path: "/auth",
    name: "Auth",
    component: () =>
      import(/* webpackChunkName: "auth" */ "@/views/AuthView/AuthView.vue"),
  },
  {
    path: "/browse",
    name: "Browse",
    component: () =>
      import(
        /* webpackChunkName: "browse" */ "@/views/LoginView/LoginView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  try {
    // Redirect unauthenticated users to Auth
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (to.name !== "Auth" && user?.aud !== "authenticated") {
      return { name: "Auth" };
    }

    const userInfo = localStorage.getItem("pinia/user/user-info");
    const parsedUserInfo: IUserInfo | null = userInfo
      ? JSON.parse(userInfo)
      : null;

    if (
      !["Browse", "Auth"].includes(to.name as string) &&
      !["Browse", "Auth"].includes(from.name as string) &&
      !parsedUserInfo?.user_id
    ) {
      return { name: "Browse" };
    }
  } catch (error) {
    console.error("Router guard error:", error);
  }
});

export default router;
