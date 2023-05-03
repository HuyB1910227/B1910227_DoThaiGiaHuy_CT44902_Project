<template>
    <Form @submit="submitCategory" :validation-schema="categoryFormSchema">
        <div class="form-group m-1">
            <label for="name" class="mb-2">Tên danh mục</label>
            <Field type="text" name="name" class="form-control " v-model="categoryLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group m-1">
            <label for="imgCategory" class="mb-2">Hình ảnh</label>
           
            <Field type="file" name="imgCategory" class="form-control" v-model="categoryLocal.image" @change="previewImage" ref="imgCategory"/>
            <ErrorMessage name="imgCategory" class="error-feedback" />
        </div>
       
        <div class="form-group m-1">
            <button class="btn btn-primary">
                <i class="fa fa-save"></i> Lưu
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    emits: ["submit:category"],
    props: {
        category: {
            type: Object,
            required: true
        }
    },
    data() {
        const categoryFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải có ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều hơn 50 ký tự."),
        });
        return {
            categoryLocal: this.category,
            
            categoryFormSchema,
        }
    },
    methods: {
        submitCategory() {
            const formData = new FormData();
            formData.append("name", this.categoryLocal.name);
            formData.append("imgCategory", this.categoryLocal.image);
            this.$emit("submit:category", formData);
        },
        
        previewImage () {
            // const that = this
            // const file = this.categoryLocal.image.file
            // console.log(this.categoryLocal.image.file)
            // const fileReader = new FileReader()
            // fileReader.onload = function (event) {
            //     this.categoryLocal.image = {
            //         src: event.target.result,
            //         size: file.size
            //     }
            // }

            // fileReader.readAsDataURL(file)
            const self = this
            const file = this.$refs['imgCategory'].files;
            const fileReader = new FileReader();
            console.log(file);
            fileReader.onload = function (event) {
                console.log("yess");
                self.categoryLocal.image['0'] = {
                    src: event.target.result,
                    size: file[0].size
                };
            };
            console.log(file);
            if (file) {
                fileReader.readAsDataURL(file);
            }
        }
    }
}
</script>

<style scoped>
    @import "@/assets/form.css";
</style>
