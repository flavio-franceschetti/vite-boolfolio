import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Projects from "../pages/Projects.vue";
import About from "../pages/About.vue";
import Error404 from "../pages/Error404.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //linkExactActiveClass permette di definire una classe CSS personalizzata che verrà applicata solo ai link che corrispondono esattamente alla route attiva.
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/progetti",
      name: "projects",
      component: Projects,
    },
    {
      path: "/about-me",
      name: "about-me",
      component: About,
    },
    {
      // Questa "catch-all", per gestire errori 404, quando l'utente cerca di accedere a una route che non esiste
      // :error404(.*)* utilizza una regex per indicare che qualsiasi percorso che non corrisponde a una route predefinita sarà catturato.
      path: "/:error404(.*)*",
      name: "error404",
      component: Error404,
    },
  ],
});

export default router;
