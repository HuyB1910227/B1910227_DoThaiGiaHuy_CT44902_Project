<template>
  
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="isAuth">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" @click="toggleSidebar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <button id="sidebarCollapse" type="button" class="btn btn-light" @click="toggleSidebar"><i class="fa fa-bars m-2"></i></button>
        <a class="navbar-brand" href="#">Angelo Online Shop</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          
            <li class="nav-item">
              <button class="btn btn-outline-primary m-1" href="" @click="logout"><i class="fas fa-right-from-bracket"></i> Đăng xuất</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <nav v-else></nav>
  </template>
  <script>
  import { mapActions, mapState } from "pinia";
  import { useAdminAuthStore } from "../../stores/AdminAuthStore";
  export default {
    methods: {
      toggleSidebar() {
        const sidebar = document.querySelector('#sidebar');
        const content = document.querySelector('#content');
        sidebar.classList.toggle('active');
        content.classList.toggle('active');
      },
        ...mapActions(useAdminAuthStore, {
            logout: "logout"
        })
      
    },
    computed: {
          ...mapState(useAdminAuthStore, {
              isAuth: 'isAuth',
          }),
      }
  }
  </script>