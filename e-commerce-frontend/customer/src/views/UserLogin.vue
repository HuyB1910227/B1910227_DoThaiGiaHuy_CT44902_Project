<script>
import LoginForm from '../components/LoginForm.vue';
import { useAuthStore } from '../stores/AuthStore';
import UserService from '../services/user.service';
import Cookies from "js-cookie";
export default {
    components: {
        LoginForm
    },
    data() {
        const authStore = useAuthStore();
        return {
            authStore,
            message: ''
        }
    },
    methods: {
        async login(data) {
            const authStore = useAuthStore();
            try {
                var result = await UserService.login(data);
                if (result.status == "success") {
                    const token = result.token;
                    Cookies.set('token', token);
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
    <div class="page m-auto" style="width: 500px;">
        <div class="card ">
            <div class="card-header bg-white">
               <h3 class="text-center text-shadow">Đăng Nhập</h3> 
            </div>
            <div class="card-body">
                <LoginForm @submit:login="login"/>
                {{ message }}
                <hr>
                <div class="form-group">
                    <router-link :to="{name: 'register'}">
                        <button class="btn btn-white w-100 btn-outline-primary">
                            Đăng ký thành viên
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
