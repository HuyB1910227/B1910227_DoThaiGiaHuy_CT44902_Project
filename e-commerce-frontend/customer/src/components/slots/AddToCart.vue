<template>
    <div class="input-group input-group-sm mb-3 me-3" style="width: 100px;">
        <button class="input-group-text" id="basic-addon2" @click="decrement">-</button>
        <input type="number" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"
            v-model="quantity" min="0" readonly>
        <button class="input-group-text" id="basic-addon2" @click="increment()">+</button>

    </div>
    <!-- {{ maxItems }} -->
    <button class="btn btn-primary mb-3 " @click="addToCart(product._id, quantity)">
      <i class="fa-solid fa-cart-plus"></i>
    </button>
</template>

<script>
    import { mapState } from 'pinia';
    import { useCartStore } from '../../stores/CartStore';
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        quantity: 0,
        maxItems: 0
      };
    },
    emits: ['productAdded'],
    methods: {
      increment() {
        if (this.quantity < this.maxItems)
          this.quantity++;
      },
      decrement() {
        if (this.quantity > 0)
          this.quantity--;
      },
      addToCart(productId, quantity) {
        // addToCart(productId, quantity) {
        if(confirm("Bạn muốn thêm " + quantity + " vào giỏ hàng? ")){
          const cartStore = useCartStore();
          cartStore.addToCart(productId, quantity);
          // cartStore.getItemsInCart();
          // this.getItemsInCart(this.product);
          this.maxItems -= quantity;

          this.$emit('productAdded', quantity);
          this.quantity = 0;
        }

      },
      getItemsInCart(product){
        const productInCart = this.cart.items.find(item => item._id === product._id);
        if (productInCart) {
          this.maxItems = product.itemsInStock - productInCart.quantity;
        } else {
            this.maxItems = product.itemsInStock;
        }
      }
    },
    computed: {
      ...mapState(useCartStore, ['cart'])
    },
    mounted () {
      this.maxItems = this.product.itemsInStock;
      // console.log(this.maxItems);
      this.getItemsInCart(this.product);
    }
  };
</script>