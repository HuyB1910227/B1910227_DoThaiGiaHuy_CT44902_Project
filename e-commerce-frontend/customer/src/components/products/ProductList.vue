<template>
    <div class="row p-1">
        <ProductCard v-for="(product, index) in products" :key="product._id" :product="product"/>

        <!-- <ProductCard/>
        <ProductCard/>
        <ProductCard/> -->

    </div>
</template>

<script>
import ProductCard from './ProductCard.vue';
export default {
    components: {
        ProductCard
    },
    props: {
        products: {
            type: Array,
            default: []
        },
    },
    computed: {
        limitedProducts() {
            return this.products.slice(0, 5);
        }
    }
}
</script>