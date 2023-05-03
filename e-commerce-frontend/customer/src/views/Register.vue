<script>
import RegisterForm from '../components/RegisterForm.vue';
import UserService from '@/services/user.service.js';
export default {
    components: {
        RegisterForm
    },
    data() {
        return {
            message: ""
        }
    },
    methods: {
        async createUser(data) {
            try {
                var result = await UserService.register(data);
                if (result.status == 'fail') {
                    this.message = result.message;
                } else {
                    alert("Đăng ký tài khoản thành công! Vui lòng đăng nhập vào tài khoản.");
                    this.$router.push("/login");
                }
            } catch (error) {
                this.message = "Đăng ký thất bại! Quý khách vui lòng thử lại."
                console.log(error);
            }
        }
    },
}
</script>
<template>
    <div class="page m-auto" style="width: 500px;">
        <div class="card">
            <div class="card-header bg-white">
                <h3 class="text-center text-shadow">Đăng Ký</h3>
            </div>
            <div class="card-body">
                <RegisterForm @submit:register="createUser" />
                {{ message }}
            </div>
        </div>
    </div>
</template>
