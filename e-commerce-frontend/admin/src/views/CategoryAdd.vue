<script>
import CategoryService from '../services/category.service';
import CategoryForm from '../components/category/CategoryForm.vue';
export default {
    components: {
        CategoryForm
    },
    data() {
        return {
            category: {
                name: "",
                imgCategory: ""
            },
            message: ""
        }
    },
    methods: {
        async createCategory(data) {

            //set header here
            // console.log(data);

            try {
                // const config = {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //         Accept: "application/json"
                //     }
                // }
                await CategoryService.create(data);
                this.message = "Đã tạo 1 danh mục mới!";
            }
            catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<template >
    <div class="row">
        <div class="col-md-12">
            <div class="card m-2 border-0">
                <div class="card-body">
                    <h2>Thêm danh mục</h2>
                    <CategoryForm :category="category" @submit:category="createCategory" />
                    <p class="text-primary font-weight-bold">{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>