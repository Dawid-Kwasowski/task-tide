// Composables
import { supabase } from "@/plugins/supabase";
import { createRouter, createWebHistory } from "vue-router";
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

router.beforeEach(async (to, from): Promise<{ name: string } | undefined> => {
  if (from.name !== "Auth") {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (to.name !== "Auth" && user?.aud !== "authenticated") {
      return { name: "Auth" };
    }
  }
});

export default router;
