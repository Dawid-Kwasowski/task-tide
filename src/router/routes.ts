export default [
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
    path: "/account",
    name: "Account",
    component: () => import("@/views/AccountView/AccountView.vue"),
  },
  {
    path: "/reset-password/:email?",
    name: "ResetPassword",
    component: () => import("@/views/ResetPasswordView/ResetPasswordView.vue"),
  },
  {
    path: "/update-password",
    name: "UpdatePassword",
    component: () =>
      import("@/views/UpdatePasswordView/UpdatePasswordView.vue"),
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
