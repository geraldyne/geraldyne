import { createRouter, createWebHistory } from "vue-router";
import PortfolioView from "@/views/PortfolioView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "portfolio",
      component: PortfolioView,
      meta: {
        title: "Geraldyne's Portfolio - Frontend Developer",
      },
    },
  ],
});

// Actualizar el título de la página dinámicamente
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
