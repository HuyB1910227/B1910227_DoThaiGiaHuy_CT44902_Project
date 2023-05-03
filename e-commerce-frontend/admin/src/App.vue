<script>
import AppSideBar from './components/layouts/AppSideBar.vue';
import AppHeader from './components/layouts/AppHeader.vue';
import AppFooter from './components/layouts/AppFooter.vue';
import Cookies from "js-cookie";
import { mapActions } from 'pinia';
import { useAdminAuthStore } from './stores/AdminAuthStore';
export default {
  components: {
    AppHeader,
    AppFooter,
    AppSideBar
  },
  data() {
    const authStore = useAdminAuthStore();
    return {
      authStore,
    }
  },
  computed: {
    pageContentClass() {
      return {
        'page-content': this.authStore.isAuth,
      }
    },
  },
  methods: {
    tryLogin() {
      const tokenFromCookies = Cookies.get("adminToken");
      if (tokenFromCookies) {
        this.authStore.token = tokenFromCookies;
        this.authStore.isAuth = true;
        console.log(this.authStore.isAuth);
      } else {
        this.authStore.token = "";
        this.authStore.isAuth = false;
      }
      
    },
  },
  created () {
    this.tryLogin();

  }
}
</script>

<template>
  <AppSideBar/>
  <div :class="pageContentClass" id="content">
    <AppHeader/>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style >

</style>
