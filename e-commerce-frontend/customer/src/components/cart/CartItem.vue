<script>
// import { mapState } from 'pinia';
import { useCartStore } from '../../stores/CartStore';
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['removeFromCart','updateItem'],
  methods: {
    removeFromCart(id) {
      if (confirm("Bạn chắc chắn muốn xóa sản phẩm này ra khỏi giỏ hàng? ")) {
        this.$emit('removeFromCart', id);
      }
    },
    getImageURL(item) {
      return `http://localhost:9000/${item.image}`;
    },
    increment() {
      if (this.item.quantity < this.item.itemsInStock)
        this.item.quantity++;
    },
    decrement() {
      if (this.item.quantity > 1)
        this.item.quantity--;
    },
    updateItem(id, quantity) {
      // const cartStore = useCartStore();
      // cartStore.updateCart(productId, quantity);
      // cartStore.getItemsInCart();
      this.$emit('updateItem', id, quantity);
    },
  }
}
</script>
<template>
  <li>
    <div>
      <img :src="getImageURL(item)" />
    </div>
    <div>
      <h3>{{ item.name }}</h3>
      <div class="item__data">
        <div>
          Giá:
          <!-- {{ item }} -->
          <strong>{{ item.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})  }}</strong>
        </div>
        <div>
          <div class="d-flex">
            <div class="input-group input-group-sm mb-3 me-3" style="width: 100px;">
              <button class="input-group-text" id="basic-addon2" @click="decrement()">-</button>
              <input type="number" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2"
                v-model="item.quantity" min="0" readonly>
              <button class="input-group-text" id="basic-addon2" @click="increment()">+</button>
            </div>
            <button class="btn btn-primary mb-3 " @click="updateItem(item._id, item.quantity)">
              <i class="fa-solid fa-arrows-rotate"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="item__total ">Tổng cộng: <span class="text-primary fw-bold" style="font-size: large">{{ (item.price * item.quantity).toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})  }}</span></div>
      <button @click="removeFromCart(item._id)" class="delete">XÓA</button>
    </div>
  </li>
</template>
<style scoped>
li {
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  text-align: center;
  /* max-width: 50rem; */
}

img {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  object-fit: cover;
}

.item__data {
  display: flex;
  justify-content: space-between;
}

.item__total {
  font-weight: bold;
  margin: 1rem 0;
  border-top: 1px solid #474747;
  border-bottom: 2px solid #474747;
  padding: 0.25rem 0;
  width: auto;
}

button.delete {
  font: inherit;
  border: 1px solid #f03141;
  background-color: #f31d3a;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
}

button.delete:hover,
button.delete:active {
  background-color: #ff0000;
  border-color: #ff0000;
}
</style>