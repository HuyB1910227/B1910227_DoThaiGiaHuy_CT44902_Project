import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/stores/AuthStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/Cart.vue')
    },
    {
      path: '/product',
      children: [
          {
            path: "",
            component: () => import("../views/Home.vue"),
          },
          {
            path: ':id',
            name: 'product.detail',
            component: () => import('../views/ProductDetails.vue'),
            props: true
          }
      ]
    },
    {
      path: '/test',
      component: () => import('../views/Test.vue'),
    },
    {
      path: '/category/:id',
      name: 'category.allProduct',
      component: () => import('../views/Product.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/Orders.vue')
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/UserLogin.vue"),
    },
  ]
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isAuth && to.name !== 'login' && to.name !== 'register') {
    next('/login');
  } else {
    next();
  }
});

export default router
