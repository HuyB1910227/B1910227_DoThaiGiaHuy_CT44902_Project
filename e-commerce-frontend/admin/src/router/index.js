import { createRouter, createWebHistory } from 'vue-router'

import { useAdminAuthStore } from '../stores/AdminAuthStore';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Dashborad.vue'),
    },
    {
      path: '/products',
      component: () => import("../views/AllProducts.vue"),
      children: [
        {
          path: "add",
          name: "product.add",
          component: () => import("@/views/ContactAdd.vue"),
        },
      ]
    },
    {
      path: '/categories',
      children: [
        {
          path: "",
          component: () => import("../views/Category.vue"),
        },
        {
          path: "add",
          name: "category.add",
          component: () => import('../views/CategoryAdd.vue'),
        },
        {
          path: ":id",
          name: "category.edit",
          component: () => import('../views/CategoryEdit.vue'),
          props: true
        }
      ]
    },
    {
      path: '/products',
      children: [
        {
          path: "",
          component: () => import("../views/AllProducts.vue"),
        },
        {
          path: "add",
          name: "product.add",
          component: () => import('../views/ProductAdd.vue'),
        },
        {
          path: ":id",
          name: "product.edit",
          component: () => import('../views/ProductEdit.vue'),
          props: true
        }
      ]
    },
    {
      path: '/orders',
      children: [
        {
          path: "",
          component: () => import("../views/Order.vue"),
        },
      ]
    },
    {
      path: '/customers',
      children: [
        {
          path: "",
          component: () => import("../views/Customer.vue"),
        },
      ]
    },
    {
      path: "/admin/login",
      name: "admin.login",
      component: () => import("@/views/AdminLogin.vue"),
    },
  ]
});

router.beforeEach((to, _from, next) => {
  const authStore = useAdminAuthStore();
  if (!authStore.isAuth && to.name !== 'admin.login') {
    next('/admin/login');
  } else {
    next();
  }
});

export default router
