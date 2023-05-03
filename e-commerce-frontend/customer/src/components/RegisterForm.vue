<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    emits: ["submit:register"],
    data() {
        const registerFormSchema = yup.object().shape({
            fullname: yup
                .string()
                .required("Chưa nhập tên họ tên.")
                .min(5, "Họ tên phải có ít nhất 5 ký tự.")
                .max(50, "Họ tên không được nhiều hơn 50 ký tự."),
            username: yup
                .string()
                .required("Chưa nhập tên đăng nhập.")
                .min(8, "Tên đăng nhập phải có ít nhất 8 ký tự.")
                .max(50, "Tên đăng nhập không được nhiều hơn 50 ký tự."),
            email: yup
                .string()
                .required("Chưa nhập địa chỉ email.")
                .email("E-mail không đúng.")
                .max(50, "email chỉ chứa tối đa 50 ký tự."),
            address: yup
                .string()
                .required("Chưa nhập địa chỉ")
                .max(255, "Địa chỉ chỉ chứa tối đa 255 ký tự."),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ."
                ),
            password: yup
                .string()
                .min(8, "Mật khẩu phải có ít nhất 8 ký tự.")
                .required("Chưa nhập mật khẩu."),
                
            password_confirm: yup
                .string()
                .required("Chưa nhập lại mật khẩu.")
                .test("_match", 'Mật khẩu và nhập lại mật khẩu không trùng khớp.', function(value){
                    return this.parent.password === value
                }),
        });
        return {
            userLocal: {
                fullname: "",
                email: "",
                phone: "",
                address: "",
                username: "",
                password: "",
                roles: ["customer"]
            },
            registerFormSchema,
        }
    },
    methods: {
        submitRegister () {
            this.$emit("submit:register", this.userLocal);
        }
    }
}
</script>
<template>
    <Form @submit="submitRegister" :validation-schema="registerFormSchema">
        <div class="form-group">
            <label for="fullname" class="font-weight-bold">
                Họ tên <span class="text-danger">*</span>
            </label>
            <Field type="text" name="fullname" class="form-control" v-model="userLocal.fullname"/>
            <ErrorMessage name="fullname" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="username" class="font-weight-bold">
                Tên đăng nhập <span class="text-danger">*</span>
            </label>
            <Field type="text" name="username" class="form-control" v-model="userLocal.username"/>
            <ErrorMessage name="username" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="email" class="font-weight-bold">
                Email <span class="text-danger">*</span>
            </label>
            <Field type="text" name="email" class="form-control" v-model="userLocal.email"/>
            <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="phone" class="font-weight-bold">
                Sô điện thoại <span class="text-danger">*</span>
            </label>
            <Field type="text" name="phone" class="form-control" v-model="userLocal.phone"/>
            <ErrorMessage name="phone" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="address" class="font-weight-bold">
                Địa chỉ <span class="text-danger">*</span>
            </label>
            <Field type="text" name="address" class="form-control" v-model="userLocal.address"/>
            <ErrorMessage name="address" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="password" class="font-weight-bold">
                Mật khẩu <span class="text-danger">*</span>
            </label>
            <Field type="password" name="password" class="form-control" v-model="userLocal.password"/>
            <ErrorMessage name="password" class="error-feedback"/>
        </div>
        <div class="form-group">
            <label for="password_confirm" class="font-weight-bold">
                Nhập lại mật khẩu <span class="text-danger">*</span>
            </label>
            <Field type="password" name="password_confirm" class="form-control" />
            <ErrorMessage name="password_confirm" class="error-feedback"/>
        </div>
        <hr>
        <div class="form-group">
           <button class="btn btn-primary w-100">Đăng ký</button>
        </div>
    </Form>
</template>

<style scoped>
    @import "@/assets/form.css";
</style>

