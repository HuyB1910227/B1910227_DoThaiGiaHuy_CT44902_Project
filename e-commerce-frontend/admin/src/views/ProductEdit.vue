<script>
import ProductService from '../services/product.service';
import ProductForm from '../components/product/ProductForm.vue';
export default {
    components: {
        ProductForm
    },
    props: {
        id: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            product: null,
            message: ""
        }
    },
    methods: {
        async getProduct(id) {
            try {
                this.product = await ProductService.get(id);
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
        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
                this.message = "Sản phẩm đã được cập nhật thành công!";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created () {
        this.getProduct(this.id);
        this.message = ""
    }
}
</script>

<template >
    <div class="row">
        <div class="col-md-12">
            <div class="card m-2 border-0">
                <div class="card-body">
                    <h2>Thêm sản phẩm</h2>
                    <ProductForm v-if="product !== null" :product="product" @submit:product="updateProduct" />
                    <p class="text-primary font-weight-bold">{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>