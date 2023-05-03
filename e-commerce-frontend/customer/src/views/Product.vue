<template>
    <div v-if="isLoading == false">
        <div class="bg-light p-2 d-flex">
            <GoBack class="me-auto"/>
            <h5 class="text my-auto text-uppercase">{{ category.name }}</h5>
        </div>

        <div v-if="products.length == 0" class="text-center mt-2" >

            <img src="https://jalongi.com/public/assets/images/product_not_found.jpeg" alt="" class="m-auto"
                style="width: 500px; height: 500px;">
            <h4> Oops, Không tìm thấy sản phẩm thuộc danh mục {{ category.name }}!</h4>
        </div>
        <div v-else class="mt-2">
            <div class="row">
                <div class="col-7">
                    <InputSearch v-model="searchText"/>
                </div>
                <div class="col-5">
                    <select name="" id="" v-model="sortOption" class="form-select">
                        <option value="">-- Sắp xếp -- </option>
                        <option value="name-asc">Sắp xếp từ A - Z</option>
                        <option value="name-desc">Sắp xếp từ Z - A</option>
                        <option value="price-asc">Giá tiền từ thấp đến cao</option>
                        <option value="price-desc">Giá tiền từ cao đến thấp</option>
                    </select>
                </div>
            </div>
            
            <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts" />
        </div>
    </div>
    <div >
        <span class="visually-hidden">Loading...</span>
    </div>
</template>
  
<script>
// import GoBack from '../components/GoBack.vue';
import ProductList from '../components/products/ProductList.vue';
import InputSearch from '../components/InputSearch.vue';
//   import ProductService from '../services/product.service';
import CategoryService from '../services/category.service';
import GoBack from '../components/GoBack.vue';
export default {
    components: {
    ProductList,
    InputSearch,
    GoBack
},
    data() {
        return {
            isLoading: true,
            category: null,
            products: [],
            searchText: "",
            sortOption: "",
            minPrice: null,
            maxPrice: null,
        }
    },
    computed: {
        productStrings() {
            return this.products.map((product) => {
                const { name, description, price } = product;
                return [name, description, price].join("");
            });
        },
        filteredProducts() {
            // if (!this.searchText)
            //     return this.products;
            let filteredProducts = this.products;
            if(this.searchText) {
                filteredProducts = filteredProducts.filter((_product, index) => {
                    return this.productStrings[index].includes(this.searchText);
                });
            }
            if (this.minPrice) {
                filteredProducts = filteredProducts.filter(product => product.price >= this.minPrice);
            }
            if (this.maxPrice) {
            filteredProducts = filteredProducts.filter(product => product.price <= this.maxPrice);
            }
            if (this.sortOption === "name-asc") {
                filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            } else if (this.sortOption === "name-desc") {
                filteredProducts = filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            } else if (this.sortOption === "price-asc") {
                filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
            } else if (this.sortOption === "price-desc") {
                filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
            }
        
            return filteredProducts;
        },
        filteredProductsCount() {
            if(this.filteredProducts != null)
                return this.filteredProducts.length;
        }
    },
    methods: {
        async retriveProduct() {
            try {
                
                this.category = await CategoryService.get(this.$route.params.id);
                this.products = this.category.products;
                this.isLoading = false
                console.log(this.products);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retriveProduct();
        },


    },
    mounted() {
        this.refreshList()

    }
}
</script>
  
<style scoped>
.slide {
    box-shadow: 0 6px 15px -3px rgb(0 0 0/0.3);
    padding: 25px;
    border-radius: 5px;
}
</style>