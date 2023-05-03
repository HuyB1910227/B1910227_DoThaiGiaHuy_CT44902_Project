<template>
    <div class="vertical-nav bg-white" id="sidebar" style="overflow-y: auto" v-if="isAuth">
        <div class="dropdown">
            <button class="btn  float-end mt-1 me-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-cog"></i>
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Đổi mật khẩu</a></li>
            </ul>
        </div>
        <div class="py-4 px-3 mb-4 bg-title">
            <div class="d-flex align-items-center">
                <img src="https://www.lansweeper.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN.png" alt="..." style="width: 80px; height: 80px;" class="me-3 rounded-circle shadow border">
                <div class="media-body">
                    
                    <p class="font-weight-normal text-muted mb-0">Xin chào</p>
                    <h4 class="m-0">Quản trị viên</h4>
                </div>
            </div>
        </div>
        <p class="text-gray font-weight-bold text-uppercase px-3 small pb-1 mb-0">Dashboard</p>
        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path === '/' }">
                <router-link to="/" class="nav-link">
                    <i class="fas fa-chart-area me-3 "></i>Thống kê
                </router-link>
            </li>
        </ul>
        <p class="text-gray font-weight-bold text-uppercase px-3 small pb-1 mb-0">Quản lý sản phẩm</p>
        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/categories/) }">
                <router-link to="/categories" class="nav-link" >
                    <i class="fa-solid fa-list me-3 "></i>Danh mục sản phẩm
                </router-link>
            </li>
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/products/) }">
                <router-link to="/products" class="nav-link">
                    <i class="fa-solid fa-box me-3 "></i>Quản lý sản phẩm
                </router-link>
            </li>
        </ul>
        <p class="text-gray font-weight-bold text-uppercase px-3 small pb-1 mb-0">Quản lý đơn hàng</p>
        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/orders/) }">
                <router-link to="/orders" class="nav-link">
                    <i class="fa-solid fa-file-lines me-3 "></i>
                    Quản lý đặt hàng
                </router-link >
            </li>
        </ul>
        <p class="text-gray font-weight-bold text-uppercase px-3 small pb-1 mb-0">Quản lý khách hàng</p>
        <ul class="nav flex-column bg-white mb-0">
            <li class="nav-item " :class="{ 'active': $route.path.match(/^\/customers/) }">
                <router-link to="/customers" class="nav-link">
                    <i class="fa-solid fa-user me-3 "></i>
                    Thông tin khách hàng
                </router-link >
                
            </li>
        </ul>
    </div>
    <span v-else></span>
</template>
 <script>
  import { mapState } from "pinia";
  import { useAdminAuthStore } from "../../stores/AdminAuthStore";
  export default {
    computed: {
          ...mapState(useAdminAuthStore, {
              isAuth: 'isAuth',
          }),
      }
  }
  </script>