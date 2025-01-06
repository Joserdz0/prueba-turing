import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useSessionStore } from "../stores/session";

const requireAuth = async (to, from, next) => {
  const userCurrent = localStorage.getItem("id");
  const SessionStore = useSessionStore();
  SessionStore.id_user = userCurrent;
  SessionStore.isLoggedIn = userCurrent ? true : false;

  if (userCurrent) {
    next();
  } else {
    next("/");
  }
};
const requireNotAuth = async (to, from, next) => {
  const userCurrent = localStorage.getItem("id");
  const SessionStore = useSessionStore();
  SessionStore.id_user = userCurrent;
  SessionStore.isLoggedIn = userCurrent ? true : false;
  if (userCurrent) {
    next("/");
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/RegisterView.vue"),
      beforeEnter: requireNotAuth,
    },
    {
      path: "/login",
      component: () => import("../views/LoginView.vue"),
      beforeEnter: requireNotAuth,
    },

    {
      path: "/my-pets",
      component: () => import("../views/MyPetsView.vue"),
      beforeEnter: requireAuth,
    },
    {
      path: "/:pathMatch(.*)*", // Comodín para cualquier ruta no definida
      redirect: "/", // Redirige a la página de inicio
    },
  ],
});

export default router;
