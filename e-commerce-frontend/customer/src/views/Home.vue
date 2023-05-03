<template>
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item">
        <img src="https://pptmon.com/wp-content/uploads/2022/04/Mothers-Day-Free-Presentation-Template-Google-Slides-and-PowerPoint.png" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item active">
        <img src="https://media.slidesgo.com/storage/5923653/happy-thanksgiving1620130510.jpg" class="d-block w-100" alt="Lễ phục sinh">
      </div>
      <div class="carousel-item">
        <img src="https://cdn.shopify.com/s/files/1/1779/6059/files/minis-slider-web_1200x.jpg?v=1614745622" class="d-block w-100" alt="...">
      </div>
      
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <div class="row p-2 bg-light my-2">
    <h5>DANH MỤC</h5>
  </div>
  <CategoryList/>
  <div class="row p-2 bg-light my-2">
    <h5>SẢN PHẨM NỔI BẬT</h5>
  </div>
  <InputSearch v-model="searchText" class="mt-2"/>
  <ProductList v-if="filteredProductsCount > 0" :products="filteredProducts" />
</template>

<script>
import { mapActions } from 'pinia';
import { useCartStore } from '@/stores/CartStore';
import ProductList from '../components/products/ProductList.vue';
import CategoryList from '../components/products/CategoryList.vue';
import ProductService from '../services/product.service';
import InputSearch from '../components/InputSearch.vue';
export default {
  components: {
    ProductList,
    CategoryList,
    InputSearch
  },
  data() {
    return {
      products: [],
      searchText: "",
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
      if (!this.searchText)
        return this.products;
      return this.products.filter((_product, index) => {
        return this.productStrings[index].includes(this.searchText);
      });
    },
    filteredProductsCount() {
      return this.filteredProducts.length;
    },
    ...mapActions(useCartStore, {
      getItemsInCart: "getItemsInCart"
    })
  },
  methods: {
    async retriveProduct() {
      try {
        this.products = await ProductService.getAll();
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
    // this.getItemsInCart()
  }
}
</script>

<style scoped>
/* .slide {
  box-shadow: 0 6px 15px -3px rgb(0 0 0/0.3);
  padding: 25px;
  border-radius: 5px;
} */
.carousel-item img {
  height: 400px;
}
</style>