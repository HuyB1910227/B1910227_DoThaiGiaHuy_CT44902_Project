<script>
import LoginForm from '../components/LoginForm.vue';
import { useAdminAuthStore } from '../stores/AdminAuthStore';
import AdminService from '../services/admin.service';
import Cookies from "js-cookie";
export default {
    components: {
        LoginForm
    },
    data() {
        const authStore = useAdminAuthStore();
        return {
            authStore,
            message: ''
        }
    },
    methods: {
        async login(data) {
            const authStore = useAdminAuthStore();
            try {
                var result = await AdminService.login(data);
                if (result.status == "success") {
                    const token = result.token;
                    Cookies.set('adminToken', token);
                    this.authStore.token = token;
                    this.authStore.isAuth = true;
                    this.message = "";
                    this.$router.push("/");
                }
                else this.message = "Đăng nhập thất bại!";
            } catch (error) {
                console.log(error);
                this.message = "Đăng nhập thất bại!";
            }
        },
    }
}
</script>
<template>
    <div class="page m-auto" style="width: 500px">
        <div class="card mt-4" >
            <div class="card-header bg-white">
               <h3 class="text-center text-shadow">Đăng Nhập</h3> 
            </div>
            <div class="card-body">
                <LoginForm @submit:login="login"/>
                {{ message }}
                <hr>
            </div>
        </div>
    </div>
</template>