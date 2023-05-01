import AboutVue from "@/components/About/About.vue";
import EventDetailsVue from "@/components/EventDetails/EventDetails.vue";
import FavoriteVue from "@/components/Favorite/Favorite.vue";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SignInView from "../views/SignInView.vue";
import SignUpView from "../views/SignUpView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/eventDetails",
    name: "EventDetailsVue",
    component: EventDetailsVue,
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("../views/CalendarView.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import("../views/UsersListView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("../views/AddEventView.vue"),
  },
  {
    path: "/modif",
    name: "modif",
    component: () => import("../views/ModifView.vue"),
  },
  {
    path: "/signin",
    name: "signin",
    component: SignInView,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutVue,
  },
  {
    path: "/favorite",
    name: "favorite",
    component: FavoriteVue,
  },

  {
    path: "/add",
    name: "add",
    component: () => import("../views/AddEventView.vue"),
  },
  {
    path: "/modif",
    name: "modif",
    component: () => import("../components/Admin/ModifEvent.vue"),
  },
  {
    path: "/resetPassword",
    name: "resetPass",
    component: () => import("../components/ResetPassword/ResetPassword.vue"),
  },
  {
    path: "/changePassword",
    name: "changePass",
    component: () => import("../components/ResetPassword/ChangePassword.vue"),
  },
  {
    path: "/verifEmail/:email/:token",
    name: "verifEmail",
    component: () => import("../components/Sign up/VerifEmail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
