<template>
    <Form @submit="submitProduct" :validation-schema="productFormSchema">
        <div class="form-group m-1">
            <label for="name" class="mb-2">Tên sản phẩm</label>
            <Field type="text" name="name" class="form-control " v-model="productLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group m-1">
            <label for="description" class="mb-2">Mô tả sản phẩm</label>
            <Field type="text" name="description" class="form-control " v-model="productLocal.description" />
            <ErrorMessage name="description" class="error-feedback" />
        </div>
        <div class="form-group m-1">
            <label for="price" class="mb-2">Giá:</label>
            <Field type="number" name="price" class="form-control " v-model="productLocal.price" />
            <ErrorMessage name="price" class="error-feedback" />
        </div>
        <div class="form-group m-1">
            <label for="itemsInStock" class="mb-2">Số lượng</label>
            <Field type="number" name="itemsInStock" class="form-control " v-model="productLocal.itemsInStock" />
            <ErrorMessage name="itemsInStock" class="error-feedback" />
        </div>
        <div class="form-group m-1">
            <label for="category" class="m-1">Phân loại</label>
            <Field v-slot="{ value }" name="category" as="select" class="form-select" v-model="productLocal.categoryId">
                <option value="" disabled>--Chọn--</option>
                <option v-for="category in categories" :key="category" :value="category._id"
                    :selected="value && value.includes(category)">{{ category.name }}</option>
            </Field>
            <ErrorMessage name="category" class="error-feedback" />
        </div>
        <div class="form-group m-1">
            <label for="image" class="mb-2">Hình ảnh</label>
            <Field type="file" name="image" class="form-control" v-model="productLocal.image" />
            <ErrorMessage name="image" class="error-feedback" />
        </div>
        <!-- <div>
            <img :src="productLocal.image" style="width: 100%;" />
        </div> -->
        <label for="subDescription m-1">Thông tin chi tiết</label>
        <br>
        <div class="row m-1" v-for="(subDescription, index) in subDescription">
            
            <div class="col-5">
                <div class="input-group mb-1">
                    <span class="input-group-text">Tiêu đề</span>
                    <input type="text"  class="form-control" required v-model="subDescription.key" />
                    
                    
                </div>
                <div v-if="!isValid(subDescription.key)" class="error-feedback">Chưa nhập tiêu đề.</div>
            </div>
            <div class="col-5">
                <div class="input-group mb-1">
                    <span class="input-group-text">Giá trị</span>
                    <input type="text" class="form-control" required v-model="subDescription.value"/>
                    
                </div>
                <div v-if="!isValid(subDescription.value)" class="error-feedback">Chưa nhập giá trị.</div>
            </div>
            <div class="col-1">
                <div class="input-group mb-3">
                    <button class="btn btn-danger" @click="removeSub(index)"><i class="fa-solid fa-x"></i></button>
                </div>
            </div>
        </div>
        <button type="button" v-on:click="addSub" class="btn btn-outline-primary m-1">Thêm chi tiết</button>

        <div class="form-group m-1">
            <button class="btn btn-primary" :disabled="hasEmptySubDescriptions">
                <i class="fa fa-save"></i> Lưu 
            </button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from 'vee-validate';
import CategoryService from "../../services/category.service";
export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    emits: ["submit:product"],
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        const productFormSchema = yup.object().shape({
            name: yup
                .string()
                .required("Tên sản phẩm phải có giá trị.")
                .min(2, "Tên sản phẩm phải có ít nhất 10 ký tự.")
                .max(50, "Tên không nhiều hơn 50 ký tự."),
            description: yup
                .string()
                .required("Tên sản phẩm phải có giá trị."),
            price: yup
                .number()
                .required("Chưa nhập giá sản phẩm."),
            itemsInStock: yup
                .number()
                .required("Chưa nhập số lượng sản phẩm."),
            category: yup
                .string()
                .required("Chưa chọn loại sản phẩm.")
        });
        return {
            productLocal: this.product,
            productFormSchema,
            categories: [],
            subDescription: (this.product && this.product.subDescription) ? this.product.subDescription : [],
            errorSub: false
        }
    },
    watch: {
        subDescription: {
            deep: true,
            handler() {
                this.hasEmptySubDescriptions;
                // this.errorSub = this.hasEmptySubDescriptions;
                // console.log(this.errorSub)
            },
        },
    },
    computed: {
        hasEmptySubDescriptions() {
            if(Array.isArray(this.subDescription) && this.subDescription.length > 0) {
                const check = this.subDescription.some((sub) => sub.key === '' || sub.value === '');
                console.log(check);
                return check;
            }
            return false;
        }
    },
    methods: {
        submitProduct() {
            const formData = new FormData();
            formData.append("name", this.productLocal.name);
            formData.append("description", this.productLocal.description);
            formData.append("price", this.productLocal.price);
            formData.append("itemsInStock", this.productLocal.itemsInStock);
            formData.append("categoryId", this.productLocal.categoryId);
            formData.append("image", this.productLocal.image);
            formData.append("subDescription",JSON.stringify(this.subDescription) );
            console.log(formData);
            console.log(this.subDescription)
            // formData.append("imgCategory", this.categoryLocal.image);
            this.$emit("submit:product", formData);
        },
        async retriveCategory() {
            try {
                this.categories = await CategoryService.getAll();
                console.log(this.categories)
            } catch (error) {
                console.log(error);
            }
        },

        addSub () {
            this.subDescription.push({
                key: '',
                value: ''
            })
        },
        removeSub(index) {
            this.subDescription.splice(index, 1)
        },
        isValid(value) {
            // if (this.subDescription.length > 0)
            //     return value !== null && value.trim() !== '';
            if (typeof value === 'string') {
                return value.trim() !== '';
            } else {
                return false;
            }
        },
        // hasEmptyArraySubDescription () {
        //     if (this.product.subDescription && this.product.subDescription.length > 0) {
        //         this.subDescription = [];
        //     }
        // },
        // getCategoryList() {
        //     this.retriveCategory();

        // },
        previewImage() {
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
            // const self = this
            // const file = this.$refs['imgCategory'].files;
            // const fileReader = new FileReader();
            // console.log(file);
            // fileReader.onload = function (event) {
            //     console.log("yess");
            //     self.categoryLocal.image['0'] = {
            //         src: event.target.result,
            //         size: file[0].size
            //     };
            // };
            // console.log(file);
            // if (file) {
            //     fileReader.readAsDataURL(file);
            // }
        }
    },
    mounted() {
        this.retriveCategory();
        // this.hasEmptyArraySubDescription();
    }
}
</script>
<style scoped>
    @import "@/assets/form.css";
</style>
