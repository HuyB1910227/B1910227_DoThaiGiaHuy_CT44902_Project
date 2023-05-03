<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data() {
        const loginFormSchema = yup.object().shape({
            username: yup
                    .string()
                    .required("Chưa nhập tên đăng nhập.")
                    .min(2, "Tên đăng nhập phải có ít nhất 2 ký tự.")
                    .max(50, "Tên đăng nhập không được nhiều hơn 50 ký tự."),
            password: yup
                    .string()
                    .required("Chưa nhập mật khẩu.")
        });
        return {
            userLocal: {
                username: "",
                password: "",
            },
            loginFormSchema,
        }
    },

    methods: {
        submitLogin () {
            this.$emit("submit:login", this.userLocal);
        }
    }
}
</script>

<template>
    <Form @submit="submitLogin" :validation-schema="loginFormSchema">
        <div class="form-group">
            <label for="username" class="font-weight-bold mb-2">Tên đăng nhập <span class="text-danger">*</span></label>
            <Field type="text" name="username" class="form-control mb-2" v-model="userLocal.username"/>
            <ErrorMessage name="username" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="password" class="font-weight-bold mb-2">Mật khẩu <span class="text-danger">*</span></label>
            <Field type="password" name="password" class="form-control mb-2" v-model="userLocal.password"/>
            <ErrorMessage name="password" class="error-feedback"/>
        </div>
        <div class="form-group mt-3">
           <button class="btn btn-primary w-100">Đăng nhập</button>
        </div>
    </Form>
</template>