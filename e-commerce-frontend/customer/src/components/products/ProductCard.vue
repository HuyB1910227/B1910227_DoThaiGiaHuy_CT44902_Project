<script>

import { useCartStore } from '../../stores/CartStore';
import AddToCart from '../slots/AddToCart.vue';
export default {

    data() {
        const useCart = useCartStore();
        return {
            useCart,
            itemsInCart: 0
        }
    },

    props: {
        product: {
            type: Object,
            required: true
        }
    },
    components: {
        AddToCart,
    },
    
    methods: {

        getItemsInCart(product) {
            const productInCart = this.useCart.cart.items.find(item => item._id === product._id);
            // console.log("yes");
            // console.log(this.useCart.cart.items);
            if (productInCart) {
                this.itemsInCart = productInCart.quantity;
            } else {
                this.itemsInCart = 0;
            }
        },
        goToDetail(productId) {
            this.$router.push({ name: "product.detail", params: { id: productId } });
        },
        getImageURL(item) {
            return `http://localhost:9000/${item.image}`;
        },
        onProductAdded(quantity) {
            this.itemsInCart += quantity;
            console.log(this.itemsInCart);
        }
    },
    mounted() {
        this.getItemsInCart(this.product);
    }
};
</script>

<template>
    <div class="card shadow m-2 p-0 border-0" @click="goToDetail(product._id)" style="background-color: #fada91;">
        <div>
            <img :src="getImageURL(product)" class="card-img-top" alt="Product Image" >
        </div>
        <div class="card-body bg-white rounded-bottom pb-0">
            <h3 class="card-title">{{ product.name }}</h3>
            <p class="card-text">Còn lại: <span class="fst-italic text-success fw-bold">{{ product.itemsInStock }}</span>
                sản phẩm</p>
            <h4 class="text-uppercase text-primary fw-bold"><strong></strong>{{ product.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }) }}</h4>
            <div class="d-flex" @click.stop="">

                <AddToCart :product="product" @productAdded="onProductAdded"/>
            </div>

        </div>
        <div class="card-footer py-0 px-1 border-0 text-center" style="">
            <span class="text-center fw-bold" style="color: #f09605; ">Đã thêm {{ itemsInCart }} sản phẩm vào giỏ
                hàng</span>
        </div>
    </div>
</template>

<style scoped>
.card {
    /* height: 500px; */
    width: 300px;
    cursor: pointer;
}

img {
    height: 300px;
}

.counter {
    display: flex;
    align-items: center;
    justify-content: center;
}

.counter-button {
    background-color: #4caf50;
    border: none;
    color: #fff;
    font-size: 24px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 10px;
    cursor: pointer;
}

.counter-button:hover {
    background-color: #3e8e41;
}

.counter-number {
    font-size: 36px;
    margin: 0 20px;
}</style>