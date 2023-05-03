<script>
import CategoryService from '../services/category.service';
import CategoryForm from '../components/category/CategoryForm.vue';
export default {
    components: {
        CategoryForm
    },
    props: {
        id: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            category: null,
            message: ""
        }
    },
    methods: {
        async getCategory(id) {
            try {
                this.category = await CategoryService.get(id);
                console.log(this.category);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash
                });
            }
        },
        async updateCategory (data) {
            try {
                await CategoryService.update(this.category._id, data);
                this.message = "Danh mục được cập nhật thành công!";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created () {
        this.getCategory(this.id);
        this.message = "";
    }
}
</script>

<template >
    <div class="row">
        <div class="col-md-12">
            <div class="card m-2 border-0">
                <div class="card-body">
                    <h2>Sửa danh mục</h2>
                    <!-- {{ category }} -->
                    <CategoryForm v-if="category !== null" :category="category" @submit:category="updateCategory" />
                    <p class="text-primary font-weight-bold">{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>